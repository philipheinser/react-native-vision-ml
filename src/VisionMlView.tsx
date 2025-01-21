import { requireNativeView } from 'expo';
import * as React from 'react';

import { VisionMlViewProps } from './VisionMl.types';

const NativeView: React.ComponentType<VisionMlViewProps> =
  requireNativeView('VisionMl');

export default function VisionMlView(props: VisionMlViewProps) {
  return <NativeView {...props} />;
}
