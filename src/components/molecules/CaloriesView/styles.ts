import { StyleSheet } from "react-native";
import styles from "../ToolBar/styles";
import { Colors } from "../../../utils";
import { showErrorCSS } from "react-native-svg/lib/typescript/deprecated";


const style = StyleSheet.create({
    container: {
        height: 100,
        flexDirection: 'row',
        backgroundColor: Colors.WHITE,
        alignItems: 'center',
        justifyContent: 'space-between',
        margin:10,
    },
    itemStyle: {
        //justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    imageStyle:{
        height: 20,
        width: 20,
    },
    listSty:{
        height: 80,
        width: StyleSheet.hairlineWidth,
        backgroundColor: Colors.GRAY
    }
});
export default style;