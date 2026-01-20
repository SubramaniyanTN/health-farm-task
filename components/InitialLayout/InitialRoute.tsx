import { Header } from '@/components'
import {
  setAuthData,
  setUser,
  store,
  useAppDispatch,
  useAppSelector
} from '@/redux'
import { queryClient, supabase } from '@/src'
import { Stack } from 'expo-router'
import { useEffect } from 'react'
import { AppState } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

// Supabase auto-refresh
AppState.addEventListener('change', (state) => {
  if (state === 'active') supabase.auth.startAutoRefresh()
  else supabase.auth.stopAutoRefresh()
})

export default function InitialRoute() {
  const dispatch = useAppDispatch()
  const { accessToken } = useAppSelector((s) => s.auth)
  const { hasSeenWelcome } = useAppSelector((s) => s.hasSeenWelcome)
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if(event === 'INITIAL_SESSION'){
          return
        }
        if (
          event === 'SIGNED_IN' ||
          event === 'TOKEN_REFRESHED'
        ) {
          dispatch(
            setAuthData({
              isAuthenticated: !!session,
              accessToken: session?.access_token ?? null,
              refreshToken: session?.refresh_token ?? null,
              user: session?.user ?? null,
            })
          )
        }
        if (event === 'SIGNED_OUT') {
          store.dispatch({type:"RESET_ALL"});
          queryClient.clear();
        }

        if (event === 'USER_UPDATED') {
          dispatch(setUser(session?.user))
        }
      }
    )

    return () => {
      sub.subscription.unsubscribe()
    }
  }, [])

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!hasSeenWelcome} >
      <Stack.Screen name="index" />
      </Stack.Protected>
      <Stack.Protected guard={hasSeenWelcome && !accessToken} >
      <Stack.Screen name="auth" />
      <Stack.Screen
        name="otpverify"
        options={{
          headerShown: false,
          presentation: 'formSheet',
          sheetGrabberVisible: true,
          sheetAllowedDetents: [0.45],
          header: () => <Header label="otpverify.header" />,
          contentStyle: styles.headerStyle,
        }}
      />
      </Stack.Protected>
      <Stack.Protected guard={hasSeenWelcome && !!accessToken} >
      <Stack.Screen name="dashboard" />
      </Stack.Protected>
    </Stack>
  )
}

const styles = StyleSheet.create((theme) => ({
  headerStyle: {
    backgroundColor: theme.colors.white,
    width: '100%',
  },
}))
