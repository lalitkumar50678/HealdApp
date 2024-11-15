import React from "react";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { CircularProgressBarProps } from "./types";
import { Colors } from "../../../utils";
import { Text, View } from "react-native";
import { Circle } from "react-native-svg";



const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
    size= 240,
    width = 15,
    fill = 100,
    tintColor= Colors.SKYBLUE,
    backgroundColor = Colors.LIGHTBLUE,
    onAnimationCompleted,
    arcSweepAngle= 270,
    rotation= 225,
    children
}) => {
  return (
    <AnimatedCircularProgress
      size={size}
      width={width}
      fill={fill}
      tintColor={tintColor}
      onAnimationComplete={onAnimationCompleted}
      backgroundColor={backgroundColor}
      arcSweepAngle={arcSweepAngle}
      rotation={rotation}
      renderCap={({ center }) => <Circle cx={center.x} cy={center.y} r="15" fill={Colors.CIRCULAR_FILL} />}
    >
    {children}
    </AnimatedCircularProgress>
  );
};
export default CircularProgressBar;