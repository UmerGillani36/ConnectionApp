import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import WifiManager from 'react-native-wifi-reborn';

const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [ssid, setSsid] = useState('');

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestLocationPermission();
    }
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'This app needs access to your location to connect to Wi-Fi networks',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert(
          'Permission Denied',
          'Location permission is required to connect to Wi-Fi networks.',
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const toggleWifi = async () => {
    const status = await WifiManager.connectionStatus();
    console.log('Status', status);
    // try {
    //   if (isConnected) {
    //     // Disconnect WiFi
    //     await WifiManager.disconnect();
    //     setIsConnected(false);
    //   } else {
    //     // Connect to a WiFi network (you need to provide SSID and Password)
    //     const ssid = 'HUAWEI-zTwu'; // Replace with your SSID
    //     const password = '6Esxk7Ss'; // Replace with your password
    //     const isWep = true; // Assuming WPA/WPA2 for this example, set to true if using WEP
    //     await WifiManager.c(ssid, password, isWep).then(
    //       () => {
    //         setIsConnected(true);
    //         setSsid(ssid);
    //       },
    //       error => {
    //         Alert.alert('Connection Failed', error.message);
    //       },
    //     );
    //   }
    // } catch (error) {
    //   Alert.alert('Error', error.message);
    // }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.status}>
        {isConnected ? `Connected to ${ssid}` : 'Not Connected'}
      </Text>
      <Button
        title={isConnected ? 'Disconnect WiFi' : 'Connect WiFi'}
        onPress={toggleWifi}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  status: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default App;
