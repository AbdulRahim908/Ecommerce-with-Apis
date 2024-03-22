import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const MapScreen = () => {
  const [initialRegion, setInitialRegion] = useState(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      Alert.alert(
        'Location Permission',
        'This app requires access to your location to function properly.',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Permission denied'),
            style: 'cancel',
          },
          {
            text: 'Allow',
            onPress: () => getCurrentLocation(),
          },
        ],
        { cancelable: false }
      );
    };

    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setInitialRegion({
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        },
        error => console.error(error),
        { enableHighAccuracy: false, timeout: 10000 }
      );
    };

    requestLocationPermission();

    return () => {}; // Cleanup function
  }, []);

  return (
    <View style={styles.container}>
      {initialRegion && (
        <MapView style={styles.map} initialRegion={initialRegion}>
          <Marker coordinate={initialRegion} />
        </MapView>
      )}
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
