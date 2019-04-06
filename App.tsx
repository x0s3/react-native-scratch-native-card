import React, { useReducer } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScratchCard from './NativeScratchCard';

const initialState = { started: false, finished: false, progress: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'STARTED':
      return { ...state, started: true };
    case 'FINISHED':
      return { ...state, finished: true, progress: 100 };
    case 'PROGRESS':
      return { ...state, progress: action.payload.progress };
    default:
      throw new Error();
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Scratch started? {state.started ? 'Yep :)' : 'Nop :('}
      </Text>
      <Text style={styles.text}>
        Is finished? {state.finished ? 'Yep :)' : 'Nop :('}
      </Text>
      <Text style={styles.text}>Current progress: {state.progress}</Text>
      <ScratchCard
        onChange={dispatch}
        style={{ width: 300, height: 300 }}
        finishAt={100}
        brushWidth={20}
        enabled={true}
      >
        <Text style={styles.welcome}>HEY IM YOUR JSX COMPONENT!!</Text>
      </ScratchCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  text: {
    fontSize: 40
  }
});
