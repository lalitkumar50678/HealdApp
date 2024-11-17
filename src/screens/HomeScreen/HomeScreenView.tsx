import React from "react";
import { View } from "react-native";
import styles from "./styles";
import CircularProgressBar from "../../components/atoms/CircularProgresssBar/CircularProgressBar";
import Text from "../../components/atoms/Text/Text";
import ToolBar from "../../components/molecules/ToolBar/ToolBar";
import { LocalizationEN } from "../../i18n";
import { HomeScreenViewProps } from "./types";
import { TextType } from "../../components/atoms/Text/Types";
import { Colors, generateShadow } from "../../utils";
import StepsView from "../../components/molecules/StepsView/StepsView";
import { TOTAL_TARGET_STEPS } from "../../constants";
import CaloriesView from "../../components/molecules/CaloriesView/CaloriesView";
import StepsGraphView from "../../components/molecules/StepsGraphView/StepsGraphView";

const HomeScreenView: React.FC<HomeScreenViewProps> = ({
  steps,
  isPlaying,
  onStartStop,
  fill,
  distanceTravel,
  list,
}) => {
  return (
    <View style={styles.container}>
      <ToolBar title={LocalizationEN.HOME} />
      <View style={[styles.stepsViewStyle, generateShadow()]}>
        <View style={styles.circluarStyle}>
          <CircularProgressBar
            fill={fill}
            tintColor={Colors.CIRCULAR_FILL}
            backgroundColor={Colors.CIRCULAR_UNFILL}
            width={25}
          >
            {() => (
              <StepsView
                stepsCount={steps}
                targetStepsCount={TOTAL_TARGET_STEPS}
                isPlaying={isPlaying}
                onStartStop={onStartStop}
              />
            )}
          </CircularProgressBar>

          <Text type={TextType.secondary}>{steps}</Text>
        </View>
      </View>
      <CaloriesView
        calories={10}
        distance={parseFloat(distanceTravel.toFixed(2))}
      />
      <StepsGraphView list={list} />
    </View>
  );
};

export default HomeScreenView;
