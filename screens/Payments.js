import React, {Component}from 'react';
import Pie from 'react-native-pie'
import {StyleSheet, Text, View,ImageBackground, TouchableOpacity, ScrollView, AsyncStorage, TextInput, Modal,Alert, Linking} from 'react-native';
import MenuDrawer from 'react-native-side-drawer'
import DrawerContent from './Menu';
import {connect} from 'react-redux';
import {Show_menu} from '../Config/Dispatch'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Status from '../components/Status.json';
import { shareSettings } from '../Config/Share';
import I18n from 'i18n-js';

class Payments extends React.Component{
  componentDidMount() {
    console.disableYellowBox = true;
  }
  state={
    status:false,
    status1:false,
    status2:false,
    modalVisible:false,
    Amount:'',
    color:'#198DBA',
    color2:'#1590cf',
    color1:'#1590cf'
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
  }

  sendPaymentRequest = () => {
     if(this.props.Balance.availableAmount>0){
      const MESSAGE = I18n.t('Inform') +' '+ this.props.user.user.name +' '+ I18n.t('Solicit') +' '+ this.props.Balance.availableAmount+' '+ I18n.t('Available_balance');
      const EMAIL_URL = `mailto:info@sirenalifestyle.com ?subject=SIRENA - ${I18n.t('Payments').toUpperCase()} &body=${MESSAGE}`;
      Linking.openURL(EMAIL_URL)
      .then(() => {
        this.toggleModal(false);
      })
       }else{
      Alert.alert(I18n.t('Dont_have_balance'))
    }

  }
  validAmount = (amount) => {
    if (parseFloat(amount) > parseFloat(this.props.Balance.availableAmount)) {
      Alert.alert(I18n.t('Insufficient'));
    }
    else {
      this.setState({ Amount: amount })
    }
  }
  render(){
    const average= (a,b,c)=>{//method to calculate the average of the balance for the graph receiving as parameters (a = processAmount, b = pendingAmount, c = availableAmount)
      const total=a+b+c;
      const first=a*100/total;
      const second=b*100/total
      const theer=c*100/total;
      if(total>0){
      return [first, second, theer];
      }else{
        return[0,0,0]
      }
    };
    const {navigation} = this.props;
    return (
<View style={styles.container}>
    <MenuDrawer open={this.props.Menu} drawerContent={<DrawerContent close={this.toggleOpen} navigation={navigation}/>}drawerPercentage={100} animationTime={20} >
  <View style={styles.header}>
    <ImageBackground style={styles.images} source={require('../assets/images/banner-5.jpg')}>
      <TouchableOpacity onPress={() => {navigation.goBack();}} style={{flex:1, height:50}} >
        <Icon name="arrow-back" size={30} color="#fff" style={[styles.icon,{marginLeft:15}]}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={this.toggleOpen} style={{flex:1,alignItems:'flex-end'}}>
        <Icon name="menu" size={30} color="#fff" style={[styles.icon,{marginRight:10}]}/>
      </TouchableOpacity>
    </ImageBackground>
    <Text style={{color:'#fff',fontSize:20,fontFamily:'Lato-Black', width:'100%', marginLeft:20, marginTop:-70}}>{I18n.t('Payments').toUpperCase()}</Text>
  </View> 
{/*this.props.user.role_id.length>1? <View style={{flexDirection:'row', width:'100%',height:'8%'}}>
  {this.props.user.role_id.find(function(element){return element ==2})?<TouchableOpacity style={{ width:'33.3%',alignItems:'center',justifyContent:'center', backgroundColor:this.state.color, flex:1}} onPress={()=>{Alert.alert('saldo de Vendedor'),this.setState({color:'#198DBA',color1:'#1590cf',color2:'#1590cf'})}}>
  <Text style={{color:"#fff",fontFamily:'Lato-Light'}}>Vendedor</Text>
  </TouchableOpacity>:null}
  {this.props.user.role_id.find(function(element){return element ==5})?<TouchableOpacity style={{ width:'33.3%',alignItems:'center',justifyContent:'center', backgroundColor:this.state.color1, flex:1}} onPress={()=>{Alert.alert('saldo de Señalador'),this.setState({color:'#1590cf',color1:'#198DBA',color2:'#1590cf'})}}>
    <Text style={{color:"#fff",fontFamily:'Lato-Light'}}>Señalador</Text>
    </TouchableOpacity>:null}
  {this.props.user.role_id.find(function(element){return element ==4})?<TouchableOpacity style={{width:'33.3%',alignItems:'center',justifyContent:'center', backgroundColor:this.state.color2, flex:1}} onPress={()=>{Alert.alert('saldo de CP'),this.setState({color:'#1590cf',color1:'#1590cf',color2:'#198DBA'})}}>
  <Text  style={{color:"#fff",fontFamily:'Lato-Light'}}>CR</Text>
  </TouchableOpacity>:null}
  </View>:null*/}
  <View style={styles.body}>
    <ScrollView style={{flex:1,}}>
      <View >
        <View style={{  justifyContent:'center', alignItems:'center', marginBottom:20}}>
          <ImageBackground source={require('../assets/images/icn-pagos2.png')}  resizeMode='contain' style={{width:100, justifyContent:'center', alignItems:'center'}}>
            <Pie radius={100} innerRadius={90} series={average(parseFloat(this.props.Balance.pendingAmount),parseFloat(this.props.Balance.processAmount),parseFloat(this.props.Balance.availableAmount))} colors={['red','#808080','#1590CF']}/>
          </ImageBackground>
        </View>
        <ScrollView>
          
          <TouchableOpacity onPress={()=>this.setState({status:false,status1:false,status2:true})} style={{flexDirection:'row', justifyContent:'center', alignItems:'center',marginBottom:5, width:'100%'}}>
                      <Text style={{fontFamily:'Lato-Light', fontSize:20, width:'70%'}}> { this.state.status2 ? <Icon name='arrow-drop-down' size={25} color='#1590CF'/>:null} <Icon name='access-time' size={25} color='red'/>     {I18n.t('Pending')}</Text>
                      {this.props.Balance.pendingAmount>0?<Text style={{fontFamily:'Lato-Black', color:'#002A3D', fontSize:25, width:'30%', textAlign:'center'}}>{this.props.Balance.pendingAmount}€</Text>:<Text style={{fontFamily:'Lato-Black', color:'#002A3D', fontSize:25, width:'30%', textAlign:'center'}}>0€</Text>}
                    </TouchableOpacity>
                    { this.state.status2 && this.props.Balance.pendingAmount>0 ?<View style={{borderTopColor:'#1590CF',width:'100%', borderTopWidth:2}}>
                      {this.props.Balance.pendingUsers.map((prop, key) => {
                                               return (<Text style={{fontFamily:'Lato-Light', marginTop:5 }} key={key}>               {prop.name} -  {I18n.t(Status[0][prop.status])}</Text>);
                                            })}</View>: null }
                        <TouchableOpacity onPress={()=>this.setState({status:true,status1:false,status2:false})} style={{flexDirection:'row', justifyContent:'center', alignItems:'center',marginBottom:5, width:'100%'}}>
              <Text style={{fontFamily:'Lato-Light', fontSize:20, width:'70%'}}>{ this.state.status?<Icon name='arrow-drop-down' size={25} color='#1590CF'/>:null}  <Icon name='refresh' size={25} color='#808080'/>     {I18n.t('Process')}</Text>
              {this.props.Balance.processAmount>0?<Text style={{fontFamily:'Lato-Black', color:'#002A3D', fontSize:25, width:'30%', textAlign:'center'}}>{this.props.Balance.processAmount}€</Text>:<Text style={{fontFamily:'Lato-Black', color:'#002A3D', fontSize:25, width:'30%', textAlign:'center'}}>0€</Text>}
              </TouchableOpacity>
            {this.state.status && this.props.Balance.processAmount>0 ?<View style={{borderTopColor:'#1590CF',width:'100%', borderTopWidth:2}}>
            {this.props.Balance.processUsers.map((prop, key) => {
                                     return (<Text style={{fontFamily:'Lato-Light', marginTop:5 }} key={key}>               {prop.name} -  {I18n.t(Status[0][prop.status])}</Text>);
                                  })}</View>: null }
                  <TouchableOpacity onPress={()=>this.setState({status:false,status1:true,status2:false})} style={{flexDirection:'row', justifyContent:'center', alignItems:'center',marginBottom:5, width:'100%'}}>
                    <Text style={{fontFamily:'Lato-Light', fontSize:20, width:'70%'}}>{ this.state.status1 ? <Icon name='arrow-drop-down' size={25} color='#1590CF'/>:null}  <Icon name='check-circle' size={25} color='#1590CF'/>     {I18n.t('Available')}</Text>
                    {this.props.Balance.availableAmount>0?<Text style={{fontFamily:'Lato-Black', color:'#002A3D', fontSize:25, width:'30%', textAlign:'center'}}>{this.props.Balance.availableAmount}€</Text>:<Text style={{fontFamily:'Lato-Black', color:'#002A3D', fontSize:25, width:'30%', textAlign:'center'}}>0€</Text>}
                  </TouchableOpacity>
                  { this.state.status1 && this.props.Balance.availableAmount>0 ? <View style={{borderTopColor:'#1590CF',width:'100%', borderTopWidth:2}}>
                    {this.props.Balance.availableUsers.map((prop, key) => {
                                               return (<Text style={{fontFamily:'Lato-Light', marginTop:5 }} key={key}>               {prop.name} -  {I18n.t(Status[0][prop.status])}</Text>);
                                            })}</View>: null }
    </ScrollView> 
  </View>
</ScrollView>
</View>
<View style={styles.footer}>
  <TouchableOpacity style={styles.button} onPress={() => {this.sendPaymentRequest()}} >
    <Text style={styles.text}>{I18n.t('Retirement')}</Text>
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
    modal:{
    backgroundColor:'#fff',
    padding:20,
    width:300,
    height:200,
  },
  body:{
    flex:6,
    marginTop:15,
    alignItems:'center',
    justifyContent:'center'
  },
  footer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
   button2:{
    backgroundColor:'#002A3D',
    alignItems:'center',
    justifyContent:'center',
    height:50,
    width:200,
    marginLeft:'10%'
  },
  button:{
    backgroundColor:'#002A3D',
    alignItems:'center',
    justifyContent:'center',
    height:50,
    width:290,
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
})

const mapStateProps = (state) =>{
  return {
    user:state.ReducerLogin,
    Balance: state.ReducerBalance,
    Menu:state.ReducerMenu
  }
}

const mapDispatchProps = (dispatch) => {
  return{ 
  Show_menu: (show) => {
      dispatch(Show_menu(show))
    }, 
  }
  }

export default connect(mapStateProps, mapDispatchProps)(Payments);