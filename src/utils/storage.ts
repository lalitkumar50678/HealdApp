import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalData, LocalDataWithDate, LocalStarage } from '../screens/HomeScreen/types';

const storageKey = 'StepsDataKey';

const storageData=async(stepsData :Array<LocalStarage>)=>{
    const stepsDataStr = JSON.stringify(stepsData);
    await AsyncStorage.setItem(storageKey, stepsDataStr);
}

const getStorageData=async(): Promise<Array<LocalStarage>>=>{
    const value = await AsyncStorage.getItem(storageKey);
   const stoateData   =  JSON.parse(value) as unknown as Array<LocalStarage>;
   return stoateData;
}

export {
    storageData,
    getStorageData
}