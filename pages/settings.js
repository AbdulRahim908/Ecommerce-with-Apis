import React, { useEffect, useState ,useContext} from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ContextApi } from './navigations'
import { Avatar } from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage'
const Settings = ({navigation}) => {
  const imageUrl = 'https://static.vecteezy.com/system/resources/previews/002/275/847/original/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg';
  const [user,setUser]=useState();
  const { data,setData } = useContext(ContextApi);

  const logout = () => {
    Alert.alert(
      "Logout",
      "Are you sure? You want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => {
            return null;
          },
        },
        {
          text: "Confirm",
          onPress: () => {
            AsyncStorage.removeItem('token')
            setData(null);
            navigation.replace('Login');
          },
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
           <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{color:'black',fontSize:25,fontWeight:'bold'}}
          >
            Welcome!!!
          </Text>
          <Avatar
          rounded
          source={{ uri: imageUrl }}
          size='large'
          />
          {user ? (
            <Text  style={styles.text}>
              Welcome{" "}
              {user.displayName
                ? user.displayName
                : user.email}
            </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={()=>navigation.navigate('MapScreen')}
          >
            <Text style={styles.buttonTextStyle}>
              Select Your Order Delivery Location
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={logout}
          >
            <Text style={styles.buttonTextStyle}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
        </View>
    </SafeAreaView>
  )
}

export default Settings

const styles = StyleSheet.create({

  buttonStyle: {
    minWidth: 300,
    backgroundColor: "red",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
  text:{
    fontSize: 20,
    textAlign: "center",
    marginBottom: 16,
    color:'black'
  }
});