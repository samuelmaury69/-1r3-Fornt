import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight,AsyncStorage,Modal,Image, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux';
import storage from 'redux-persist/lib/storage';
import {actionBalance,actionList_clients,actionSessionEnable,actionchanguelanguage,dispatchVisit,actionShowlanguage,actionAnswer} from '../Config/Dispatch';
import Flags from "react-native-phone-input/lib/resources/flags";
import * as Progress from 'react-native-progress';
import I18n from 'i18n-js';
class DrawerContent extends React.Component {
    componentWillReceiveProps(nextProps){
    if(Array.isArray(nextProps.answer)){
      this.toggleModal(true)
    }
    if(nextProps.answer==='ListLanguage'){
Alert.alert(I18n.t('Error'),I18n.t('Error_server'),[{text: I18n.t('Retry'), onPress: () => this.chooselanguage()},{text: I18n.t('Cancel'), onPress: () => console.log('Cancel Pressed')}])
    }
  }
  constructor(props) {
     super(props);
    let flag=I18n.locale;
    if(flag=='en'){
      flag='gb'
    }else if(flag=='du'){
      flag='pt'
    }else{
     flag=I18n.locale.split('-')[0];
    }
    this.state={
      modalVisible:false,
      flags:flag
    }
  }
  profile=()=>{
    this.props.close()
    const {navigation} = this.props;
    navigation.navigate('Profile');
  };

