import React from 'react';
import I18n from 'i18n-js';
import {StyleSheet, Text, View,ImageBackground, TouchableOpacity, KeyboardAvoidingView,AsyncStorage, Alert} from 'react-native';
import Header_login from '../headers/Header_login.js';
import {connect} from 'react-redux';
import LoginForm from '../components/NotAuthenticated/LoginForm';
import {actionLogin, saveDeviceToken,actionAnswer} from '../Config/Dispatch'
import * as Permissions from 'expo-permissions'
import { Notifications } from 'expo';
import * as Progress from 'react-native-progress';


class Login extends React.Component{
  componentWillMount() {
    this.registerPushNotifications();
  }
  componentDidMount() {
    console.disableYellowBox = true;
  }
  constructor(props) {
    super(props);
     this.props.wait(1)
     this.state={
      error:false,
      user:''
    }
  }
  componentWillReceiveProps(nextProps){
  if(nextProps.answer!=this.props.answer){
    if(nextProps.answer=='login'){
      Alert.alert(I18n.t('Error'),I18n.t('Error_server'),[{text: I18n.t('Retry'), onPress: () => this.signin(this.state.user)},{text: I18n.t('Cancel'), onPress: () => console.log('Cancel Pressed')}])
    }
    if(nextProps.answer=="Unauthorized"){
      this.setState({error:true})
    }
   this.setState(this.props.log)
  }
}
  signin = (values) => {
    this.setState({user:values})
    if(this.state.user==''){
    values.device_token = this.props.device_token
    values.language=this.props.language[0]
    console.log(values)
    this.props.Login(values)
    this.props.wait(0)
    }else{
    this.state.user.device_token = this.props.device_token
 this.props.Login(values)
    this.props.wait(0)    
    }
  };

  registerPushNotifications = async () => {
    const { status: existingStatus } = await Permissions.getAsync( Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
  
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
  
    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }
  
    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    token = token.replace('ExponentPushToken[', '');
    token = token.replace(']', '');
    this.props.SetDeviceToken(token);
  }
  render(){
    const {navigation} = this.props;
    return (

    <ImageBackground source={require('../assets/images/background-login.jpg')} style={{width: '100%', height: '100%'}}>
  {this.props.answer==0?<View style={{width: '100%', height: '100%',backgroundColor:'rgba(0,0,0,0.50)',zIndex:2, justifyContent:'center',alignItems:'center', position:'absolute'}}><Progress.Circle size={100} indeterminate={true}/></View>:null}
      <View style={[styles.container,{zIndex:0}]} >
        <Header_login/>
        <View style={styles.body}>
          <Text style={{fontFamily:'Lato-Black', marginBottom:-20, letterSpacing: 2}} >SIRENA</Text>
          <Text style={styles.logo}>Life<Text style={styles.logo2}>style</Text></Text>
        </View>
        <KeyboardAvoidingView style={styles.footer} behavior="padding" enabled>
        {this.state.error?<View style={styles.error}><Text style={{fontSize:15,color:'#590007'}}>{I18n.t('Invalid')}</Text></View>:null}
         <LoginForm Login={this.signin}/>
          <View style={{flexDirection:'row', alignItems:'center',justifyContent:'center', marginTop:8}}>
            <Text style={{fontFamily:'Lato-Light',color:'#fff', fontSize:14}}>{I18n.t('Dont_have')} </Text>
            <TouchableOpacity onPress={() => {navigation.navigate('Register');}} >
              <Text style={{fontFamily:'Lato-Black',}}>
                {I18n.t('Register')}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{alignItems:'center', marginTop:8}} onPress={() => {
            navigation.navigate('Forgot');
          }} >
          <Text style={{fontFamily:'Lato-Black',}}>
            {I18n.t('Forgot')}
          </Text>
          <View style={{backgroundColor:'black',height:2, width:20}}/>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  </ImageBackground>
  
      );
    }
  }
  const styles= StyleSheet.create({
    container:{
      flex:1,
    },
    body:{
      flex:2,
      justifyContent: 'center',
      alignItems:'center',
    },
    logo:{
      color: '#d65d92',
      fontSize:70,
      fontFamily: 'Lato-Light'
    },
    logo2:{
      color: '#ffffff',
      fontSize:70,
      fontFamily: 'Lato-Light',
      padding:20,
    },
    footer:{
       flex:2,
      justifyContent:'center',
      alignItems:'center'
    },
    error:{
      alignItems:'center',
      backgroundColor:'#d06972',
      marginBottom:'2%',
      height:'10%',
      justifyContent:'center', 
      borderRadius:5
    }
  })

const mapStateProps = state =>({
    log: state.ReducerLogin,
    device_token: state.ReducerSetDeviceToken,
    answer:state.ReducerAnswer,
    language:state.ReducerLanguage
})

const mapDispatchProps = (dispatch) => {
  return {
    Login: (data) => {
      dispatch(actionLogin(data))
    },
    SetDeviceToken: (token) => {
      dispatch(saveDeviceToken(token))
    },
     wait:(value)=>{
      dispatch(actionAnswer(value))
    }
  }
}

  export default connect(mapStateProps, mapDispatchProps)(Login);
