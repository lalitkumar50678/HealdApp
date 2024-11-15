import React from "react";
import { View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import styles from "./styles";
import { Colors, generateShadow } from "../../../utils";
import { StepsGraphViewProps } from "./types";

const StepsGraphView: React.FC<StepsGraphViewProps> = ({ list }) => {
  const barData = list.map((item) => ({
    value: item.stepsCount,
    label: item.time,
  }));
  console.log('barData -> ',barData);
  if (barData.length > 0) {
    return (
      <View style={[styles.container, generateShadow()]}>
        <BarChart
          frontColor={Colors.CIRCULAR_FILL}
          barWidth={22}
          capColor={"rgba(78, 0, 142)"}
          data={barData}
        />
      </View>
    );
  }
  return null;
};

export default StepsGraphView;
