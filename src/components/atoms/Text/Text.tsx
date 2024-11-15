import React,{useMemo} from "react";

import {Text as NativeText} from 'react-native';
import { CustomTextProps, TextType } from "./Types";
import styles from './styles';



const Text: React.FC<CustomTextProps>=({children, type,style})=>{

    const textStyle = useMemo(() => {
        switch(type){
            case TextType.primary:
                return styles.primaryText;
            case TextType.main:
                return styles.mainTxt
            case TextType.secondary:
                return styles.secondaryText;
        }
      }, [type]);
    
    return (
        <NativeText style={[textStyle, style]}>
        {children}
        </NativeText>
    )
}
export default Text;