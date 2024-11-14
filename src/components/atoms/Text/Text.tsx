import React,{useMemo} from "react";

import {Text as NativeText} from 'react-native';
import { CustomTextProps, TextType } from "./Types";
import styles from './styles';



const Text: React.FC<CustomTextProps>=({children, type,style})=>{

    const textStyle = useMemo(() => {
        return type === TextType.primary ? styles.primaryText : styles.secondaryText;
      }, [type]);
    
    return (
        <NativeText style={[textStyle, style]}>
        {children}
        </NativeText>
    )
}
export default Text;