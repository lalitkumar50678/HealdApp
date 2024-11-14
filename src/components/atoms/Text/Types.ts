import type {PropsWithChildren} from 'react';
import { TextStyle } from 'react-native';

export enum TextType {
    secondary =  'secondary',
    primary = 'primary',
}

export  type  CustomTextProps=PropsWithChildren & {
    type : TextType,
    style?: TextStyle,
}