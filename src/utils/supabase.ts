
import { reduxStorage } from '@/redux/mmkvStorage'
import { createClient, processLock } from '@supabase/supabase-js'
import 'react-native-url-polyfill/auto'
  console.log({supabaseUrl:process.env.EXPO_PUBLIC_SUPABASE_URL,supabaseAnonKey:process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY})
export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      storage: reduxStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
      lock: processLock,
    },
  })
        