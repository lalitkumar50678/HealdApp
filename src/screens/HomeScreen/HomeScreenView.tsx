import React from "react";
import { View } from "react-native";
import styles from "./styles";
import CircularProgressBar from "../../components/atoms/CircularProgresssBar/CircularProgressBar";
import Text from "../../components/atoms/Text/Text";
import ToolBar from "../../components/molecules/ToolBar/ToolBar";
import { LocalizationEN } from "../../i18n";
import { HomeScreenViewProps } from "./types";
import { TextType } from "../../components/atoms/Text/Types";
import { Colors } from "../../utils";

const HomeScreenView: React.FC<HomeScreenViewProps> = ({ steps }) => {
  return (
    <View style={styles.container}>
      <ToolBar title={LocalizationEN.HOME} />
      <View style={styles.circluarStyle}>
        <CircularProgressBar
          fill={40}
          tintColor={Colors.CIRCULAR_FILL}
          backgroundColor={Colors.CIRCULAR_UNFILL}
          width={25}
        >
          {(fill) => (
            <View style={{ flex: 1, backgroundColor: "red" }}>
              <Text type={TextType.primary}>{LocalizationEN.STEPS}</Text>
              <Text>{fill}</Text>
              
            </View>
          )}
        </CircularProgressBar>

        <Text>{steps}</Text>
      </View>
    </View>
  );
};

export default HomeScreenView;
