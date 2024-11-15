import React from "react";
import { View } from "react-native";
import Text from "../../atoms/Text/Text";
import { StepsViewProps } from "./types";
import styles from "./styles";
import ImageButton from "../../atoms/ImageButton/ImageButton";
import { CustomImages } from "../../../utils";
import { TextType } from "../../atoms/Text/Types";
import { LocalizationEN } from "../../../i18n";

const StepsView: React.FC<StepsViewProps> = ({
  isPlaying,
  onStartStop,
  stepsCount,
  targetStepsCount,
}) => {
  
  return (
    <View style={styles.mainViewStl}>
      <Text style={styles.textStyle} type={TextType.primary}>
        {LocalizationEN.STEPS}
      </Text>
      <Text type={TextType.main}>{stepsCount}</Text>
      <Text>
        <Text type={TextType.secondary}>/</Text>
        <Text type={TextType.secondary}>{targetStepsCount}</Text>
      </Text>
      <ImageButton
        image={!isPlaying ? CustomImages.playIcon : CustomImages.pauseIcon}
        onPress={() => onStartStop(isPlaying)}
        imageStyle={styles.imageStyle}
      />
    </View>
  );
};

export default StepsView;
