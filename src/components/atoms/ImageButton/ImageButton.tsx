import React from "react";
import {View,Text,TouchableOpacity, Image} from 'react-native';
import { ImageButtonProp } from "./types";
import styles from './styles';

const ImageButton: React.FC<ImageButtonProp>=({image, onPress,imageStyle})=>{
    return(
        <TouchableOpacity onPress={onPress}>
            <Image source={image} style={[styles.imageStyle,imageStyle]} />
        </TouchableOpacity>
    )
}
export default ImageButton;