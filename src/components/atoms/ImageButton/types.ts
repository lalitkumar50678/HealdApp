import { ImageStyle } from "react-native";

export type ImageButtonProp ={
    image: number;
    onPress:()=> void;
    imageStyle ?: ImageStyle;
}