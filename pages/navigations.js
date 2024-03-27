import { NavigationContainer,useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator,  } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect,createContext ,useState} from 'react';
import messaging from '@react-native-firebase/messaging'

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,Image, Platform,Alert,PermissionsAndroid
} from 'react-native';
import Home from './home';
import Checkout from './checkout';
import Login from './login';
import Slider_splash from './slider_splash';
import SplashScreen from './first_splash';
// import Signup from './signup'
import WishList from './wishlist';
import Settings from './settings';
import Search from './search';
import ProductDetail from './productDetail';
import CategoryPage from './categorypage';
import MapScreen from './maps';

const Stack=createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const HomeScreens=()=>{
  return(
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} 
       options={{headerShown:false}}/>
      <Stack.Screen name="ProductDetail" component={ProductDetail} options={{headerShown:false}} />
      <Stack.Screen name="CategoryPage" component={CategoryPage}/>

    </Stack.Navigator>

  )
}
const settingsScreens=()=>{
  return(
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={Settings} 
       options={{headerShown:false}}/>
      <Stack.Screen name='MapScreen' component={MapScreen} options={{title:'Your Location',headerTitleAlign:'center'}} />
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
        options={{headerTitleAlign:'center'}}
        />
    <Tab.Screen name='Checkout'
        component={Checkout}
        initialParams={{ product: null }}
        options={{title:'Your Cart',headerTitleAlign:'center'}}
        />
    {/* <Tab.Screen name='Search'
        component={Search}
        options={{headerShown:false}}/> */}
    <Tab.Screen name='Settings'
        component={settingsScreens} options={{headerShown:false}}
        />
  </Tab.Navigator>
  )
}
export const ContextApi=createContext();

const checkUserToken = async () => {
  try {
    const userToken = await AsyncStorage.getItem('token');
    return userToken; // Return the userToken
  } catch (error) {
    console.error('Error retrieving user token:', error);
    throw error; // Rethrow the error
  }
};
const AppNavigator=()=>{
  const [loggedIn, setLoggedIn] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      try {
        const userToken = await checkUserToken();
        setLoggedIn(!!userToken); // Update loggedIn based on userToken existence
      } catch (error) {
        console.error('Error checking user token:', error);
      }
    };
    checkLoggedInStatus();
  }, []);
  //device notifications tokens ki lmbi
 useEffect(()=>{
  getDeviceToken();

 },[]);
 useEffect(() => {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  });
  return unsubscribe;
}, []);
  const getDeviceToken=async()=>{
    let token = await messaging().getToken();
    console.log( `Fcm token ${token}` );

  }

  return (
    
    <ContextApi.Provider value={{ setLoggedIn ,setData }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!loggedIn ? (
            <>
              <Stack.Screen name="SplashScreen" component={SplashScreen} />
              <Stack.Screen name="Slider_splash" component={Slider_splash} />
              {/* <Stack.Screen name="Entrypage" component={Entrypage} /> */}
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Home" component={HomeTab} />
            </>
          ) : (
            <>
              <Stack.Screen name="Home" component={HomeTab} />
              {/* <Stack.Screen name="Settings" component={settingsScreens} /> */}
              <Stack.Screen name="Login" component={Login} />
              
              
               
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ContextApi.Provider>
    
  );
};

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


export default AppNavigator;
