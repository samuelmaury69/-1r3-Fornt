import React from 'react';
import { CLIENTS_URL } from '../Config/URLs';
import {StyleSheet, Text, View,ImageBackground,Image, Animated,Keyboard,UIManager, Dimensions,TextInput, TouchableOpacity, Alert, ScrollView} from 'react-native';
import { ImagePicker } from 'expo';
import RegisterForm from '../components/NotAuthenticated/RegisterForm';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {actionSearch, actionPassword, actionAnswer} from '../Config/Dispatch'
import * as Progress from 'react-native-progress';
import I18n from 'i18n-js';

const { State: TextInputState } = TextInput;

class Register extends React.Component{
    defaultState = { icon: true, shift: new Animated.Value(0), progress: 0, indeterminate: true,image:'',values:''};
  componentDidMount() {
    console.disableYellowBox = true;
  }
  constructor(props) {
    super(props);
      this.props.Update_password(1)
    this.state = this.defaultState;
  }
  componentWillReceiveProps(nextProps){
  if(nextProps.answer!=this.props.answer){
     switch (nextProps.answer) {
      case "search":
        Alert.alert(I18n.t('Error'),I18n.t('Error_server'),[{text: I18n.t('Retry'), onPress: () => this.search(this.state.values)},{text: I18n.t('Cancel'), onPress: () => console.log('Cancel Pressed')}])
        break;
      case "register":
        Alert.alert(I18n.t('Error'),I18n.t('Error_server'),[{text: I18n.t('Retry'), onPress: () => this.onsubmit()},{text: I18n.t('Cancel'), onPress: () => console.log('Cancel Pressed')}])
      break;
      case 'success':
    Alert.alert(I18n.t('Tittle'),I18n.t('Successful_registration'),[{text: I18n.t('To_accept'), onPress: () => {const {navigation} = this.props; navigation.navigate('Login');}}])
        break;
         case 'active':
    Alert.alert(I18n.t('Error'),I18n.t('Register_mail'),[{text: I18n.t('To_accept'), onPress: () => {const {navigation} = this.props; navigation.navigate('Login');}}])
        break;
      case 204:
      this.setState({View:true,status:false})  
        break;
        case 0:
        break;
         default:
         if(nextProps.answer.id){
       this.setState({user:nextProps.answer}) 
       this.setState({View:false,status:true})  
     }
        break;
    }
  }
}
      componentWillMount() {
    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }
  search = (values) =>{//look for the potential client by email to create the key and place an avatar
    this.setState({values:values})
     this.state = this.defaultState;
    this.props.Search(values)
    this.props.Update_password(0)
  
  };
    selectPicture = async () => {//select image of the gallery
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
     allowsEditing: true,
      aspect: [3, 4],
      base64: true,
      quality:0.5
    });
    if (!cancelled) {this.setState({ image: uri }); this.setState({icon: false})}
  };
  takePicture = async () => {//take a photo
    
    const { cancelled, uri } = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      aspect: [3, 4],
      base64: true,
      quality:0.5
    });
    if(!cancelled){
        this.setState({ image: uri });
          this.setState({icon: false})}
  };
  onsubmit=()=>{//send the image data and password to create the user 
   if(this.state.image==''){
      Alert.alert(I18n.t('Select_a_image'))
    }else if(this.state.password!=this.state.passwordr||this.state.password==''){
      this.setState({error: true})
    }else{
      this.setState({error: false})
      const uri = this.state.image;
      const uriParts = uri.split('.');
      const fileType = uriParts[uriParts.length - 1];
      let formdata = new FormData();
      formdata.append("avatar", {uri,  name: `avatar.${fileType}`, type: `image/${fileType}`})
      formdata.append("_method",'PUT')
      formdata.append('password',this.state.password)
      this.props.Update_password(0)
      this.props.submit([formdata,this.state.user.id])
    }
  }
  render(){
    const {navigation} = this.props;
    return (
      <ImageBackground source={require('../assets/images/bg-registrate.jpg')} style={styles.images}>
        <Animated.View style={{ transform: [{translateY: this.state.shift}],flex:1 }}>
        <View style={styles.container} >
        <View style={styles.header}>
          <ImageBackground style={styles.images} source={require('../assets/images/banner-3.jpg')}>
        <TouchableOpacity onPress={() => {navigation.goBack();}} style={{height:50, marginTop:15}} >
          <Icon name="arrow-back" size={30} color="#fff" style={{marginBottom:2}}/>
        </TouchableOpacity>
        <Text style={{color:'#fff',fontSize:20,fontFamily:'Lato-Black', width:'100%', marginLeft:20}}>{I18n.t('Registrate').toUpperCase()}</Text>
        </ImageBackground>
        </View>
        {this.props.answer==0?<View style={{width: '100%', height: '100%',backgroundColor:'rgba(0,0,0,0.50)',zIndex:2, justifyContent:'center',alignItems:'center', position:'absolute'}}><Progress.Circle size={100} indeterminate={true}/></View>:null}
        <View style={[styles.body,{zIndex:0}]}>
          <RegisterForm Search={this.search}/>

         { this.state.status ?<View style={{flex:1}}>
         <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <Text style={{color:"#002A3D", fontFamily:'Lato-Black', fontSize:32, margin:'2%'}} >{this.state.user.name}</Text>
          <Text style={{fontFamily:'Lato-Light'}} >{this.state.user.cell}</Text>
          <Text style={{fontFamily:'Lato-Light'}} >{I18n.t('Address')} {this.state.user.address}</Text>
          </View>
        <View style={{ flex:1, alignItems:'center'}}>
          <Text style={{fontFamily:'Lato-Light', flex:1}} >{I18n.t('Photo')}</Text>
          <TouchableOpacity style={{flex:3, width:'100%',alignItems:'center'}} onPress={()=>{Alert.alert(I18n.t('Select_image'),'',[{text: I18n.t('Select_a_image'), onPress: () => this.selectPicture()},
                                                                                                                                        {text: I18n.t('Photo'), onPress: () => {this.takePicture()}},   
                                                                                                                                        {text: I18n.t('Cancel'), onPress: () => console.log('Cancel Pressed')}])}}>
          <View style={{ borderRadius:50, borderTopLeftRadius:50, borderColor:'#002A3D', borderWidth:6, height:'100%',  width:'30%',justifyContent:'center',alignItems:'center' }}>
          {this.state.icon?<Icon name='camera-alt' size={60} color='#002A3D'/>:<Image style={{ borderRadius:35, borderTopLeftRadius:35, borderColor:'#002A3D',height:'100%',  width:'100%',justifyContent:'center',alignItems:'center' }} source={{ uri: this.state.image }}  />}
          </View>
          </TouchableOpacity>
        </View>
        {this.state.error?<Text style={{textAlign:'center'}}>{I18n.t('Password_invalid')}</Text>:null}<View style={{flex:2, alignItems:'center', marginTop:'2%'}}>
                <View style={{backgroundColor:'#1590CF', width:290, alignItems:'center',justifyContent:'center'}}>
                  <TextInput secureTextEntry placeholder={I18n.t('Password')} placeholderTextColor="#fff" style={{color:'#fff', margin:'6%', width:180, textAlign:'center', borderBottomWidth:1, borderBottomColor:'#fff'}} value={this.state.password} onChangeText={(password)=> this.setState({password})}/>
                  <TextInput secureTextEntry placeholder={I18n.t('Repeat')} placeholderTextColor="#fff" style={{color:'#fff', margin:'6%', width:180, textAlign:'center', borderBottomWidth:1, borderBottomColor:'#fff'}} value={this.state.passwordr} onChangeText={(passwordr)=>this.setState({passwordr})}/>
              </View>
                <TouchableOpacity style={styles.Animated} onPress={()=>{this.onsubmit()}}>
                  <Text style={{color:"#ffffff"}}>{I18n.t('To_accept')}</Text>
              </TouchableOpacity>
              </View>
              </View>: null}{this.state.View ?<View style={{flex:1}}>
                                        <View style={{flex:3,justifyContent:'center', alignItems:'center'}}>
                                        <View style={{flex:6}}></View>
        <View style={{ transform: [{ rotate: '350deg'},{ skewX: '-15deg' }],backgroundColor:"#002A3D",flexDirection:'row',flexWrap: 'wrap',flex: 4}}>
        <Text style={{ color:"#fff",fontFamily:'Lato-Black',fontSize:35,textAlign:'center'}}>{I18n.t('want_team').toUpperCase()} </Text>
        </View>
        <View style={{ transform: [{ rotate: '350deg'},{ skewX: '-15deg' }],color:"#fff",backgroundColor:"#1590CF",zIndex:0,width:"100%",height:"2%",marginLeft:'13%'}}>
           </View>
           <View style={{ transform: [{ rotate: '350deg'},{ skewX: '-15deg' }],color:"#fff",backgroundColor:"#1590CF",zIndex:0,width:"80%",height:"1%", marginLeft:'20%'}}>
           </View>
           <View style={{ transform: [{ rotate: '350deg'},{ skewX: '-15deg' }],backgroundColor:"#fff",zIndex:0,marginTop:"-3%",alignItems:'center',flexDirection:'row',flexWrap: 'wrap',flex: 4}}>
           <Text style={{color:"#002A3D",fontFamily:'Lato-Light',fontSize:35}}>{I18n.t('want_team1').toUpperCase()} </Text>
           </View>
             <View style={{ transform: [{ rotate: '350deg'},{ skewX: '-15deg' }],color:"#fff",backgroundColor:"#1590CF",zIndex:0,width:"100%",height:"2%",marginRight:'40%',marginTop:"10%"}}>
           </View>
           <View style={{ transform: [{ rotate: '350deg'},{ skewX: '-15deg' }],color:"#fff",backgroundColor:"#1590CF",zIndex:0,width:"100%",height:"1%", marginRight:'30%',marginTop:"1%"}}>
           </View>
            <View style={{ transform: [{ rotate: '350deg'},{ skewX: '-15deg' }],backgroundColor:"#002A3D",flexDirection:'row',flexWrap: 'wrap',flex: 4,marginTop:"-14%"}}>
           <Text style={{ color:"#fff",fontFamily:'Lato-Black',fontSize:25,textAlign:'center'}}>{I18n.t('want_team2').toUpperCase()}</Text>
           </View>
           <View style={{flex:6}}></View>
        </View>
                                <View style={{flex:2, alignItems:'center'}}>
                                  <Text style={{width:140, color:'#002A3D',fontFamily:'Lato-Light', textAlign:'center',height:60}}>
                                    {I18n.t('Follow')}
                                  </Text>
                                  <TouchableOpacity style={styles.Animated} onPress={() => {Alert.alert(I18n.t('Information'),I18n.t('Law'),[{text: I18n.t('To_accept'), onPress: () => {navigation.navigate('Form');}},{text:I18n.t('Cancel'),onPress:()=>{navigation.navigate('Start');}}])}} >
                                      <Text style={{color:"#ffffff"}}>{I18n.t('Go_form')}</Text>
                                  </TouchableOpacity>
                                </View>
                              </View>:null}
        </View>
     </View>
          </Animated.View>
      </ImageBackground>
      
      );
    }
    handleKeyboardDidShow = (event) => {
    const { height: windowHeight } = Dimensions.get('window');
    const keyboardHeight = event.endCoordinates.height;
    const currentlyFocusedField = TextInputState.currentlyFocusedField();
    UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
     if(height==undefined){
       this.handleKeyboardDidHide()
       Keyboard.dismiss()
     }else{
           const fieldHeight = height;
           const fieldTop = pageY;
           const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight+140);
           if (gap >= 0) {
             return;
           }
           Animated.timing(
             this.state.shift,
             {
               toValue: gap,
               duration: 200,
               useNativeDriver: true,
             }
           ).start();}
    });
  }

  handleKeyboardDidHide = () => {
    Animated.timing(
      this.state.shift,
      {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }
    ).start();
  }
  }
  const styles= StyleSheet.create({
    container:{
      flex:1,
      justifyContent:'center',
    },
     header:{
       flex:1,
       alignItems:'center',
       justifyContent:'center',
       marginBottom:'4%'
     },
    body:{
      flex:6,
    },
  Animated:{
    backgroundColor:'#002A3D',
    alignItems:'center',
    justifyContent:'center',
    height:50,
    width: 290,
    marginBottom:15,
  },
    images:{
      width:'100%',
      height:'110%',
    },
    text:{
      color:'#fff',
      fontSize:25,
      fontFamily:'Lato-Black',
      padding:20,
    }
  })
const mapStateProps = (state) =>{
  return {
    user: state.ReducerSearch,
    answer:state.ReducerAnswer,
  }
}

const mapDispatchProps = (dispatch) => {
  return {
     Search: (values) => {
      dispatch(actionSearch(values))
    },
    submit:(password) =>{
      dispatch(actionPassword(password))
    },
    Update_password:(value)=>{
      dispatch(actionAnswer(value))
    }
  }
}

export default connect(mapStateProps, mapDispatchProps)(Register);
