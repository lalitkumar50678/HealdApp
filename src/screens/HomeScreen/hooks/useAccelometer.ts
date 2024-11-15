import { useEffect, useRef, useState } from "react";
import { accelerometer } from "react-native-sensors";
import { filter, map } from "rxjs/operators";
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
      console.log("mLocalStarage -> ", mLocalStarage);
      
      const todatDate = moment(new Date()).format(DATE_FORMAT);
      console.log("todatDate -> ", todatDate);
      const intialCountList = mLocalStarage.filter(
        (item) => item.date === todatDate
      );
      setDataList(intialCountList);
      const stepsconut = intialCountList.reduce(
        (acc, num) => acc + num.stepsCount,
        0
      );
      console.log("intialCount -> ", stepsconut);
      setPreviousStepsCount(stepsconut);
    })();
  }, []);

  const requestCameraPermission = async () => {
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

  const askPermission = async () => {
    isStepCountingSupported().then((result) => {
      console.debug("🚀 - isStepCountingSupported", result);
      setGranted(result.granted === true);
      setSupported(result.supported === true);
    });
  };

  useEffect(() => {
    console.log("location is updates -> ", location);
    locationRef.current = location;
    distanceRef.current = distanceTravelled;
  }, [location, distanceTravelled]);

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
          //console.log("geo locaiton : ", position.coords);
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
          //distanFilter: 1,
        }
      );
    });
  };

  const stroagePreration = async (
    calories: number,
    steps: number,
    distance: number
  ) => {
    //console.log('stroageData calling -> ',calories,  ' steps ',steps);
    const listLocationData = (await getStorageData()) || [];
    
    const currentTime = moment(new Date()).format(TIME_FORMAT);
    const currentDate = moment(new Date()).format(DATE_FORMAT);
    console.log("distanceTravelled calling -> ", currentTime);
    const data: LocalStarage = {
      calories: calories,
      distanceTravel: distance,
      stepsCount: steps,
      time: currentTime,
      date: currentDate,
    };
    console.log("distanceTravel -> ", data.distanceTravel, distanceTravelled);
    const list = manipulationInList(
      listLocationData,
      currentTime,
      currentDate,
      data
    );
    console.log("list -> ", list);
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
        console.log("data.distanceTravel 0-> ", data.distanceTravel, filtered);
        return filtered.map((item) => ({
          date: currentDate,
          time: currentTime,
          calories: item.calories + data.calories,
          distanceTravel: item.distanceTravel + data.distanceTravel,
          stepsCount: item.stepsCount + data.stepsCount,
        }));
      } else {
        console.log("data.distanceTravel 1-> ", data.distanceTravel, filtered);
        listLocationData.push(createNewDataList(currentTime, currentDate, data)) ;
        return listLocationData;
      }
    } else {
      console.log("data.distanceTravel 2-> ", data.distanceTravel);
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
    console.log("startStepCounter calling --->");
    const pemissionGraned = await requestCameraPermission();
    const locationEnabled = await checkIfLocationEnabled();
    if (!locationEnabled) {
      Alert.alert("", "Please enable location services.", [
        {
          text: "ok",
        },
        {
          text: "cancel",
        },
      ]);
      return;
    }
    console.log(
      "pemissionGraned -> ",
      pemissionGraned,
      " locationEnabled ->  ",
      locationEnabled
    );
    if (pemissionGraned) {
      console.log("startStepCounterUpdate calling 1 ", location);
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

  const startBackgroundServiceTask = async () => {
    await BackgroundService.start(async() => {
      startStepCounterUpdate(new Date(), async (data) => {
        console.debug(parseStepData(data));
        setSteps(data.steps);

        const loc = await getLocation();
        console.log("loc -> ", loc, " update -> ", locationRef.current);
        if (loc) {
          if (locationRef.current) {
            const distance = calculateDistance(locationRef.current, loc);
            setDistanceTravelled((prevDistance) => prevDistance + distance);
          }
          setLocation(loc);
          console.log(
            "stroagePreration ---> distance -> ",
            distanceRef.current
          );
          stroagePreration(calories, data.steps, distanceRef.current);
        }

        setCalories((pre) => pre + parseFloat(data?.calories || "0"));
      });
    }, BACKGROUND_TASK_OPTIONS);
  };

  return {
    steps: steps + previousStepsCount,
    askPermission,
    isStepCountingSupported,
    startStepCounter,
    stopStepCounterUpdate: stopBackgroundTask,
    distanceTravelled,
    calories,
    dataList,
  };
};

export default useAccelometer;
