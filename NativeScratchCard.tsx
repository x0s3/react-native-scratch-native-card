import React, { useCallback } from 'react';
import { requireNativeComponent } from 'react-native';

const ScratchCardView = requireNativeComponent('NativeScratchCard');

function ScratchCardComponent(props) {
  const onChange = useCallback(event => {
    switch (Object.keys(event.nativeEvent)[0]) {
      case 'started':
        props.onChange({ type: 'STARTED' });
        break;

      case 'progress':
        props.onChange({
          type: 'PROGRESS',
          payload: {
            progress: event.nativeEvent.progress
          }
        });
        break;

      case 'finished':
        props.onChange({ type: 'FINISHED' });
        break;

      default:
        break;
    }
  }, []);

  return <ScratchCardView style={props.style} {...props} onChange={onChange} />;
}

export default ScratchCardComponent;
