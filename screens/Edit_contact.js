import React, {Component}from 'react';
import I18n from 'i18n-js';
import {StyleSheet, Text, View,ImageBackground, Alert, TextInput, TouchableOpacity, ScrollView, CheckBox, Image, Picker} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Select from '../components/Select';
import {actionUpdate,actionList_clients,actionAnswer} from '../Config/Dispatch';
import MultiSelect from '../components/MultiSelect';
import * as Progress from 'react-native-progress';

class Add_contact extends React.Component{
  componentDidMount() {
    console.disableYellowBox = true;
  }
  constructor(props) {
    super(props);
  }
  state = {
    address:this.props.Clients.address,
    country:this.props.Clients.country,
    job:this.props.Clients.job,
    marital:this.props.Clients.marital,
    diseases:this.props.Clients.diseases!=null?(this.props.Clients.diseases).split(','):'',
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

          }
          componentWillReceiveProps(nextProps){
 if(nextProps.answer!=this.props.answer){
   switch (nextProps.answer) {
      case "error":
        Alert.alert(I18n.t('Error'),I18n.t('Error_server'),[{text: I18n.t('Retry'), onPress: () => this.onsubmit()},{text: I18n.t('Cancel'), onPress: () => console.log('Cancel Pressed')}])
        break;
      case "success":
       Alert.alert(I18n.t('Updated_client'));
     const client=[this.props.user.access_token, this.props.user.user.id];
        this.props.Client(client);
    const {navigation} = this.props;
         navigation.navigate('List_client');
        break;
    }
  }
}
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
    this.setState({ [name]: value});
  };
      onsubmit=()=>{//send data to edit the user 
        this.props.Update([this.props.Clients.id,{address:this.state.address,diseases:this.state.diseases,job:this.state.job,marital:this.state.marital,_method:'PUT'}])
        this.props.Update_client(0);
       
  }
  render(){
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
      <View style={styles.header}>
          <ImageBackground style={styles.images} source={require('../assets/images/banner-4.jpg')}>
              <TouchableOpacity onPress={() => {navigation.goBack();}} style={{flex:1, height:50}} >
                  <Icon name="arrow-back" size={30} color="#fff" style={[styles.icon,{marginLeft:15}]}/>
              </TouchableOpacity>
          </ImageBackground>
          <Text style={{color:'#fff',fontSize:20,fontFamily:'Lato-Black', width:180, marginLeft:20, marginTop:-70}}>{(I18n.t('Edit')).toUpperCase()}</Text>
        </View> 
          <View style={styles.body}>
          {this.props.answer==0?<View style={{width: '100%', height: '100%',backgroundColor:'rgba(0,0,0,0.50)',zIndex:2, justifyContent:'center',alignItems:'center', position:'absolute'}}><Progress.Circle size={100} indeterminate={true}/></View>:null}
             <ScrollView contentContainerStyle={{alignItems:'center',flexGrow: 1 }}>
             <TextInput style={{borderBottomWidth:2,width:'80%', margin:'4%', borderBottomColor:'#002A3D', color:'grey', marginTop:'10%'}} editable={false} selectTextOnFocus={false} value={this.props.Clients.name}/>
             <TextInput style={{borderBottomWidth:2,width:'80%', margin:'4%', borderBottomColor:'#002A3D', color:'grey'}} editable={false} selectTextOnFocus={false} value={this.props.Clients.cell}/>
             <TextInput style={{borderBottomWidth:2,width:'80%', margin:'4%', borderBottomColor:'#002A3D'}}placeholderColor='#002a3d' placeholder='Dirección'value={this.state.address} onChangeText={(address)=> this.setState({address})}/>
             <Select  onChangeValue={this._onChangeValue} placeholder={{label:I18n.t('Marital'),value: null}} name='marital' items={this.state.items1} height={50}width={'100%'} Show={this.show} value={this.state.marital} />
             <Select  onChangeValue={this._onChangeValue} placeholder={{label:I18n.t('Job'),value: null}} name='job' items={this.state.items2} height={50}width={'100%'} Show={this.show} value={this.state.job}/>
             <MultiSelect selectText={I18n.t('Diseasses')} name='diseases' items={this.state.items3} selectedItems={this.state.diseases} onSelectedItemsChange={(diseases) => {this.setState({ diseases })}}/>
             
          <TouchableOpacity style={styles.button} onPress={() => this.onsubmit()} >
          <Text style={styles.texto}>{I18n.t('Save')}</Text>
        </TouchableOpacity>
             </ScrollView>
          </View>
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
})

const mapStateProps = (state) =>{
  return {
    Clients: state.ReducerEdit_contact,
    answer:state.ReducerAnswer,
    user:state.ReducerLogin
  }
}

const mapDispatchProps = (dispatch) => {
  return {
     Update: (values) => {
      dispatch(actionUpdate(values))
    },
    Client:(data)=>{
      dispatch(actionList_clients(data))
    },
     Update_client:(value)=>{
      dispatch(actionAnswer(value))
    }
  }
}

export default connect(mapStateProps, mapDispatchProps)(Add_contact);