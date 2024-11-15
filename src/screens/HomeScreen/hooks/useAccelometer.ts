import { useEffect, useRef, useState } from "react";
import {
  isStepCountingSupported,
  parseStepData,
  startStepCounterUpdate,
  stopStepCounterUpdate,
} from "@dongminyu/react-native-step-counter";
import Geolocation from "@react-native-community/geolocation";
import BackgroundService from "react-native-background-actions";
import { PermissionsAndroid, Alert } from "react-native";
import { LocalizationEN } from "../../../i18n";
import { getStorageData, openSettings, storageData } from "../../../utils";
import { LocalStarage, Location } from "../types";
import { calculateDistance } from "../../../utils/utility";
import moment from "moment";
import {
  BACKGROUND_TASK_OPTIONS,
  DATE_FORMAT,
  TIME_FORMAT,
} from "../../../constants";

const useAccelometer = () => {
  const [steps, setSteps] = useState(0);
  const [calories, setCalories] = useState(0);
  const [previousStepsCount, setPreviousStepsCount] = useState(0);
  const [location, setLocation] = useState<Location | null>(null);
  const [distanceTravelled, setDistanceTravelled] = useState<number>(0);
  const locationRef = useRef<Location | null>(null); //Javascript clousre related issue fixed
  const distanceRef = useRef<number | null>(null); //Javascript clousre related issue fixed
  const [dataList,setDataList] = useState<Array<LocalStarage>>([]);

  useEffect(() => {
    (async () => {
      const mLocalStarage = await getStorageData();
      const todatDate = moment(new Date()).format(DATE_FORMAT);
      const intialCountList = mLocalStarage.filter(
        (item) => item.date === todatDate
      );
      setDataList(intialCountList);
      const stepsconut = intialCountList.reduce(
        (acc, num) => acc + num.stepsCount,
        0
      );
      setPreviousStepsCount(stepsconut);
    })();
  }, []);

  /**
   * Check used to check the 
   * Location permission
   * @returns 
   */
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        {
          title: LocalizationEN.LOCATION_PERMISSION,
          message: LocalizationEN.LOCATION_PERM_DESC,
          buttonNeutral: LocalizationEN.ASK_ME_LATER,
          buttonNegative: LocalizationEN.CANCEL,
          buttonPositive: LocalizationEN.OK,
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the Location");
        return true;
      } else {
        console.log("Camera permission denied");
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

 

  useEffect(() => {
    locationRef.current = location;
    distanceRef.current = distanceTravelled;
  }, [location, distanceTravelled]);

  /**
   * Get the location continuely 
   * @returns 
   */
  const getLocation = (): Promise<Location | null> => {
    Geolocation.setRNConfiguration({
      enableBackgroundLocationUpdates: true,
      skipPermissionRequests: true,
      authorizationLevel: "always",
      locationProvider: "android",
    });
    return new Promise((resolve) => {
      Geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation: Location = { latitude, longitude };
          resolve(newLocation);
        },
        (error) => {
          console.error("Geo locaiton :", error);
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 1,
          interval: 10000,
        }
      );
    });
  };
  /**
   * List manipulation to 
   * storage the list into the async storage
   * @param calories 
   * @param steps 
   * @param distance 
   */
  const stroagePreration = async (
    calories: number,
    steps: number,
    distance: number
  ) => {
    const listLocationData = (await getStorageData()) || [];
    
    const currentTime = moment(new Date()).format(TIME_FORMAT);
    const currentDate = moment(new Date()).format(DATE_FORMAT);
    const data: LocalStarage = {
      calories: calories,
      distanceTravel: distance,
      stepsCount: steps,
      time: currentTime,
      date: currentDate,
    }; 
    const list = manipulationInList(
      listLocationData,
      currentTime,
      currentDate,
      data
    );
    await storageData(list);
  };

  const manipulationInList = (
    listLocationData: LocalStarage[],
    currentTime: string,
    currentDate: string,
    data: LocalStarage
  ): Array<LocalStarage> => {
    if (listLocationData.length > 0) {
      const filtered = listLocationData.filter(
        (item) => item.date && currentDate && item.time && currentTime
      );
      if (filtered.length > 0) {
        return filtered.map((item) => ({
          date: currentDate,
          time: currentTime,
          calories: item.calories + data.calories,
          distanceTravel: item.distanceTravel + data.distanceTravel,
          stepsCount: item.stepsCount + data.stepsCount,
        }));
      } else {
        listLocationData.push(createNewDataList(currentTime, currentDate, data)) ;
        return listLocationData;
      }
    } else { 
      listLocationData.push(createNewDataList(currentTime, currentDate, data)) ;
      return listLocationData;
    }
  };

  const createNewDataList = (
    currentTime: string,
    currentDate: string,
    data: LocalStarage
  ): LocalStarage => {
    return {
        calories: data.calories,
        date: currentDate,
        time: currentTime,
        distanceTravel: data.distanceTravel,
        stepsCount: data.stepsCount,
      }
  };

  const checkIfLocationEnabled = (): Promise<boolean> => {
    return new Promise((resolve) => {
      Geolocation.getCurrentPosition(
        () => {
          resolve(true);
        },
        (error) => {
          console.log("Error while fetch locaiton -> ", error);
          resolve(false);
        },
        { enableHighAccuracy: false, timeout: 10000, interval: 5000 }
      );
    });
  };

  const startStepCounter = async () => {
    const pemissionGraned = await requestLocationPermission();
    const locationEnabled = await checkIfLocationEnabled();
    if (!locationEnabled) {
      Alert.alert("", LocalizationEN.PLEASE_ENABLE_LOCATION, [
        {
          text: LocalizationEN.OK,
        },
        {
          text: LocalizationEN.CANCEL,
        },
      ]);
      return;
    }
    if (pemissionGraned) {
      await  startBackgroundServiceTask();
    } else {
      Alert.alert("", LocalizationEN.ALLOW_LOCATION, [
        {
          text: LocalizationEN.CANCEL,
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: LocalizationEN.GO_TO_SETTING, onPress: () => openSettings() },
      ]);
    }
  };

  const stopBackgroundTask = async () => {
    await BackgroundService.stop();
    stopStepCounterUpdate();
  };
  /**
   * Method used to Start the background service's
   * in android and iOS both 
   */
  const startBackgroundServiceTask = async () => {
    await BackgroundService.start(async() => {
      startStepCounterUpdate(new Date(), async (data) => {
        console.debug(parseStepData(data));
        setSteps(data.steps);

        const loc = await getLocation();
        if (loc) {
          if (locationRef.current) {
            const distance = calculateDistance(locationRef.current, loc);
            setDistanceTravelled(distance);
          }
          setLocation(loc);
          stroagePreration(calories, data.steps, distanceRef.current);
        }

        setCalories((pre) => pre + parseFloat(data?.calories || "0"));
      });
    }, BACKGROUND_TASK_OPTIONS);
  };

  return {
    steps: steps + previousStepsCount,
    isStepCountingSupported,
    startStepCounter,
    stopStepCounterUpdate: stopBackgroundTask,
    distanceTravelled,
    calories,
    dataList,
  };
};

export default useAccelometer;
