import { useCustomTranslation } from "@/locale";
import { JSX } from "react";
import { ActivityIndicator, FlatList, FlatListProps, ListRenderItem } from "react-native";
import Animated, { AnimatedProps, FadeInDown } from "react-native-reanimated";
import RetryComponent, { RetryComponentProps } from "./RetryComponent";

const AnimatedFlatListComp =
  Animated.createAnimatedComponent<FlatListProps<any>>(FlatList);

export type AnimatedFlatListProps<T> = AnimatedProps<FlatListProps<T>> & {
  isLoading?: boolean;
  isError?: boolean;
  LoadingComponent?: () => JSX.Element;
  ErrorComponent?: () => JSX.Element;
  SkeletonLoader?: ListRenderItem<any> | null | undefined;
  numOfSkeletonLoader?: number;
  onRetry?: () => void;
  searched?: boolean;
  errorMessage?: string;
  StaticHeaderComponent?: () => JSX.Element;
  retryComponentProps?: Partial<RetryComponentProps>;
};

export default function AnimatedFlatList<T>({
  isLoading,
  isError,
  LoadingComponent,
  ErrorComponent,
  SkeletonLoader,
  StaticHeaderComponent,
  numOfSkeletonLoader = 5,
  onRetry,
  searched,
  errorMessage,
  retryComponentProps,
  ...rest
}: AnimatedFlatListProps<T>) {
  const translation = useCustomTranslation();
  // 🔹 Loading
  if (isLoading) {
    if (LoadingComponent) return <LoadingComponent />;

    if (SkeletonLoader) {
      return (
        <>
        {StaticHeaderComponent && <StaticHeaderComponent />}
        <AnimatedFlatListComp
          {...rest}
          data={Array.from({ length: numOfSkeletonLoader })}
          keyExtractor={(_, i) => `skeleton-${i}`}
          renderItem={(props) => <SkeletonLoader {...props} />}
        />
        </>
      );
    }

    return <ActivityIndicator />;
  }

  // 🔹 Error
  if (isError) {
    if (ErrorComponent) return (
      <>
      {StaticHeaderComponent && <StaticHeaderComponent />}
      <ErrorComponent />
      </>
    );

    return (  
      <>
      {StaticHeaderComponent && <StaticHeaderComponent />}
      <RetryComponent
        {...retryComponentProps}
          onRetry={onRetry}
          errorMessage={errorMessage}
        />
      </>
    );
  }

  // 🔹 Empty
  const ListEmptyComponent = () => (
    <RetryComponent
      onRetry={onRetry}
      errorMessage={
        errorMessage || (searched ? translation("no-results-found") : translation("no-data-found"))
      }
      description={translation("no-data-to-show")}
    />
  );
  const isInverted = ((Array.isArray(rest.data) && rest.data.length > 0 ) && !isError)? rest.inverted : false;
  return (
    <>
    {StaticHeaderComponent && <StaticHeaderComponent />}
    <AnimatedFlatListComp
      entering={FadeInDown.duration(500)}
      showsVerticalScrollIndicator={false}
      {...rest}
      ListEmptyComponent={ListEmptyComponent}
      inverted={isInverted}
    />
    </>
  );
}
