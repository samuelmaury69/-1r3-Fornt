import React, { Component } from 'react';
import { StyleSheet, View,Text,Platform,NativeModules} from 'react-native';
import {connect} from 'react-redux';
import {NotAuthenticated} from './NotAuthenticated';
import {Authenticated} from './Authenticated';
import Visits from '../screens/Visits';
import * as Localization from 'expo-localization'
import i18n from 'i18n-js';


i18n.fallbacks = true;
if (Platform.OS === 'android') {
  i18n.locale = NativeModules.I18nManager.localeIdentifier;
} else {
  i18n.locale = i18n.locale;
}

class Selection extends Component {
  componentWillMount(){
    let language=Localization.locale[0]+Localization.locale[1]
    if(JSON.stringify(this.props.language)=='{}'){
      i18n.locale = 'es';
      i18n.translations ={  'es': require('../es')    };
    }else{
      i18n.locale=this.props.language[0]
      i18n.translations ={ 'en': JSON.parse(this.props.language[1])}
    }   
  }
  constructor(props){
    super(props);
  }
  render() {
    return (
      <View style={{flex:1}}>
      {this.props.login.access_token?<Authenticated/>:<NotAuthenticated/>}
      </View>
      );
    }
  }

  const styles = StyleSheet.create({

  });
  const mapStateProps = state =>({
    login: state.ReducerLogin,
    language:state.ReducerLanguage
  })

  const mapDispatchProps = (dispatch) => {return{}}

  export default connect(mapStateProps, mapDispatchProps)(Selection);