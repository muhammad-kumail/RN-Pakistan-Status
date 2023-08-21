import React from 'react';
import { View, Text, Button } from 'react-native';
import MyStack from './Navigation/MyStack';
import 'react-native-gesture-handler';

const App: React.FC = () => {
  return (
<<<<<<< Updated upstream
    <MyStack />
=======
    <Provider store={store}>
      <MyStack />
    </Provider>
>>>>>>> Stashed changes
  );
};

export default App;