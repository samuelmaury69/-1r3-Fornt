import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

 class Header_login extends React.Component{
  render(){
    return (<View style={{alignItems:'center',justifyContent:'center'}}>
      <Image style={styles.logo} source={require('../assets/images/app-logo-sirena.png')}/>
      </View>
      );
  }
}
const styles= StyleSheet.create({
  logo:{
   width:125,
   height:64,
  },
})

export default Header_login;