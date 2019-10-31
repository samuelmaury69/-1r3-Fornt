import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

class Input extends PureComponent {
	_onValueChange = value=>{
		this.props.onChangeValue(this.props.name, value)
		this.props.Show(value,this.props.name,)
	};

	render(){
		const pickerSelectStyles={
    inputIOS: {
        fontSize: 14,
        paddingHorizontal: 10,
        paddingTop:15,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        height:this.props.height,
    },
    inputAndroid: {
        fontSize: 14,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        height:this.props.height,
}
};
		const { name, ...rest }=this.props;
		return <View style={styles.container}>
					<RNPickerSelect {...rest}
					onValueChange={this._onValueChange}
                    placeholderTextColor = "#002A3D"
                    style={pickerSelectStyles}
                    useNativeAndroidPickerStyle={false}
                /></View>;
	}
}
const styles = StyleSheet.create({
  container: {
  	marginTop:10,
  	justifyContent:'center',
  	alignItems:'center',
    width:'80%',
  },
});
export default Input;