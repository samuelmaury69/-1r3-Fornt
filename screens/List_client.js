import React, {Component}from 'react';
import {StyleSheet, Text, View,ImageBackground, Button, TextInput, TouchableOpacity, ScrollView, TouchableHighlight, Image} from 'react-native';
import {connect} from 'react-redux';
import MenuDrawer from 'react-native-side-drawer'
import DrawerContent from './Menu';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {actionEdit_contact,Show_menu} from '../Config/Dispatch';
import I18n from 'i18n-js';

class List_client extends React.Component{
  componentDidMount() {
    console.disableYellowBox = true;
  }
  toggleOpen=()=>{
        if(this.props.Menu==true){
        this.props.Show_menu(false)
      }else{
        this.props.Show_menu(true)
      }
  };
  constructor(props) {
    super(props);
     this.inputRefs = {};
        this.state = {
          list:this.props.List,
          id:'',
          filter:'',
        };
  }
showstatus=(status)=>{
  switch (status) {
    case 'send':
         return I18n.t('send_form');
    case 'form':
        return I18n.t('Full_form');
    case 'confirmed':
        return I18n.t('Confirmed');
    case 'scheduled':
        return I18n.t('Scheduled');
    case 'visit':
        return I18n.t('Realized');
    case 'bought':
        return I18n.t('Buy');
    case 'delivery':
        return I18n.t('Received');
   case 'accept':
         return I18n.t('accept');
   case 'noaccept':
         return I18n.t('noaccept');
  }
}
Edit=(client)=>{
  this.props.Edit_contact(client)
    const {navigation} = this.props;
    navigation.navigate('Edit_contact');
}
  render(){
    const {navigation} = this.props;
    return (<View style={styles.container}>
      <MenuDrawer open={this.props.Menu} drawerContent={<DrawerContent close={this.toggleOpen} navigation={navigation}/>}drawerPercentage={100} animationTime={20}>
      <View style={styles.header}>
        <ImageBackground style={styles.images} source={require('../assets/images/banner-3.jpg')}>
          <TouchableOpacity onPress={() => {navigation.goBack();}} style={{flex:1, height:50}} >
            <Icon name="arrow-back" size={30} color="#fff" style={[styles.icon,{marginLeft:15}]}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.toggleOpen} style={{flex:1,alignItems:'flex-end'}}>
            <Icon name="menu" size={30} color="#fff" style={[styles.icon,{marginRight:10}]}/>
          </TouchableOpacity>
        </ImageBackground>
        <Text style={{color:'#fff',fontSize:20,fontFamily:'Lato-Black', width:'100%', marginLeft:20, marginTop:-70}}>{I18n.t('CP').toUpperCase()}</Text>
      </View> 
      <View style={styles.body}>
        <View style={{flexDirection:'row', alignItems:'center', marginTop:5}}>
          <Text style={{flex:1, textAlign:'center',color:'#002A3D'}}>
            {I18n.t('Filter')}:
          </Text>
          <View style={styles.filter}>
            <RNPickerSelect
            placeholder={{ label: I18n.t('Select_filter')+'...',value: '',color: '#9EA0A4'}}
            items={[
                {
                    label: I18n.t('All'),
                    value: '',
                },
                {
                    label: I18n.t('send_form'),
                    value: 'send',
                },
                {
                    label: I18n.t('Full_form'),
                    value: 'form',
                },
                {
                    label: I18n.t('Confirmed'),
                    value: 'confirmed',
                },
                {
                    label: I18n.t('Scheduled'),
                    value: 'scheduled',
                },
                {
                    label: I18n.t('Realized'),
                    value: 'visit',
                },
                {
                    label: I18n.t('Buy'),
                    value: 'bought',
                },
                {
                    label: I18n.t('Received'),
                    value: 'delivery',
                },
                {
                    label: I18n.t('accept'),
                    value: 'accept',
                },
                 {
                    label: I18n.t('noaccept'),
                    value: 'noaccept',
                },
            ]}
            onValueChange={(value) => {this.setState({filter: value,}); }}
            onDownArrow={() => {this.inputRefs.picker2.togglePicker();}}
            style={{ ...pickerSelectStyles }}
            />
          </View>
        </View>
        {this.state.list.length>0?<ScrollView style={{marginTop:'3%'}}>
          {this.props.List.map((prop,key) => {if(prop.status==this.state.filter||this.state.filter==''){
                    return (
                    <View style={{flex:1}} key={key}>
                      <View style={{flexDirection:'row',padding:20, alignItems:'center'}}>
                        <Icon name='person' size={20} color='#002A3D' style={{flex:1}}/>
                        <Text style={{fontFamily:'Lato-Light', color:'#002A3D',flex:8, width:200}}>{prop.name}</Text>
                        <TouchableOpacity onPress={()=> this.Edit(prop)} >
                          <Icon name='edit' size={25} color='#1590CF'/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> this.setState({id:prop.id})} >
                          {prop.id===this.state.id?<Icon name='arrow-drop-up' size={45} color='#1590CF'/>:<Icon name='arrow-drop-down' size={45} color='#1590CF'/>}
                        </TouchableOpacity>
                      </View>{prop.id===this.state.id ? <View style={{flexDirection:'row', justifyContent:'center'}}>
                        <Text style={{fontFamily:'Lato-Black'}}>Estatus:</Text> 
                        <Text style={{fontFamily:'Lato-Light'}}> {this.showstatus(prop.status)}</Text>
                      </View>:null}</View>);
          
                    }else{
                    return null
                  }})}
      </ScrollView>:<View style={{flex:1,justifyContent:'center',alignItems:'center'}} ><Text style={{fontFamily:'Lato-Black',fontSize:20}}>{I18n.t('CP_dont_have')}</Text></View>}
    </View>
    <View style={styles.footer}>
      <TouchableOpacity style={styles.button} onPress={()=> { navigation.navigate('Add_contact');}} >
        <Text style={styles.text}><Icon name='person-add' size={20} color='#fff'/>  {I18n.t('Add_contact')}</Text>
      </TouchableOpacity>
    </View>
    </MenuDrawer>
  </View>);
  }
}
const styles= StyleSheet.create({
  container:{
    flex:1,
  },
  body:{
    flex:6,
  },
  footer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  button:{
    backgroundColor:'#002A3D',
    alignItems:'center',
    justifyContent:'center',
    height:50,
    width:'95%',
  },
  text:{
    color:'#fff',
    fontFamily:'Lato-Light',
  },
    images:{
      width:'100%',
      height:'100%',
      flexDirection:'row',
    },
    header:{
       flex:2,
     },
  icon:{
    flex:1,
    marginTop:15,
  },
  filter:{
    paddingRight:'2%',
    flex:2,
    justifyContent:'flex-start',
    paddingBottom:'2%'
  },
});
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderColor: 'gray',
    },
    inputAndroid: {
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
    },
});

const mapStateProps = (state) =>{
  return {
    List: state.ReducerList,
    Menu:state.ReducerMenu 
  }
}

const mapDispatchProps = (dispatch) => {
  return {
    Edit_contact: (data) => {
      dispatch(actionEdit_contact(data))
    },
 Show_menu: (show) => {
      dispatch(Show_menu(show))
    }, 
   }}

export default connect(mapStateProps, mapDispatchProps)(List_client);