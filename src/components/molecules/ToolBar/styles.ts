import {StyleSheet,Dimensions} from 'react-native';
import { Colors } from '../../../utils';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    toolbar:{
        height: height* 0.07,
        backgroundColor: Colors.WHITE,
        justifyContent: 'center',
    },
    textStyle:{
        marginStart: 10,
    }
})

export default styles;