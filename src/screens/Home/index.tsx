import React from 'react';
import { View, Text, Button } from 'react-native';
interface DrawerListProps {
  navigation: any;
}
const Home: React.FC<DrawerListProps>= ({navigation}) => {
  // const navigateToScreen = (screenName: string) => {
  //   navigation.navigate(screenName);
  // };
  return (
    <View>
      <Text>Welcome to Home Screen!</Text>
      {/* <Button title='drawer' onPress={()=>navigateToScreen('About')}/> */}
    </View>
  );
};

export default Home;