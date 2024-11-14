import React from "react";
import {View} from 'react-native';
import styles from "./styles";
import Text from "../../atoms/Text/Text";
import {generateShadow} from '../../../utils'
import { ToolBarProps } from "./types";
import { TextType } from "../../atoms/Text/Types";

const ToolBar: React.FC<ToolBarProps>=({title})=>{
    return (
        <View>
        <View style={[styles.toolbar,generateShadow()]}>
            <Text style={styles.textStyle}  type={TextType.primary}>{title}</Text>
        </View>
        </View>
    )
}

export default ToolBar;