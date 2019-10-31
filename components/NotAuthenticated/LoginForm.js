import React, { Component } from 'react';
import I18n from 'i18n-js';
import {StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Field, reduxForm } from 'redux-form';

const field = (props) => {
	return(
		<View style={styles.container}>
				<TextInput 
					style={props.input.name === 'email' ? styles.TextInput: styles.TextInput2}
					placeholderTextColor="#1590cf"
					placeholder={props.ph}
					onChangeText={props.input.onChange}
					value={props.input.value}
					keyboardType={props.input.name === 'email' ? 'email-address': 'default'}
					autoCapitalize="none"
					secureTextEntry={!!(props.input.name === 'password')}
					onBlur={props.input.onBlur}
				/>
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
	if(!values.password){
		errors.password = I18n.t('Enter_password');
	}
	return errors;
};

const LoginForm = (props) => {
	return(
		<View>
			<Field name="email" component={field } ph={I18n.t('User')}/>
			<Field name="password" component={field } ph={I18n.t('Password')}/>
			<TouchableOpacity style={styles.button} onPress={props.handleSubmit(props.Login)} >
					<Text style={{color:"#ffffff"}}>{I18n.t('Enter')}</Text>
			</TouchableOpacity>
		</View>

		);
};

const styles = StyleSheet.create({
	container:{
		backgroundColor:'#ffffff',
		width:310,
		height:60,
		alignItems:'center',
		justifyContent:'center',
		paddingTop:30,
		paddingBottom:15,
	},
	TextInput:{
		textAlign:'center',
		width:250,
		height:15,
	},
	TextInput2:{
		textAlign:'center',
		width:250,
		marginTop:-32,
		marginBottom:-1.5,
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

export default reduxForm({form: 'LoginForm',validate})(LoginForm)