import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator,  } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import React, { useEffect } from 'react';
// import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,Image, Platform
} from 'react-native';
import Home from './pages/home';
import Entrypage from './pages/entrypage';
import Checkout from './pages/checkout';
import Login from './pages/login';
import Slider_splash from './pages/slider_splash';
import SplashScreen from './pages/first_splash';
// import Signup from './pages/signup'
import WishList from './pages/wishlist';
import Settings from './pages/settings';
import Search from './pages/search';
import ProductDetail from './pages/productDetail';
import CategoryPage from './pages/categorypage';

const Stack=createNativeStackNavigator();
const Tab = createBottomTabNavigator();



const HomeScreens=()=>{
  return(
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} 
       options={{headerShown:false}}/>
      <Stack.Screen name="ProductDetail" component={ProductDetail}/>
      <Stack.Screen name="CategoryPage" component={CategoryPage}/>

    </Stack.Navigator>

  )
}
const HomeTab=()=>{
  return(
  <Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === 'Home') {
        iconName = focused ? 'home' : 'home';
      } else if (route.name === 'WishList') {
        iconName = focused ? 'heart' : 'heart-o';
      } else if (route.name === 'Checkout') {
        iconName = focused ? 'opencart' : 'shopping-cart';
      } else if (route.name === 'Search') {
        iconName = focused ? 'search' : 'search';
      } else if (route.name === 'Settings') {
        iconName = focused ? 'cog' : 'cog';
      }

      return <Icon name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: 'tomato',
    tabBarInactiveTintColor: 'gray',
  })}
  >
    <Tab.Screen name='Home'
        component={HomeScreens}
        options={{headerShown:false}}/>
    <Tab.Screen  name='WishList'
        component={WishList}
        />
    <Tab.Screen name='Checkout'
        component={Checkout}
        initialParams={{ product: null }}
        // options={{headerShown:false}}
        />
    {/* <Tab.Screen name='Search'
        component={Search}
        options={{headerShown:false}}/> */}
    <Tab.Screen name='Settings'
        component={Settings}
        options={{headerShown:false}}/>
  </Tab.Navigator>
  )
}

const App=()=>{
  return(
    <NavigationContainer>
     <Stack.Navigator initialRouteName='SplashScreen'
      >
        <Stack.Screen name='SplashScreen'
        component={SplashScreen}
        options={{headerShown:false}}
        />
        <Stack.Screen name='Slider_splash'
        component={Slider_splash}
        options={{headerShown:false}}
        />
      <Stack.Screen name='Entrypage'
        component={Entrypage}
        options={{headerShown:false}}
        />
         <Stack.Screen name='Home'
        component={HomeTab}
        options={{headerShown:false}}
        />
        {/* <Stack.Screen name='Checkout'
        component={Checkout}/>  */}
        <Stack.Screen name='Login'
        component={Login}
        options={{headerShown:false}}/>
        {/* <Stack.Screen name='Signup'
        component={Signup}
        options={{headerShown:false}}/> */}
        <Stack.Screen name='Settings'
        component={Settings}
        options={{headerShown:false}}/>
        {/* <Stack.Screen name='Checkout'
        component={Checkout}
        options={{headerShown:false}}/> */}
        <Stack.Screen name='ProductDetail'
        component={ProductDetail}
        />
      </Stack.Navigator>
  </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
  },
  text:{
    color:'#4392F9',
    fontSize:20,
    fontWeight:'bold',
  },
  user:{
   
  }

});


export default App;
