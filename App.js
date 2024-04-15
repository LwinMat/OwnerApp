import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Entypo, FontAwesome6 } from '@expo/vector-icons';

import 'react-native-gesture-handler';

// import screens
import LoginScreen from './screens/LoginScreen';
import ListingScreen from './screens/ListingScreen';
import BookingScreen from './screens/BookingScreen';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Listing" component={ListingScreen} options={{tabBarIcon: ()=>{return(<Entypo name="add-to-list" size={24} color="black" />)}}}/>
      <Tab.Screen name="Booking" component={BookingScreen} options={{tabBarIcon: ()=>{return(<FontAwesome6 name="book-open" size={24} color="black" />)}}}/>
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});