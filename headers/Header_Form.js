import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

 class Header_Form extends React.Component{
  render(){
    return (
      <Image style={styles.logo} source={require('../assets/images/banner-formulario-movil.jpg')}/>
      );
  }
}
const styles= StyleSheet.create({
  logo:{
   width:'100%',
   height:'25%',
  },
})

export default Header_Form;