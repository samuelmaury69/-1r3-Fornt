import React, { PureComponent } from 'react';
import { StyleSheet, TextInput } from 'react-native';

class Input extends PureComponent {
	_onChangeText = text =>{
		this.props.onChangeValue(this.props.name, text)
	};
	render(){
		const {onChangeValue, name, ...rest }=this.props;
		return <TextInput {...rest} 
		onChangeText={this._onChangeText}
		keyboardType={name === 'email' ? 'email-address': name === 'phone' ? 'numeric' : name === 'cell' ? 'numeric' : null}
		style={styles.Input}
		placeholderTextColor = "#002A3D"
		autoCorrect={false}
		/>;
	}
}
const styles = StyleSheet.create({
  Input: {
    borderBottomWidth:1,
    borderBottomColor: 'grey',
    width:'80%',
    fontSize:15,
  },
});
export default Input;