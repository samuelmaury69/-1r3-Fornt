import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Text, View,ImageBackground, Button, TextInput, TouchableOpacity, Image, Modal,Alert} from 'react-native';
import {actionchanguelanguage, actionShowlanguage,actionAnswer} from '../Config/Dispatch';
import Header_login from '../headers/Header_login.js';
import Flags from "react-native-phone-input/lib/resources/flags";
import * as Progress from 'react-native-progress';
import I18n from 'i18n-js';
 class Start extends React.Component{
  componentDidMount() {
    console.disableYellowBox = true;
  }
    componentWillReceiveProps(nextProps){
    if(nextProps.answer==='ListLanguage'){
Alert.alert(I18n.t('Error'),I18n.t('Error_server'),[{text: I18n.t('Retry'), onPress: () => this.chooselanguage()},{text: I18n.t('Cancel'), onPress: () => console.log('Cancel Pressed')}])
    }
  }
  constructor(props) {
     super(props);
    this.state={
      modalVisible:false,
      flags:I18n.locale
    }
  }
    toggleModal(visible){
    this.setState({modalVisible: visible});
  }
   chooselanguage(){
    this.toggleModal(true)
    this.props.wait(0)
    this.props.ShowLanguage()
  }
  changelanguage(language, code){
   const locatio= code
      I18n.fallbacks = true;
      I18n.translations ={ 'en' : JSON.parse(language)};
      I18n.locale =code;
     this.setState({ flags: code });
      this.props.ChangeLanguages([code,language])
      this.toggleModal(false)
  }
  render(){
    const {navigation} = this.props;
    return (
      <ImageBackground source={require('../assets/images/background-login.jpg')} style={{width: '100%', height: '100%'}}>
        <Modal id='modal1' animationType ={'slide'} transparent = {true} visible={this.state.modalVisible} onRequestClose={()=>{console.log('close')}}>
        {this.props.answer==0?<View style={{width: '100%', height: '100%',backgroundColor:'rgba(0,0,0,0.50)',zIndex:2, justifyContent:'center',alignItems:'center', position:'absolute'}}><Progress.Circle size={100} indeterminate={true}/></View>:null}
          <View style={{flex:1, backgroundColor:'rgba(0,0,0,0.50)', justifyContent:'center',alignItems:'center'}}>
            <View style={styles.modal}>
            <View style={{flexDirection:'row', width:'70%'}}>
            <Text style={{fontFamily:'Lato-Black',flex:2}}>{I18n.t('Select_languaje')}</Text>
            <TouchableOpacity id="button-close1" onPress={()=>{this.toggleModal(!this.state.modalVisible)}} style={{flex:1, justifyContent:'flex-start',alignItems:'flex-end', marginRight:5, }} >
                            <Text style={{color:"#002A3D", fontFamily:'Lato-Black', fontSize:20}}>X</Text>
                          </TouchableOpacity>
                          </View>
                          <View style={{justifyContent:'center',alignItems:'stretch'}}>
                          {Array.isArray(this.props.answer)?<View>
                          {this.props.answer.map((prop,key) => {  return (
                            <TouchableOpacity id={prop.code} style={{ flexDirection:'row', marginTop:'2%',width:'100%'}} onPress={()=> this.changelanguage(prop.text,prop.code)} key={key}>
                           {prop.code.substr(0,2)==='en'?<Image source={Flags.get('gb')}style={styles.flag}/>:<Image source={Flags.get(prop.code.substr(0,2))}style={styles.flag}/>}
                            <Text style={{fontFamily:'Lato-Light'}}>{prop.name}</Text>
                          </TouchableOpacity>
                            )})}</View>:<Text></Text>
                          }
              </View>
            </View>
         </View>
      </Modal>
      <View style={styles.container}>
      <View style={{alignItems:'flex-end', justifyContent:'center', flexDirection:'row'}}>
      <View style={{flex:4,alignItems:'flex-end',justifyContent:'flex-start'}}>
      <Header_login/>
      </View>
            <TouchableOpacity id='button-flag1' style={{ flex:2,alignItems:'flex-end',justifyContent:'center'}} onPress={() => {this.chooselanguage()}}>
            <Image
                  source={Flags.get(this.state.flags)}
                  style={styles.flag}
                />
            </TouchableOpacity>
            </View>
      <View style={styles.body}>
      <Text style={{fontFamily:'Lato-Black', marginBottom:-25, letterSpacing: 2}} >SIRENA</Text>
      <Text style={styles.logo}>Life<Text style={styles.logo2}>style</Text></Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity id="enter" onPress={() => {
                navigation.navigate('Login');
                  }} style={styles.button} >
          <Text style={{color:"#ffffff"}}>
              {I18n.t('Enter')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity id="register" onPress={() => {
                navigation.navigate('Register');
                  }} style={styles.button} >
          <Text style={{color:"#ffffff"}}>
             {I18n.t('Check_in')}
          </Text>
        </TouchableOpacity>
      </View>
      </View>
      </ImageBackground>
      
      );
    }
  }
  const styles= StyleSheet.create({
    container:{
      flex:1,
    },
    button:{
    paddingTop:20,
    backgroundColor:'#002A3D',
    marginLeft:'10%',
    marginTop:'5%',
    width:'80%', 
    height:60, 
    alignItems:'center'
    },
    body:{
      flex:4,
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
      flex:2,
    },
        modal:{
    backgroundColor:'#fff',
    padding:20,
    flexWrap: 'wrap',
    borderRadius:10
  },
     flag: {
    height: 20,
    width: 30,
    marginRight:15,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: '#cecece',
    backgroundColor: '#cecece',
  },
  })

  const mapStateProps = (state) =>({
  language:state.ReducerLanguage,
  answer:state.ReducerAnswer,
})
const mapDispatchProps = (dispatch) => {
  return {
    ChangeLanguages:(language)=>{
      dispatch(actionchanguelanguage(language))
    },
    ShowLanguage:()=>{
      dispatch(actionShowlanguage())
    },
     wait:(value)=>{
      dispatch(actionAnswer(value))
    }
  }
}

export default connect(mapStateProps, mapDispatchProps)(Start);