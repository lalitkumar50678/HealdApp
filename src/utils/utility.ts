import { Linking, Platform } from "react-native";
import haversine from 'haversine';
import { Location } from "../screens/HomeScreen/types";


const openSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };

  const calculateDistance = (start: Location, end: Location): number => {
    return haversine(start, end, { unit: 'meter' });
  };
  
  const formatDistance=(distanceInMeters: number): string =>{
    if (distanceInMeters >= 1000) {
      const distanceInKm = distanceInMeters / 1000;
      return `${distanceInKm.toFixed(2)} km`;
    } else {
      return `${distanceInMeters.toFixed(2)} meters`;
    }
  }
  export {
    openSettings,
    calculateDistance,
    formatDistance
  }