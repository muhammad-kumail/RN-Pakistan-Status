import React from 'react';
import { View, Text, Button } from 'react-native';
import DrawerNavigator from './Navigation/DrawerNavigation';
import 'react-native-gesture-handler';

const App: React.FC = () => {
  return (
    // <Text>
    //   ppp
    // </Text>
    <DrawerNavigator/>
    // <View>
    //   <Text>Welcome to Home Screen!</Text>
    //   <Button title="Open Drawer" 
    //   onPress={() => navigation.openDrawer()} 
    //   />
    // </View>
  );
};

export default App;