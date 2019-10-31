import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

 class Header_Authenticated extends React.Component{
  render(){
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {navigation.goBack();}} style={{height:50, marginTop:15}} >
          <Icon name="arrow-left" size={30} color="#fff" style={{marginBottom:2}}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={''} style={{flex:1, height:50,alignItems:'flex-end'}}>
                <Icon name="navicon" size={30} color="#fff" style={styles.icon}/>
            </TouchableOpacity>
        <Text style={{color:'#fff',fontSize:20,fontFamily:'Lato-Black', width:180, marginLeft:20}}>{this.props.title}</Text>
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
})

export default Header_Authenticated;