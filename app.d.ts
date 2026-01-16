// // @ts-ignore
// /// <reference types="nativewind/types.d.ts" />

declare module '*.svg' {
  import { FC } from 'react';
    import { SvgProps } from 'react-native-svg';

  const content: FC<SvgProps & { currentColor?: string }>;
  export default content;
}
declare module '*.png' {
  const content: number; // React Native treats images as numbers (resource IDs)
  export default content;
}

