import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalData, LocalDataWithDate, LocalStarage } from '../screens/HomeScreen/types';

const storageKey = 'StepsDataKey';
//Method used to storage the object value into local storage
const storageData=async(stepsData :Array<LocalStarage>)=>{
    const stepsDataStr = JSON.stringify(stepsData);
    await AsyncStorage.setItem(storageKey, stepsDataStr);
}

/**
 * Method use to get the return value of Localstarge 
 * @returns Array of LocalStarage
 */
const getStorageData=async(): Promise<Array<LocalStarage>>=>{
    const value = await AsyncStorage.getItem(storageKey);
   const stoateData   =  JSON.parse(value) as unknown as Array<LocalStarage>;
   return stoateData;
}

export {
    storageData,
    getStorageData
}