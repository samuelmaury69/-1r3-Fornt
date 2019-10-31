import React from 'react';
import { StyleSheet, Text, View, Image,Animated, Dimensions, Keyboard,TextInput, UIManager,ScrollView,Alert } from 'react-native';
import { FIND_CLIENT_BY_CELL,CLIENTS_URL } from '../../Config/URLs';
import I18n from 'i18n-js';
import Wizard from './Wizard';
import Input from '../../components/Input';
import Select from '../../components/Select';
import MultiSelect from '../../components/MultiSelect';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';
import PhoneInput from 'react-native-phone-input';
import countries from '../../components/Countries.json';
import * as Progress from 'react-native-progress';
import CheckBox from 'react-native-check-box';

const { State: TextInputState } = TextInput;

export default class Form extends React.Component {
    componentDidMount() {
    console.disableYellowBox = true;
  }
  constructor(props) {
    super(props);
        this.state = {
    shift: new Animated.Value(0),
          error:false,
          email:'',
           selectedItems: [],
           selectedItems2: [],
            date:new Date(),
            method:'',
            isChecked:false,
            isChecked1:false,
            isChecked2:false,
            country:'Spain (España)',
            items1: [
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
            ],
              items2: [
                {
                    label: I18n.t('Better'),
                    value: 'better',
                },
                {
                    label: I18n.t('Worst'),
                    value: 'worts',
                },
                {
                    label: I18n.t('Similar'),
                    value: 'similar',
                },
            ],
            items3:[ {  
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
                },],
            items4:[ {  
                    name: I18n.t('Have'),
                    id: 1,
                    children: [{
                        name: I18n.t('Kids'),
                        id: 'kids',
                      },{
                        name: I18n.t('Pets'),
                        id: 'pets',
                      },{
                        name: I18n.t('Problems_P'),
                        id: 'problemsP',
                      },{
                        name: I18n.t('Smells'),
                        id: 'odors',
                      },
                      {
                        name: I18n.t('Others'),
                        id: 'others',
                      }]
                  },],
             items5: [
                {
                    label: I18n.t('Morning'),
                    value: 'morning',
                },
                {
                    label: I18n.t('Noon'),
                    value: 'noon',
                },
                {
                    label: I18n.t('Afternoon'),
                    value: 'Afternoon',
                },
                {
                    label: I18n.t('Indifferent'),
                    value: 'indifferent',
                },
            ],
             items6: [
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
            ],
            
        };
  }
    componentWillMount() {
    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }
   cancel = () =>{
    const {navigation} = this.props;
     navigation.navigate('Start');
  };
  show=(value, type)=>{
  if(type=='social'){
    if( value=='yes')
    {
      this.setState({social: true})
    }
    else
    {
      this.setState({social: false})
    }}
  if(type=='marital'){
    if(value=='married'|| value=='concubinage'){
      this.setState({work_marital:true})
    }else{
      this.setState({work_marital:false})
    }}
};
consult=(value,type)=>{
  if(type=='email'){
    if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)){
              Alert.alert(I18n.t('Invalid_email'))
            }else{
        this.setState({answer:0})
        this.setState({email:value})
          fetch(CLIENTS_URL+'/showByEmail',{
                  method:'POST',
                  headers: {
                      'Content-Type' : 'application/json'
                  },
                  body: JSON.stringify({'email':value,'fetch':'all'})
              })
              .then(response => {return response.json()})
              .then(json => {this.setState({answer:1});
                                this.setState({method:'POST'})
                              if(json!=204){
                               if(json.status!='send'|| json.email!=this.state.email){
                                 Alert.alert(I18n.t('Register_mail'),'',[{text:'OK',onPress:()=>{this.FirstInput.clear();this.setState({email:''});}}])
                                       }else{this.setState({method:'PUT'});}}})
              .catch((error) => {this.setState({answer:1});Alert.alert(I18n.t('Error'),I18n.t('Error_server'),[{text: 'Reintentar', onPress: () => this.consult(value,type)},{text: 'Cancel', onPress: () => console.log('Cancel Pressed')}])})
            }
          }else{
          if(value!=undefined){
          this.setState({answer:0})
                        fetch(FIND_CLIENT_BY_CELL+value.replace('+','%2B'),{
                        method:'POST',
                        headers: {
                            'Content-Type' : 'application/json'
                        },
                    })
                    .then(response => {return response.json()})
                    .then(json => {this.setState({answer:1});
                        this.setState({method:'POST',id:''})
                      if(json!=204){
                      if(json.status!='send'){
                        Alert.alert(I18n.t('Registered_cell'),'',[{text:'ok',onPress:()=>{this.setState({cell:''})}}])}else{this.setState({method:'PUT',id:json.id,email:json.email})}}})
                    .catch((error) => {this.setState({answer:1});Alert.alert(I18n.t('Error'),I18n.t('Error_server'),[{text: 'Reintentar', onPress: () => this.consult(value,type)},{text: 'Cancel', onPress: () => console.log('Cancel Pressed')}])})
                  }}
}
  render() {
    const { shift } = this.state;
    const {navigation} = this.props;
    return (
       <Animated.View style={[styles.root, { transform: [{translateY: shift}] }]}>
        <View style={styles.header}>
          <Image style={{width:'100%',height:'100%'}} source={require('../../assets/images/banner-formulario-movil.jpg')}/>
        </View>
        <View style={styles.container}> 
        {this.state.answer==0?<View style={{width: '100%', height: '100%',backgroundColor:'rgba(0,0,0,0.50)',zIndex:2, justifyContent:'center',alignItems:'center', position:'absolute'}}><Progress.Circle size={100} indeterminate={true}/></View>:null}
          <Wizard initialValues={{id:'',name: '', address: '',email:this.state.email, country: '',province: '',cell: '',phone: '',air: '',birthdate: '',diseases: '', have: '',marital: '',marital_job: '',job: '',availability: '', facebook:'', twitter:'',instagram:'',status:'form',_method:this.state.method,role:'client',role_id:1}} Submit={navigation}>
            <Wizard.Step Cancel={()=>this.cancel()}>
            {({onChangeValue, values}) =>(
            <View style={styles.form}>
            <PhoneInput style={{borderBottomWidth:1,width:'80%', margin:'4%', borderBottomColor:'grey',height:'13%'}} initialCountry='es' textProps={{placeholder: I18n.t('Cell'),keyboardType: 'numeric',onBlur:()=>this.consult(values.cell,'cell')}} value={values.cell=this.state.cell} onChangePhoneNumber={(cell)=>this.setState({cell:cell})} onSelectCountry={(country)=> {const fullname= countries[0][country];this.setState({country:fullname})}} />
            {/*<Input autoCapitalize="none" ref={(ref) => { this.FirstInput = ref; }} value={this.state.email} onChangeValue={(value)=>{console.log(value)}} placeholder={I18n.t('Email')} name='email' height='15%' onBlur={()=>this.consult(this.state.email,'email')}/>*/}
            <TextInput keyboardType='email-address' autoCapitalize="none"ref={(ref) => { this.FirstInput = ref; }} value={values.email=this.state.email} onChangeText={(email)=>{this.setState({email})}} placeholder={I18n.t('Email')} name='email' height='15%' onBlur={()=>this.consult(this.state.email,'email')} style={{borderBottomWidth:1,borderBottomColor: 'grey',width:'80%',fontSize:15,}}placeholderTextColor = "#002A3D"/>
            <TextInput value={values._method=this.state.method} style={{color:'#24292e00', height:1}} />
            <TextInput value={values.id=this.state.id} style={{color:'#24292e00', height:1}} keyboardType={'numeric'}/>
            <Input value={values.name} onChangeValue={onChangeValue} placeholder={I18n.t('Name')} name='name' height='15%'/>
            <PhoneInput ref='phone' style={{borderBottomWidth:1,width:'80%', margin:'4%', borderBottomColor:'grey',height:'13%'}} initialCountry='es' textProps={{placeholder: I18n.t('Phone_house'),keyboardType: 'numeric'}} onChangePhoneNumber={(phone)=> values.phone=phone} value={values.phone}/>
            <Input value={values.country=this.state.country} onChangeValue={onChangeValue} placeholder={I18n.t('Country')} name='country' height='15%' />
            </View>
            )}
          </Wizard.Step>
          <Wizard.Step>
          {({onChangeValue, values}) =>(
          <View style={styles.form}>
            <Input value={values.address} onChangeValue={onChangeValue} placeholder={I18n.t('Full_Address')} name='address' height='15%'/>
            <Input value={values.province} onChangeValue={onChangeValue} placeholder={I18n.t('Province')} name='province' height='15%' />
            <DatePicker style={{width:'80%', paddingTop:10}} date={this.state.date} mode="date" placeholder={I18n.t('Birthday')} format="YYYY-MM-DD" minDate="1920-01-01" 
            maxDate={new Date()}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{dateInput: {borderWidth:0, borderBottomWidth:1,alignItems:'flex-start',borderBottomColor: 'grey',}, placeholderText:{color:"#002A3D", fontSize:15}}}
            onDateChange={(date) => {this.setState({date: date}); values['birthdate']=date}}
            />
            <Select value={values.marital} onChangeValue={onChangeValue} placeholder={{label: I18n.t('Marital'),value: null}} name='marital' items={this.state.items1} height={50}Show={this.show}/>
            <Select value={values.job} onChangeValue={onChangeValue} placeholder={{label: I18n.t('Job'),value: null}} name='job' items={this.state.items6} height={50}Show={this.show}/>
            {this.state.work_marital?<Select value={values.marital_job} onChangeValue={onChangeValue} placeholder={{label: I18n.t('Job_marital'),value: null}} name='marital_job' items={this.state.items6} height={50}Show={this.show}/>:null}
          </View>
          )}
        </Wizard.Step>
        <Wizard.Step>
        {({onChangeValue, values}) =>(
        <View style={styles.form}>
        <Text>{I18n.t('Air')}</Text>
        <Select value={values.air} onChangeValue={onChangeValue} placeholder={{label:I18n.t('Select_item'),value: null}} name='air' items={this.state.items2} height={40}Show={this.show}/>
          <MultiSelect selectText={I18n.t('Diseasses')} name='diseases' items={this.state.items3} selectedItems={this.state.selectedItems} 
          onSelectedItemsChange={(selectedItems) => {
            if(selectedItems.find(function(element){return element == 'nothing'})){
              this.setState({ selectedItems:['nothing'] });values['diseases']=['nothing']
            }else{
              this.setState({ selectedItems });
              values['diseases']=selectedItems
            }
          }}/>
            <MultiSelect  selectText={I18n.t('Have')} name='have' items={this.state.items4} selectedItems={this.state.selectedItems2} onSelectedItemsChange={(selectedItems2) => {this.setState({ selectedItems2 });values['have']=selectedItems2}}/>
            </View>
            )}
          </Wizard.Step>
          <Wizard.Step>
          {({onChangeValue, values}) =>(
          <View style={styles.form}>
            <Select value={values.availability} onChangeValue={onChangeValue} placeholder={{label: I18n.t('Availability'),value: null}} name='availability' items={this.state.items5} height={50}Show={this.show}/>
            <Select value={values.social} onChangeValue={onChangeValue} placeholder={{label: I18n.t('Social'),value: null}} name='social' items={[{ label: I18n.t('Yes'), value: 'yes'},{label: I18n.t('No'),value: 'No',},]} height={50} Show={this.show}/>
            { this.state.social ? <View style={{justifyContent:'center'}}><View style={{flexDirection:'row', height:'20%', width:'80%'}}>
              <Icon name="twitter" size={30} color="#002A3D"style={styles.icon}/><CheckBox style={{flex: 1, padding: 10}} onClick={()=>{this.setState({isChecked:!this.state.isChecked});if(this.state.isChecked==false){values['twitter']='Twitter'}else{values['twitter']=''}}} isChecked={this.state.isChecked} rightText='Twitter' />
            </View>
            <View style={{flexDirection:'row', width:'80%'}}>
              <Icon name="facebook-square" size={30} color="#002A3D" style={styles.icon}/><CheckBox style={{flex: 1, padding: 10}} onClick={()=>{this.setState({isChecked1:!this.state.isChecked1});if(this.state.isChecked1==false){values['facebook']='Facebook'}else{values['facebook']=''}}} isChecked={this.state.isChecked1} rightText='Facebook' />
            </View>
            <View style={{flexDirection:'row', width:'80%'}}>
              <Icon name="instagram" size={30} color="#002A3D" style={styles.icon}/><CheckBox style={{flex: 1, padding: 10}} onClick={()=>{this.setState({isChecked2:!this.state.isChecked2});if(this.state.isChecked2==false){values['instagram']='Instagram'}else{values['instagram']=''}}} isChecked={this.state.isChecked2} rightText='Instagram' />
            </View></View>: null}

          </View>
          )}
        </Wizard.Step>
      </Wizard>
    </View>
   </Animated.View>
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
           const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight+100);
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

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: '100%',
    justifyContent: 'space-around',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%'
  },
  container: {
    flex: 6,
  },
  form:{
    flex:1, 
    alignItems:'center',
  },
  header:{
    flex:2,
  }
});