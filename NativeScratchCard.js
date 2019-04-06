import React, { useCallback } from 'react';
import { requireNativeComponent, View } from 'react-native';
import PropTypes from 'prop-types';

function ScratchCardComponent(props) {
  const onChange = useCallback(event => {
    switch (Object.keys(event.nativeEvent)[0]) {
      case 'started':
        props.onChange({ type: 'started' });
        break;

      case 'progress':
        props.onChange({
          type: 'progress',
          payload: {
            progress: event.nativeEvent.progress || 100
          }
        });
        break;

      case 'finished':
        props.onChange({ type: 'finish' });
        break;

      default:
        break;
    }
  }, []);

  return (
    <ScratchCardView style={props.style} {...props} onChange={onChange} />
  );
}

ScratchCardComponent.propTypes = {
  finishAt: PropTypes.number.isRequired,
  brushWidth: PropTypes.number.isRequired,
  enabled: PropTypes.bool.isRequired,
  style: PropTypes.object,
  onChange: PropTypes.func,
  ...View.propTypes
};

const ScratchCardView = requireNativeComponent(
  'NativeScratchCard',
  ScratchCardComponent,
  {
    nativeOnly: {
      onChange: true
    }
  }
);

export default ScratchCardComponent;
