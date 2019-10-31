import React, {Component}from 'react';
import I18n from 'i18n-js';
import {StyleSheet, Text, View,ImageBackground, TextInput, TouchableOpacity, ScrollView,Alert,Linking} from 'react-native';
import MenuDrawer from '../components/react-native-side-drawer'
import DrawerContent from './Menu';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Select from '../components/Select';
import MultiSelect from '../components/MultiSelect';
import {actionRegister,actionList_clients,Show_menu,actionAnswer} from '../Config/Dispatch';
import DatePicker from 'react-native-datepicker'
import PhoneInput from 'react-native-phone-input'
import countries from '../components/Countries.json'
import {FIND_CLIENT_BY_CELL,FIND_CLIENT_BY_EMAIL, CLIENT_FORM} from '../Config/URLs';
import { shareSettings } from '../Config/Share';

class Add_contact extends React.Component{
  componentDidMount() {
    console.disableYellowBox = true;
  }
  constructor(props) {
    super(props);
  }
  state = { name: '',
            cell: '',
            address: '',
            email: '',
            marital: '',
            job: '',
            birthdate: '',
            diseases: [],
            cellValid: false,
            cellText: '',
            emailValid: false,
            emailText: ''
          }
 

toggleOpen=()=>{
      if(this.props.Menu==true){
        this.props.Show_menu(false)
      }else{
        this.props.Show_menu(true)
      }
  };
show=()=>{
  if(this.state.status == true)
  {
    this.setState({status: false})
  }
  else
  {
    this.setState({status: true})
  }
};
 _onChangeValue = (name, value) => {
   if(name=='job'){
     this.setState({job:value});
   }else{
    this.setState({ marital: value});
   }
  };
    onsubmit=()=>{//send data to create the user 
  if(this.state.name==''||this.state.cell==''||this.state.address==''||this.state.email==''||this.state.country==''||this.state.marital==''||this.state.job==''||this.state.birthdate==''||this.state.diseases==''){
    Alert.alert(I18n.t('All_fields'))
  }
  else if (!this.state.cellValid) {
    Alert.alert(I18n.t('Invalid_cell_or'))
  }
  else if(!this.state.emailValid || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email)){
    Alert.alert(I18n.t('Registered_email'))
  }else {
        this.props.Register({address:this.state.address,birthdate:this.state.birthdate,cell:this.state.cell,country:this.state.country,diseases:this.state.diseases,email:this.state.email,job:this.state.job,marital:this.state.marital,name:this.state.name,reference:this.props.user.user.link,status:'send',role:'client',role_id:this.props.user.country.id})  
        this.success()
    }
  }
  success=()=>{
    const EMAIL_URL = `mailto: ${this.state.email}?subject=Sirena LifeStyle ${I18n.t('Complete_form')}&body=${I18n.t('Message_link')}${CLIENT_FORM}${this.props.user.user.link.replace('+', '%2B')}/${this.props.user.user.language} `;
    Alert.alert(I18n.t('Add_contact'), I18n.t('Registered_susscess'),[{ text: 'OK', onPress: () => Linking.openURL(EMAIL_URL)}])
    const client=[this.props.user.access_token, this.props.user.user.id]
     this.props.Client(client)
    const {navigation} = this.props;
    navigation.navigate('Profile');
  }
  verifyCell = (cell) => {
      if (this.phone.isValidNumber()) {
          fetch(FIND_CLIENT_BY_CELL + cell.replace('+', '%2B'), {
              method: 'POST',
              headers: {
                   'Authorization':'Bearer '+this.props.user.access_token, 
                  'Content-Type': 'application/json',
              }
          })
          .then(response => response.json())
          .then(json => {
              if (json != 204) {
                this.setState({ cell: cell, cellText: I18n.t('Registered_cell'), cellValid: false })
              }
              else {
                this.setState({ cell: cell, cellText: '', cellValid: true })
              }
          })
          .catch((error) => {return 'error'})
      }
      else {
    this.setState({ cell: cell, cellText: I18n.t('Invalid_cell'), cellValid: false })
      }

  }
  verifyEmail = (email) => {
      if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
          fetch(FIND_CLIENT_BY_EMAIL + email, {
              method: 'POST',
              headers: {
                  /* 'Authorization':'Bearer '+values[1], */
                  'Content-Type': 'application/json',
              }
          })
          .then(response => response.json())
          .then(json => {
              if (json != 204) {
                this.setState({ emailText: I18n.t('Register_mail'), emailValid: false })
              }
              else {
                this.setState({ emailText: '', emailValid: true })
              }
          })
          .catch((error) => {return 'error'})
      }
      else {
          this.setState({ emailText: I18n.t('Invalid_mail'), emailValid: false })
      }
  }

  render(){

    /*const {t, i18n, navigation} = this.props;*/
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
      {this.props.answer==0?<View style={{width: '100%', height: '100%',backgroundColor:'rgba(0,0,0,0.50)',zIndex:2, justifyContent:'center',alignItems:'center', position:'absolute'}}><Progress.Circle size={100} indeterminate={true}/></View>:null}
       <MenuDrawer open={this.props.Menu} drawerContent={<DrawerContent close={this.toggleOpen} navigation={navigation}/>}drawerPercentage={100} animationTime={20} show={this.state.open}>
      <View style={styles.header}>
          <ImageBackground style={styles.images} source={require('../assets/images/banner-4.jpg')}>
              <TouchableOpacity onPress={() => {navigation.goBack();}} style={{flex:1, height:50}} >
                  <Icon name="arrow-back" size={30} color="#fff" style={[styles.icon,{marginLeft:15}]}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.toggleOpen} style={{flex:1,alignItems:'flex-end'}}>
                  <Icon name="menu" size={30} color="#fff" style={[styles.icon,{marginRight:10}]}/>
              </TouchableOpacity>
          </ImageBackground>
          <Text style={{color:'#fff',fontSize:20,fontFamily:'Lato-Black', width:180, marginLeft:20, marginTop:-70}}>{I18n.t('Add_contact').toUpperCase()}</Text>
        </View> 
          <View style={styles.body}>
              <ScrollView contentContainerStyle={{alignItems:'center', justifyContent:'center'}}>
                      <PhoneInput ref={ref => { this.phone = ref }} style={{borderBottomWidth:2,width:'80%', margin:'4%', borderBottomColor:'#002A3D', marginTop:'10%'}} initialCountry='es' textProps={{placeholder: I18n.t('Cell')}} value={this.state.cell} /*onSelectCountry={(country)=> {const fullname= countries[0][country];this.setState({country:fullname})}} */onChangePhoneNumber={(cell)=> { this.verifyCell(cell);}}/>
                      { this.state.cellText != '' ? <Text style={styles.errorText}>{this.state.cellText}</Text>:null }
                     
                      <TextInput style={{borderBottomWidth:2,width:'80%', margin:'4%', borderBottomColor:'#002A3D'}}placeholderColor='#002a3d' placeholder={I18n.t('Name')} value={this.state.name} onChangeText={(name)=> this.setState({name})}/>
                      <TextInput style={{borderBottomWidth:2,width:'80%', margin:'4%', borderBottomColor:'#002A3D'}}placeholderColor='#002a3d' placeholder={I18n.t('Address')} value={this.state.address} onChangeText={(address)=> this.setState({address})}/>
                      <TextInput style={{borderBottomWidth:2,width:'80%', margin:'4%', borderBottomColor:'#002A3D'}}placeholderColor='#002a3d' placeholder={I18n.t('Email')} autoCapitalize="none" keyboardType='email-address' value={this.state.email} onChangeText={(email)=> this.setState({email})} onBlur={() => this.verifyEmail(this.state.email)}/>
                      { this.state.emailText != '' && <Text style={styles.errorText}>{this.state.emailText}</Text> }
                     
                      <TextInput style={{borderBottomWidth:2,width:'80%', margin:'4%', borderBottomColor:'#002A3D'}}placeholderColor='#002a3d' placeholder={I18n.t('Country')} value={this.props.user.country.name} />
                      <DatePicker style={{width:'80%', paddingTop:10}} date={this.state.birthdate} mode="date" placeholder={I18n.t('Birthday')} format="YYYY-MM-DD" minDate="1920-01-01" 
                    maxDate={new Date()}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{dateInput: {borderWidth:0, borderBottomWidth:2,alignItems:'flex-start',borderBottomColor: 'grey',}, placeholderText:{color:"#002A3D", fontSize:15}}}
                    onDateChange={(date) => {this.setState({birthdate: date});}}
                    />
                     <Select  onChangeValue={this._onChangeValue} placeholder={{label:I18n.t('Marital'),value: null}} name='marital' items={[
                 {
                    label: I18n.t('Married'),
                    value: 'married',
                },
                {
                    label: I18n.t('Single'),
                    value: 'single',
                },
                {
                    label: I18n.t('Widower'),
                    value: 'widower',
                },
                {
                    label: I18n.t('Divorced'),
                    value: 'divorced',
                },
                {
                    label: I18n.t('Couple'),
                    value: 'concubinage',
                },
            ]} height={50} Show={this.show}/>
                     <Select  onChangeValue={this._onChangeValue} placeholder={{label:I18n.t('Job'),value: null}} name='job' items={[
                {
                    label: I18n.t('Work'),
                    value: 'work',
                },
                {
                    label: I18n.t('Not_work'),
                    value: 'no_work',
                },
                {
                    label: I18n.t('Retired'),
                    value: 'retired',
                },
            ]} height={50} Show={this.show}/>
                     <MultiSelect selectText={I18n.t('Diseasses')} name='diseases' items={[ {  
                 name: I18n.t('Diseasses'),
                  id: 0, 
                  children: [{
                      name: I18n.t('Allergies'),
                      id: 'allergy',
                    },{
                      name: I18n.t('Asthma'),
                      id: 'asthma',
                    },{
                      name: I18n.t('Problems_R'),
                      id: 'problemsR',
                    },{
                      name: I18n.t('Nothing'),
                      id: 'nothing',
                    }]
                },]} selectedItems={this.state.diseases} onSelectedItemsChange={(diseases) => {if(diseases.find(function(element){return element == 'nothing'})){
              this.setState({ diseases:['nothing'] });
            }else{
              this.setState({ diseases });
            }}}/>
                  <TouchableOpacity style={styles.button} onPress={()=>{this.onsubmit()}} >
                  <Text style={styles.texto}>{I18n.t('Save')}</Text>
                </TouchableOpacity>
             </ScrollView>
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
    flex:8,
  },
  button:{
    backgroundColor:'#002A3D',
    alignItems:'center',
    justifyContent:'center',
    height:50,
    width:'85%',
    marginTop:'2%'
  },
  texto:{
    color:'#fff',
    fontFamily:'Lato-Light',
  },
   header:{
   flex:2
  },
  icon:{
    flex:1,
    marginTop:15,
  },
    images:{
      width:'100%',
      height:'100%',
      flexDirection:'row',
    },
    errorContainer: {
      justifyContent: 'flex-start',
      alignItems: 'flex-start'
    },
    errorText:{
      fontSize:10,
      color:'#590007',
      width: '80%',
    }
})

const mapStateProps = (state) =>{
  return {
    user:state.ReducerLogin,
    new_user:state.ReducerRegister,
    Menu:state.ReducerMenu 
  }
}

const mapDispatchProps = (dispatch) => {
  return {
     Register: (values) => {
      dispatch(actionRegister(values))
    },
     Client:(data)=>{
      dispatch(actionList_clients(data))
    },
    Update_avatar:(value)=>{
      dispatch(actionAnswer(value))
    },
     Show_menu: (show) => {
      dispatch(Show_menu(show))
    },
  }
}

export default connect(mapStateProps, mapDispatchProps)(Add_contact);