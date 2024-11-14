import React, { useState } from "react";
import HomeScreenView from './HomeScreenView';
import useAccelometer from "./hooks/useAccelometer";

const THRESHOLD = 1.2; 
const HomeScreen: React.FC=()=>{
    const { steps, startStepCounter} = useAccelometer();


    return (
       <HomeScreenView steps={steps} />
    )
}
export default HomeScreen;