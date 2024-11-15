import { Platform, ViewStyle } from 'react-native';
import Colors from './colors';


export type ShadowProps ={
    elevation?: number;
    shadowColor?: string;
    shadowOpacity?: number;
    shadowRadius?: number;
    shadowOffset?: {
      width: number;
      height: number;
    };
  }
/**
 * Method use to generate the 
 * shadow
 * @param param0 
 * @returns Shadow style
 */
export const generateShadow = ({
  elevation = 5,
  shadowColor = Colors.BLACK,
  shadowOpacity = 0.3,
  shadowRadius = 5,
  shadowOffset = { width: 0, height: 2 },
} : ShadowProps = {}): ViewStyle => {
  if (Platform.OS === 'ios') {
    return {
      shadowColor,
      shadowOpacity,
      shadowRadius,
      shadowOffset,
    };
  } else {
    return {
      elevation,
      shadowColor, // Optional, for a better shadow color on Android
    };
  }
};
