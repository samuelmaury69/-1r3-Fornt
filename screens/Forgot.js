import React from 'react';
import {StyleSheet, Text, View,ImageBackground, TextInput, TouchableOpacity, KeyboardAvoidingView,Alert} from 'react-native';
import {connect} from 'react-redux';
import I18n from 'i18n-js';
import Header_login from '../headers/Header_login.js';
import {actionforgot,actionAnswer} from '../Config/Dispatch';
import * as Progress from 'react-native-progress';
import Forgotform from '../components/NotAuthenticated/Forgotform';

class Forgot extends React.Component{
  componentDidMount() {
    console.disableYellowBox = true;
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.answer!=this.props.answer){
      switch (nextProps.answer) {
        case 'reestablish':
         Alert.alert(I18n.t('Error'),I18n.t('Server'),[{text: I18n.t('Retry'), onPress: () => this.submitemail(this.state.user)},{text: I18n.t('Cancel'), onPress: () => {console.log('cancel')}},  ])
          break;
          default:
          if(nextProps.answer.status ==true){
            Alert.alert(I18n.t('Check_email'))
          }else if(nextProps.answer.status==false){
             Alert.alert(I18n.t('Invalid_email'))
          }
          break
      }
    }
  }

  constructor(props) {
    super(props);
    this.props.Update_avatar(1)
    this.state = {
      titleText: I18n.t('Reestablish'),
      bodyText: I18n.t('Reestablish_message')
    };
  }
  submitemail=(values)=>{
    var lang=''
    if(Object.keys(this.props.language).length === 0){
      lang='es'
    }else{
      lang=this.props.language
    }
    values.language=lang
    console.log(lang)
   this.setState({user:values})
    this.props.Reestablish(values)
   this.props.Update_avatar(0)
  }
  render(){
    const {navigation} = this.props;
    return (
    <ImageBackground source={require('../assets/images/background-login.jpg')} style={{width: '100%', height: '100%'}}>
      {this.props.answer==0?<View style={{width: '100%', height: '100%',backgroundColor:'rgba(0,0,0,0.50)',zIndex:2, justifyContent:'center',alignItems:'center', position:'absolute'}}><Progress.Circle size={100} indeterminate={true}/></View>:null}
      <KeyboardAvoidingView  style={styles.container} behavior='position' >
        <Header_login/>
        <View style={styles.body}>
          <Text style={{fontFamily:'Lato-Black', marginBottom:-25, letterSpacing: 2}} >SIRENA</Text>
          <Text style={styles.logo}>Life<Text style={styles.logo2}>style</Text></Text>
        </View>
        <View style={styles.footer}>
          <Text style={{textAlign:'center', fontFamily:'Lato-Light'}}>
            <Text style={styles.titleText} onPress={this.onPressTitle}>
              {this.state.titleText}{'\n'}
            </Text>
            <Text style={{textAlign:'center',color:"#ffffff", fontFamily:'Lato-Light', fontSize:13}}>{this.state.bodyText}{'\n'}{'\n'}
            </Text>
          </Text>
          <Forgotform Reset={this.submitemail}/>
          <TouchableOpacity style={{flex:3, alignItems:'center', marginTop:4 }} onPress={() => {navigation.goBack();}} >
          <Text style={{fontFamily:'Lato-Light',}}>{I18n.t('Back')}</Text>
          <View style={{backgroundColor:'black',height:2, width:20}}/>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  </ImageBackground>
      
      );
    }
  }
  const styles= StyleSheet.create({
    container:{
      flex:1,
      alignItems:'center'
    },
    body:{
      flex:3,
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
      fontFamily: 'Lato-Light'
    },

    titleText: {
      fontFamily:'Lato-Black',
      alignItems:'center',
      margin:50,
      fontSize: 15,
      color: '#ffffff',
      fontWeight:'bold'
    },
    footer:{
      flex:3,
      marginLeft:30,
      marginRight:40,
    },
  })

const mapStateProps = state =>({
answer:state.ReducerAnswer,
language:state.ReducerLanguage
})

const mapDispatchProps = (dispatch) => {
  return {
   Reestablish: (data) => {
      dispatch(actionforgot(data))
    },
     Update_avatar:(value)=>{
      dispatch(actionAnswer(value))
    }, }
}

  export default connect(mapStateProps, mapDispatchProps)(Forgot);