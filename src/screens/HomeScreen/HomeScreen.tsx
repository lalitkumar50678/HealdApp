import React, { useMemo, useState } from "react";
import HomeScreenView from "./HomeScreenView";
import useAccelometer from "./hooks/useAccelometer";
import { TOTAL_TARGET_STEPS } from "../../constants";

const HomeScreen: React.FC = () => {
  const [isCount, setCount] = useState(false);
  const {
    steps,
    askPermission,
    isStepCountingSupported,
    startStepCounter,
    stopStepCounterUpdate,
    distanceTravelled,
    dataList,
  } = useAccelometer();

  console.log("dataList ---> ", dataList);

  const fillPrece=  useMemo(()=>{
    return (steps/TOTAL_TARGET_STEPS)*100;

  },[steps])

  const onStartStop = (isplay: boolean) => {
    setCount(!isplay);
    if (!isplay) {
      startStepCounter();
    } else {
      stopStepCounterUpdate();
    }
  };
  return (
    <HomeScreenView
      steps={steps}
      isPlaying={isCount}
      onStartStop={onStartStop}
      fill={fillPrece}
      distanceTravel={distanceTravelled}
      list={dataList}
    />
  );
};
export default HomeScreen;
