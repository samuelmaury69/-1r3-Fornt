import React, { Component } from 'react';
import I18n from 'i18n-js';
import {StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Field, reduxForm } from 'redux-form';

const field = (props) => {
	return(
		<View style={styles.container}>
				<TextInput 
					style={styles.TextInput}
					placeholderTextColor="#1590cf"
					placeholder={props.ph}
					onChangeText={props.input.onChange}
					value={props.input.value}
					keyboardType={props.input.name === 'email' ? 'email-address': 'default'}
					autoCapitalize="none"
					onBlur={props.input.onBlur}/>
				<View style={styles.line}/>
					{props.meta.touched && props.meta.error && <View style={{alignItems:'center'}}><Text style={styles.errors}>{props.meta.error}</Text></View>}
				</View>
		);
};

const validate = (values) =>{
	const errors={};
	if(!values.email){
		errors.email = I18n.t('Enter_user');
	}else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
		errors.email = I18n.t('User_invalid');
	}
	return errors;
};

const Forgotform = (props) => {
	return(
		<View>
			<Field name="email" component={field} ph={I18n.t('User')}/>
			<TouchableOpacity style={styles.button} onPress={props.handleSubmit(props.Reset)} >
			<Text style={{color:"#ffffff"}}>{I18n.t('Reestablish')}</Text>
			</TouchableOpacity>
		</View>

		);
};

const styles = StyleSheet.create({
	container:{
		backgroundColor:'#ffffff',
		height:60,
		alignItems:'center',
		justifyContent:'center',
		paddingTop:30,
		paddingBottom:15,
	},
	TextInput:{
		textAlign:'center',
		height:15,
	},
	line:{
		backgroundColor:'#1590cf',
		height:2,
		width:250, 
		marginTop:1
	},
	button:{
		backgroundColor:'#002A3D',
		alignItems:'center',
		justifyContent:'center',
		height:50,
	},
	errors:{
		fontSize:10,
		color:'#590007',
	}
})

export default reduxForm({form: 'Forgotform',validate})(Forgotform)