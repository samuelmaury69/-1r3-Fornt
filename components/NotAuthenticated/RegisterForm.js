import React, { Component } from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import Icon from 'react-native-vector-icons/FontAwesome';
import I18n from 'i18n-js';

const field = (props) => {
	return(
		<View style={{justifyContent:'flex-end',alignItems:'flex-end', flex:5}}>
				<TextInput 
					style={styles.TextInput}
					placeholderTextColor="#1590cf"
					placeholder={props.ph}
					onChangeText={props.input.onChange}
					value={props.input.value}
					keyboardType='email-address'
					autoCapitalize="none"
					onBlur={props.input.onBlur}
				/>
					{props.meta.touched && props.meta.error && <View  ><Text style={styles.errors}>{props.meta.error}</Text></View>}
				
				
			</View>
		);
};
const validate = (values) =>{
	const errors={};
	if(!values.email){
		errors.email = I18n.t('Enter_user');
	}else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
		errors.email = I18n.t('Invalid_email');
	}
	return errors;
};

const RegisterForm = (props) => {
	return(
		<View style={{ flexDirection:'row', justifyContent:'center'}}>
			<Field name="email" component={field } ph={I18n.t('Mail')}/>
			<TouchableOpacity onPress={props.handleSubmit(props.Search)} style={{flex:1, width:'10%',justifyContent:'center',alignItems:'center'}}>
				<Text style={{ color: '#1590CF' }}>{ I18n.t('Send')}</Text>
			</TouchableOpacity>
		</View>

		);
};

const styles = StyleSheet.create({
	TextInput:{
		width:'80%',
		textAlign:'center',
		borderBottomWidth:1.5,
		borderBottomColor:'#1590CF'
	},
	errors:{
		fontSize:10,
		color:'#590007',
	}
})

export default reduxForm({form: 'RegisterForm',	validate})(RegisterForm)