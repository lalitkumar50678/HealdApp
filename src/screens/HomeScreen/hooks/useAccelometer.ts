import { useEffect, useState } from "react";
import { accelerometer } from 'react-native-sensors';
import { filter, map } from 'rxjs/operators';
import {
    isStepCountingSupported,
    parseStepData,
    startStepCounterUpdate,
    stopStepCounterUpdate,
  } from '@dongminyu/react-native-step-counter';

const threshold = 1.2;
const earthGravity = 9.8;
const useAccelometer=()=>{
    const [steps, setSteps] = useState(0);
    const [supported, setSupported] = useState(false);
    const [granted, setGranted] = useState(false);

    useEffect(() => {
        // const subscription = accelerometer
        //   .pipe(
        //     map(({ x, y, z }) => Math.sqrt(x * x + y * y + z * z) - 9.8), // removing gravity (9.8 m/s²)
        //     filter((magnitude) => magnitude > threshold)
        //   )
        //   .subscribe({
        //     next: () => {
        //       setSteps((prevSteps) => prevSteps + 1);
        //     },
        //     error: (error) => console.error("Accelerometer error:", error),
        //   });
    
        // return () => subscription.unsubscribe();
        startStepCounter();
      }, []);

      const  askPermission=async() =>{
        isStepCountingSupported().then((result) => {
          console.debug('🚀 - isStepCountingSupported', result);
          setGranted(result.granted === true);
          setSupported(result.supported === true);
        });
      }

     const startStepCounter=async()=>{
        startStepCounterUpdate(new Date(), (data) => {
          console.debug(parseStepData(data));
          setSteps(data.steps);
        });
      }

    return  {
        steps,
        askPermission,
        isStepCountingSupported,
        startStepCounter,
        stopStepCounterUpdate
    }
}

export default useAccelometer;