  add=()=>{
    this.props.close()
    const {navigation} = this.props;
    navigation.navigate('Add_contact');
  }
  Balance = () =>{
    this.props.close()
    const Bal=[this.props.user.access_token, this.props.user.user.id]
    this.props.Balance(Bal)
    const {navigation} = this.props;
    navigation.navigate('Payments');
  };
  Client = () =>
  {
    this.props.close()
    const client=[this.props.user.access_token, this.props.user.user.id]
    this.props.Client(client)
    const {navigation} = this.props;
    navigation.navigate('List_client');
  };
  reload=()=>{
    this.props.close()
    this.props.Update([this.props.user.user.id,this.props.user.access_token])
    if(Object.entries(this.props.Show_Visit).length!=0){
      const {navigation} = this.props;
      navigation.navigate('Visits');
      }
      else{
      this.props.Update([this.props.user.user.id,this.props.user.access_token])
    }
  }
  logout= async ()=>{
    let contacts = await storage.getItem('phoneContacts');
    await storage.clear()
    if(contacts){
    await storage.setItem('phoneContacts', contacts);
            }
    this.props.logout()
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
  toggleModal(visible){
    this.setState({modalVisible: visible});
  }
  render(){
  return(<View style={styles.animatedBox}>  
      <Modal id='modal2' animationType ={'slide'} transparent = {true} visible={this.state.modalVisible} onRequestClose={()=>{console.log('close')}}>
        {this.props.answer==0?<View style={{width: '100%', height: '100%',backgroundColor:'rgba(0,0,0,0.50)',zIndex:9999, justifyContent:'center',alignItems:'center', position:'absolute'}}><Progress.Circle size={100} indeterminate={true}/></View>:null}
          <View style={{flex:1, backgroundColor:'rgba(0,0,0,0.50)', justifyContent:'center',alignItems:'center'}}>
            <View style={styles.modal}>
            <View style={{flexDirection:'row', width:'70%'}}>
            <Text style={{fontFamily:'Lato-Black',flex:2}}>{I18n.t('Select_languaje')}</Text>
            <TouchableOpacity id="button-close2" onPress={()=>{this.toggleModal(!this.state.modalVisible)}} style={{flex:1, justifyContent:'flex-start',alignItems:'flex-end', marginRight:5, }} >
                            <Text style={{color:"#002A3D", fontFamily:'Lato-Black', fontSize:20}}>X</Text>
                          </TouchableOpacity>
                          </View>
                          <View style={{justifyContent:'center',alignItems:'stretch'}}>
                          {Array.isArray(this.props.answer)?<View>
                          {this.props.answer.map((prop,key) => {  return (
                            <TouchableOpacity style={{ flexDirection:'row', marginTop:'2%',width:'100%'}} onPress={()=> this.changelanguage(prop.text,prop.code)} key={key}>
                           {prop.code.substr(0,2)==='en'?<Image source={Flags.get('gb')}style={styles.flag}/>:<Image source={Flags.get(prop.code.substr(0,2))}style={styles.flag}/>}
                            <Text style={{fontFamily:'Lato-Light'}}>{prop.name}</Text>
                          </TouchableOpacity>
                            )})}</View>:<Text></Text>
                          }
              </View>
            </View>
         </View>
      </Modal>
    <Text style={{color:'#fff',fontSize:30, fontWeight: 'bold',paddingTop:'10%'}}>{this.props.user.user.name}</Text>
    <View style={{height:2, backgroundColor:'#fff',marginBottom:'10%',width:'100%'}}/>
    <TouchableHighlight onPress={this.profile} style={styles.button} underlayColor={'#1590CF'}>
      <Text style={styles.text}>{I18n.t('Profile')}</Text>
    </TouchableHighlight>
    <TouchableHighlight onPress={this.Balance} style={styles.button} underlayColor={'#1590CF'}>
      <Text style={styles.text}>{I18n.t('Payments')}</Text>
    </TouchableHighlight>
    {this.props.user.role_id.find(function(element){ return element.description != 'seller'})?<TouchableHighlight onPress={this.Client} style={styles.button} underlayColor={'#1590CF'}>
      <Text style={styles.text}>{I18n.t('CP')}</Text>
    </TouchableHighlight>:null}
    {this.props.user.role_id.find(function(element){ return element.description != 'seller'})?<TouchableHighlight onPress={this.add} style={styles.button} underlayColor={'#1590CF'}>
      <Text style={styles.text}>{I18n.t('Add_Client')}</Text>
    </TouchableHighlight>:null}
    {this.props.user.role_id.find(function(element){ return element.description == 'seller'})?<TouchableHighlight onPress={this.reload} style={styles.button} underlayColor={'#1590CF'}>
      <Text style={styles.text}>{I18n.t('Visits')}</Text>
    </TouchableHighlight>:null}
    <TouchableOpacity id='button-flag2' style={styles.button} onPress={() => {this.chooselanguage()}}>
      <View style={{flexDirection:'row'}}>
        <Text style={styles.text}>{I18n.t('Language')}            </Text>
        <Image source={Flags.get(this.state.flags)} style={styles.flag}/>
      </View>
    </TouchableOpacity>
    <TouchableHighlight onPress={this.logout} style={styles.button} underlayColor={'#1590CF'}>
      <Text style={styles.text}>{I18n.t('Exit')}</Text>
    </TouchableHighlight>

  </View>);
      
    }
  }
  const styles = StyleSheet.create({
    animatedBox: {
      flex: 1,
      backgroundColor: "#002A3D",
      padding: 10,
      marginLeft:'30%'
    },
    button:{
      height:'10%',
      justifyContent:'center'
    },
    text:{
      color:'#fff',
      fontSize:15
    },
    modal:{
      backgroundColor:'#fff',
      padding:30,
      flexWrap: 'wrap',
      borderRadius:10
    },
    flag: {
      height: 20,
      width: 30,
      marginRight:15,
      borderRadius: 2,
      borderWidth: 0.5,
    },
  })
  const mapStateProps = (state) =>({
    'Blanace': state.ReducerBalance,
    'list':state.Reducerlist,
    user:state.ReducerLogin,
    language:state.ReducerLanguage,
    Show_Visit: state.ReducerVisit,
    answer:state.ReducerAnswer,
  })
  const mapDispatchProps = (dispatch) => {
    return {
      Balance: (data) => {
        dispatch(actionBalance(data))
      },
      Client:(data)=>{
        dispatch(actionList_clients(data))
      },
      logout:()=>{
        dispatch(actionSessionEnable())
      },
      ChangeLanguages:(language)=>{
        dispatch(actionchanguelanguage(language))
      },
      Update:(Seller)=>{
        dispatch(dispatchVisit(Seller))
      },
   ShowLanguage:()=>{
      dispatch(actionShowlanguage())
    },  
    ChangeLanguages:(language)=>{
      dispatch(actionchanguelanguage(language))
    },
    wait:(value)=>{
      dispatch(actionAnswer(value))
    }
    }
  }

  export default connect(mapStateProps, mapDispatchProps)(DrawerContent);