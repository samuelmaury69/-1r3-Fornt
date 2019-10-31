import React, {Component}from 'react';
import {StyleSheet, Text, View,ImageBackground, TouchableOpacity, ScrollView,Alert,TextInput} from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import storage from 'redux-persist/lib/storage';
import {connect} from 'react-redux';
import MenuDrawer from 'react-native-side-drawer';
import DrawerContent from './Menu';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {actionSave_Visit,dispatchVisit,actionShow_Visit,register_visit,Show_menu} from '../Config/Dispatch'
import CheckBox from 'react-native-check-box';
import * as Progress from 'react-native-progress';
import I18n from 'i18n-js';

class Visits extends React.Component{
  componentDidMount() {
    console.disableYellowBox = true;
  }
 
componentWillReceiveProps(nextProps){
 if(nextProps.Visit_update!=this.props.Visit_update){
  if(nextProps.Show_Visit=='error'){
    Alert.alert(I18n.t('Error'),I18n.t('Server'),[{text: I18n.t('Retry'), onPress: () => this.reload_view()},{text: I18n.t('Cancel'), onPress: () => {console.log('cancel')}},  ])
  }else if(nextProps.Visit_update=='error'){
        Alert.alert(I18n.t('Error'),I18n.t('Error_load'))
      }else if(nextProps.Visit_update==201){
        Alert.alert(I18n.t('Update_visit'),'',[{text:'OK', onPress:()=>this.reload_view()}])
      }
  }
}
  constructor(props) {
    super(props);
    this.props.Update_Visit(1)
    this.state={
      id:0,
      progress: 0,
      indeterminate: true,
      open:false,
      button1:true,
      button2:true,
      want:0,
      status:'',
    }
   

      }
      reload_view=()=>{
         this.props.reloadv([this.props.user.user.id,this.props.user.access_token])
              if(this.props.Show_Visit=='error'){
    Alert.alert(I18n.t('Error'),I18n.t('Server'),[{text: I18n.t('Retry'), onPress: () => this.reload_view()},{text: I18n.t('Cancel'), onPress: () => {console.log('cancel')}},  ])
  }
      }
       selectPicture = async (id,image) => {//select image of the gallery

    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [3, 4],
      base64: true,
      quality:0.5
    });
      const uriParts = uri.split('.');
      const fileType = uriParts[uriParts.length - 1];
      
    if (!cancelled) {this.setState({ [image+id]: uri, [image+id+'type']:I18n.t('Image_selected')+'.'+fileType });this.props.Show_Visit.visitsforUserSeller[id][image]=uri}
  };
  takePicture = async (id,image) => {//take a photo

    const { cancelled, uri } = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [3, 4],
      base64: true,
      quality:0.5
    });
     const uriParts = uri.split('.');
      const fileType = uriParts[uriParts.length - 1];
    this.setState({ [image+id]: uri ,[image+id+'type']:I18n.t('Image_selected')+'.'+fileType});
    this.props.Show_Visit.visitsforUserSeller[id][image]=uri;
  };
    toggleOpen=()=>{
     if(this.props.Menu==true){
        this.props.Show_menu(false)
      }else{
        this.props.Show_menu(true)
      }
  };
  changeStatus=(id,type)=>{
    switch (type) {
      case 1:
        if(this.state.status=='visit'){
          this.setState({status:'scheduled'});
          this.props.Show_Visit.visitsforUserSeller[id].present=0;
          this.props.Show_Visit.visitsforUserSeller[id].potencialUser[0].want=0;
           this.setState({['visit'+id]:false});
           this.setState({['buy'+id]:false});
           this.setState({['want'+id]:false});
           this.setState({['cr'+id]:false});
        }else{
          this.setState({status:'visit'});
          this.props.Show_Visit.visitsforUserSeller[id].present=0;
          this.props.Show_Visit.visitsforUserSeller[id].potencialUser[0].want=0;
           this.setState({['visit'+id]:true});
        }
        break;
      case 2:
       if(this.props.Show_Visit.visitsforUserSeller[id].present==1){
          this.props.Show_Visit.visitsforUserSeller[id].present=0;
          this.setState({['cr'+id]:false});
        }else{
          this.props.Show_Visit.visitsforUserSeller[id].present=1;
          this.setState({['visit'+id]:true});
          this.setState({['cr'+id]:true});
        }
        break;
      case 3:
       if(this.state.status=='bought'){
          this.setState({status:'visit'});
          this.setState({['buy'+id]:false});
          this.setState({['want'+id]:false});
        }else{
          this.setState({status:'bought'});
           this.setState({['visit'+id]:true});
          this.setState({['buy'+id]:true});
        }
        break;
        case 4:
       if(this.props.Show_Visit.visitsforUserSeller[id].potencialUser[0].want==1){
          this.props.Show_Visit.visitsforUserSeller[id].potencialUser[0].want=0;
          this.setState({['want'+id]:false});
        }else{
         this.props.Show_Visit.visitsforUserSeller[id].potencialUser[0].want=1;
         this.setState({status:'bought'});
           this.setState({['visit'+id]:true});
           this.setState({['buy'+id]:true});
          this.setState({['want'+id]:true});
        }
        break;
    }
  }
    save=(value)=>{
      this.setState({message:false,message2:false,message3:false})
      if(value.photoOne&&value.photoTwo){
          if(this.state.status!=''){
     this.setState({id:value.id})
     const uri = value.photoOne;
      const uriParts = uri.split('.');
      const fileType = uriParts[uriParts.length - 1];
      const uri2 = value.photoTwo;
      const uriParts2 = uri2.split('.');
      const fileType2 = uriParts2[uriParts2.length - 1];
      let formdata = new FormData();
      formdata.append('visit_id',value.id)
      formdata.append('status',this.state.status)
      formdata.append('want',value.potencialUser[0].want)
      formdata.append('user_id',value.potencialUser[0].id)
      formdata.append('present',value.present)
      formdata.append("photoOne", {uri:uri,  name: `photoOne.${fileType}`, type: `image/${fileType}`})
      formdata.append("photoTwo", {uri:uri2,  name: `photoTwo.${fileType2}`, type: `image/${fileType2}`})
      this.props.Update_Visit(0)
      this.props.Save_Visit([formdata,this.props.user.access_token])
      setTimeout(()=>this.setState({message:true}) , 5000);
     setTimeout(()=>this.setState({message2:true,message:false}) , 10000);
      setTimeout(()=>this.setState({message2:false,message:false, message3:true}) , 30000);
   }else{
     Alert.alert(I18n.t('All_fields'))
   }}else{
Alert.alert(I18n.t('All_fields'))
   }
    }
  render(){
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
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
          <Text style={{color:'#fff',fontSize:20,fontFamily:'Lato-Black', marginLeft:20, marginTop:-70}}>{I18n.t('Visits').toUpperCase()}</Text>
        </View> 
          {this.props.Visit_update==0?
            <View style={{width: '100%', height: '100%',backgroundColor:'rgba(0,0,0,0.50)',zIndex:2, justifyContent:'center',alignItems:'center', position:'absolute'}}>
            <Progress.Circle size={100} indeterminate={true}/>
          {this.state.message?<Text style={{color:'#fff'}}>{I18n.t('Wait')}</Text>:null}
            {this.state.message2?<Text style={{color:'#fff'}}>{I18n.t('In_process')}</Text>:null}
            {this.state.message3?<Text style={{color:'#fff'}}>{I18n.t('Yet')}</Text>:null}
            </View>:null}
          <View style={styles.body}>
           {this.props.Show_Visit=="error"?null: this.props.Show_visit==''?null: <ScrollView contentContainerStyle={{marginTop:'7%',flexGrow:1 }} >
          {this.props.Show_Visit.visitsforUserSeller.length>0?this.props.Show_Visit.visitsforUserSeller.map((prop,key) => {
            return (<View style={{justifyContent:'center', alignItems:'center',padding:'5%',paddingBottom:0}} key={key}>
                      <TouchableOpacity onPress={()=> this.setState({[prop.id]:!this.state[prop.id]})} style={{ flexDirection:'row'}}>
                          <Icon name='person' size={30} color='#002A3D' style={{flex:1}}/>
                          <Text style={{fontFamily:'Lato-Light', color:'#002A3D',flex:8}}>{prop.potencialUser[0].name}     {prop.potencialUser[0].cell}</Text>
                          {this.state[prop.id]?<Icon name='arrow-drop-up' size={25} color='#1590CF' style={{flex:1,marginBottom:'3%'}}/>:<Icon name='arrow-drop-down' size={25} color='#1590CF' style={{flex:1,marginBottom:'3%'}}/>}
                      </TouchableOpacity>
                      {this.state[prop.id] ? 
                      <View style={{alignItems:'flex-start',justifyContent:'center', marginLeft:'10%',marginRight:'10%', borderTopWidth:2, borderColor:'#1590cf'}}>
                        <View><Text>{I18n.t('Address')}: {prop.potencialUser[0].address}</Text></View>
                        <View style={{flexDirection:'row', justifyContent:'center'}}>
                          {prop.potencialUser[0].status=='visit'||prop.potencialUser[0].status=='bought'||prop.potencialUser[0].present==1||prop.potencialUser[0].want==1?<CheckBox style={{flex: 1, padding: 10}} onClick={()=>this.changeStatus(key,1)} isChecked={true} rightText={I18n.t('Realized')} />:<CheckBox style={{flex: 1, padding: 10}} onClick={()=>this.changeStatus(key,1)} isChecked={this.state['visit'+key]} rightText={I18n.t('Realized')}/>}
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'center'}}>
                          {prop.present==1?<CheckBox style={{flex: 1, padding: 10}} onClick={()=>this.changeStatus(key,2)} isChecked={true} rightText={I18n.t('Present')} />:<CheckBox style={{flex: 1, padding: 10}} onClick={()=>this.changeStatus(key,2)} isChecked={this.state['cr'+key]} rightText={I18n.t('Present')}/>}
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'center'}}>
                           {prop.potencialUser[0].status=='bought'?<CheckBox style={{flex: 1, padding: 10}} onClick={()=>this.changeStatus(key,3)} isChecked={true} rightText={I18n.t('Buy')} />:<CheckBox style={{flex: 1, padding: 10}} onClick={()=>this.changeStatus(key,3)} isChecked={this.state['buy'+key]} rightText={I18n.t('Buy')}/>}
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'center'}}>
                          {prop.potencialUser[0].want==1?<CheckBox style={{flex: 1, padding: 10}} onClick={()=>this.changeStatus(key,4)} isChecked={true} rightText={I18n.t('Want')} />:<CheckBox style={{flex: 1, padding: 10}} onClick={()=>this.changeStatus(key,4)} isChecked={this.state['want'+key]} rightText={I18n.t('Want')}/>}
                        </View>
                        {this.state.button1?<TouchableOpacity style={{flexDirection:'row'}} onPress={()=>{this.setState({button1:false});Alert.alert(I18n.t('Select_image'),'',[{text: I18n.t('Select_a_image'), onPress: () => {this.selectPicture(key,'photoOne'),this.setState({button1:true})}},
                                                                                                                                                                {text: I18n.t('Photo'), onPress: () => {this.takePicture(key,'photoOne'),this.setState({button1:true})}},   
                                                                                                                                                                {text: I18n.t('Cancel'), onPress: () => this.setState({button1:true})}])}}>
                                                  <TextInput style={{borderWidth:1,alignItems:'center',justifyContent:'center',height:30,width:230, padding:5}} editable={false} value={this.state['photoOne'+key+'type']} placeholder={I18n.t('Select_image')+'1'}></TextInput>
                                                  <View style={{backgroundColor:'#002A3D',alignItems:'center',justifyContent:'center',height:30,width:40}}><Icon name='camera-alt' size={20} color='#fff'/></View>
                                                </TouchableOpacity>:<View style={{flexDirection:'row'}} >
                                                  <TextInput style={{borderWidth:1,alignItems:'center',justifyContent:'center',height:30,width:230, padding:5}} editable={false} value={this.state['photoOne'+key+'type']} placeholder={I18n.t('Select_image')+'1'}></TextInput>
                                                  <View style={{backgroundColor:'#002A3D',alignItems:'center',justifyContent:'center',height:30,width:40}}><Icon name='camera-alt' size={20} color='#fff'/></View>
                                                </View>}
                        {this.state.button2?<TouchableOpacity style={{flexDirection:'row',paddingTop:'3%'}} onPress={()=>{this.setState({button2:false});Alert.alert(I18n.t('Select_image'),'',[{text: I18n.t('Select_a_image'), onPress: () => {this.selectPicture(key,'photoTwo'),this.setState({button2:true})}},
                                                                                                                                                                                        {text: I18n.t('Photo'), onPress: () => {this.takePicture(key,'photoTwo'),this.setState({button2:true})}},   
                                                                                                                                                                                        {text: I18n.t('Cancel'), onPress: () => this.setState({button2:true})}])}}>
                                                  <TextInput style={{borderWidth:1,alignItems:'center',justifyContent:'center',height:30,width:230, padding:5}} editable={false} value={this.state['photoTwo'+key+'type']} placeholder={I18n.t('Select_image')+'2'}></TextInput>
                                                  <View style={{backgroundColor:'#002A3D',alignItems:'center',justifyContent:'center',height:30,width:40}}><Icon name='camera-alt' size={20} color='#fff'/></View>
                                                </TouchableOpacity>:<View style={{flexDirection:'row',paddingTop:'3%'}} >
                                                  <TextInput style={{borderWidth:1,alignItems:'center',justifyContent:'center',height:30,width:230, padding:5}} editable={false} value={this.state['photoTwo'+key+'type']} placeholder={I18n.t('Select_image')+'2'}></TextInput>
                                                  <View style={{backgroundColor:'#002A3D',alignItems:'center',justifyContent:'center',height:30,width:40}}><Icon name='camera-alt' size={20} color='#fff'/></View>
                                                </View>
                                                }
                        <View style={styles.footer}>
                              {prop.potencialUser[0].status=="scheduled"?
                                <TouchableOpacity style={styles.button} onPress={()=>this.save(prop,key)} >
                                     <Text style={styles.text}>{I18n.t('Save')}</Text>
                                </TouchableOpacity>:
                                  <Text>{I18n.t('Client_visit')}</Text>}
                        </View>
                      </View>:null}
                    </View>)}):<View style={{alignItems:'center',justifyContent:'center',flex:1}}>
                                  <Text style={{fontFamily:'Lato-Black',fontSize:20}}>{I18n.t('CP_dont_have')}</Text>
                               </View>}
                               <Text></Text>
                               <Text></Text>
                               <Text></Text>
                               <Text></Text>
            <Text></Text>
        </ScrollView>}
          </View>
          <View style={styles.button2}>
          <View style={{backgroundColor:'#1590CF',height:2, width:'80%'}}></View>
        <TouchableOpacity onPress={this.reload_view} style={[styles.button,{height:50, marginTop:20}]} >
              <Text style={styles.text}>{I18n.t('Update_list')}</Text>
            </TouchableOpacity>
            </View>
          </MenuDrawer>
      </View>
      );
    }
  }

