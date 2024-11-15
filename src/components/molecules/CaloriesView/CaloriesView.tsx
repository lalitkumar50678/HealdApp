import React from "react";
import { View, Image } from "react-native";
import styles from "./styles";
import { CustomImages, generateShadow } from "../../../utils";
import Text from "../../atoms/Text/Text";
import style from "./styles";
import { LocalizationEN } from "../../../i18n";
import { CaloriesViewProps } from "./types";
import { TextType } from "../../atoms/Text/Types";

const CaloriesView: React.FC<CaloriesViewProps> =
 ({ calories, distance }) => {


   
  return (
    <View style={[styles.container, generateShadow()]}>
      <View style={styles.itemStyle}>
        <Image source={CustomImages.locationIcon} style={styles.imageStyle} />
        <Text type={TextType.secondary}>{distance}</Text>
        <Text type={TextType.secondary}>{LocalizationEN.KM}</Text>
      </View>
      <View style={styles.listSty} />
      <View style={styles.itemStyle}>
        <Image source={CustomImages.caloriesIcon} style={styles.imageStyle} />
        <Text type={TextType.secondary}>{calories}</Text>
        <Text type={TextType.secondary}>{LocalizationEN.CALORIES}</Text>
      </View>
    </View>
  );
};

export default CaloriesView;
