import * as React from 'react';

import { VisionMlViewProps } from './VisionMl.types';

export default function VisionMlView(props: VisionMlViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