const styles= StyleSheet.create({
  container:{
    flex:1,
  },
  body:{
    flex:7,
  },
  footer:{
    marginBottom:'5%',
    marginTop:'3%',
    alignItems:'center',
    justifyContent:'center'
  },
  button:{
    backgroundColor:'#002A3D',
    alignItems:'center',
    justifyContent:'center',
    height:40,
    width:270,
  },
    button2:{
      flex:2,
       marginBottom:'5%',
    marginTop:'3%',
    alignItems:'center',
    justifyContent:'center',
  },
  text:{
    color:'#fff',
    fontFamily:'Lato-Light',
  },
  header:{
       flex:3,
     },
  icon:{
    flex:1,
    marginTop:15,
  },
  logo:{
   width:320,
   height:107,
  },
   images:{
      width:'100%',
      height:'100%',
      flexDirection:'row',
    },
})

const mapStateProps = (state) =>{
  return {
    Show_Visit: state.ReducerVisit,
    user:state.ReducerLogin,
    Visit_update:state.ReducerUpdate_Visit,
    Menu:state.ReducerMenu
  }
}

const mapDispatchProps = (dispatch) => {
  return {
      Save_Visit:(value)=>{
      dispatch(actionSave_Visit(value))
    },
    Update_Visit:(value)=>{
      dispatch(register_visit(value))
    },
     reloadv:(Seller)=>{
      dispatch(dispatchVisit(Seller))
    },
     Show_menu: (show) => {
      dispatch(Show_menu(show))
    },
  }
}

export default connect(mapStateProps, mapDispatchProps)(Visits);