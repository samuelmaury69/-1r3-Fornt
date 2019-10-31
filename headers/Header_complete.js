import React from 'react';
import {StyleSheet, View, ImageBackground, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

 class Header_complete extends React.Component{
  render(){
    return (
      <View style={styles.header}>
          <ImageBackground style={styles.images} source={require('../assets/images/banner-3.jpg')}>
        <TouchableOpacity onPress={() => {navigation.goBack();}} style={{height:50, marginTop:15}} >
          <Icon name="arrow-left" size={30} color="#fff" style={{marginBottom:2}}/>
        </TouchableOpacity>
        <Text style={{color:'#fff',fontSize:20,fontFamily:'Lato-Black', width:180, marginLeft:20}}>REGISTRATE</Text>
        </ImageBackground>
        </View>
      );
  }
}
const styles= StyleSheet.create({
     header:{
       flex:1,
       alignItems:'center',
       justifyContent:'center',
     },

    images:{
      width:'100%',
      height:'100%',
      justifyContent:'flex-end',
    },
})

export default Header_complete;