import React, {Component}from 'react';
import {StyleSheet, Text, View,ImageBackground, TextInput, TouchableOpacity, Modal, TouchableHighlight, Image, Linking,AsyncStorage,Clipboard, Alert, Share, FlatList } from 'react-native';
import { ImagePicker } from 'expo';
import MenuDrawer from 'react-native-side-drawer'
import DrawerContent from './Menu';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {actionBalance,actionList_clients,actionPassword,actionAnswer,Show_menu,dispatchVisit} from '../Config/Dispatch'
import ContactListItem from '../components/ContactListItem';
import { shareSettings } from '../Config/Share';
import { CLIENTS_URL,BASE_URL, CLIENT_FORM, FIND_CLIENT_BY_CELL } from '../Config/URLs';
import * as Progress from 'react-native-progress';
import I18n from 'i18n-js';


class Profile extends React.Component{
  componentDidMount() {
    console.disableYellowBox = true;
  }
  componentWillReceiveProps(nextProps){
    if(this.state.navegation=='Client'){      
      if(nextProps.list!=this.props.list|| nextProps.list!={}){
        if(nextProps.list=='error'){
          Alert.alert(I18n.t('Error'),I18n.t('Server'),[{text: I18n.t('Retry'), onPress: () => this.Client()},{text: I18n.t('Cancel'), onPress: () => {console.log('cancel')}},  ])
        }else{
          const {navigation} = this.props;
          this.setState({navegation:''})
          navigation.navigate('List_client');
        }
      }}else if(this.state.navegation=='Balance'){
        if(nextProps.Balances!=this.props.Balances|| nextProps.Balance!={} ){
          if(nextProps.Balances=='error'){
            Alert.alert(I18n.t('Error'),I18n.t('Server'),[{text: I18n.t('Retry'), onPress: () => this.Balance()},{text: I18n.t('Cancel'), onPress: () => {console.log('cancel')}},  ])
          }else{
            const {navigation} = this.props;
            this.setState({navegation:''})
            navigation.navigate('Payments');
          }
        }
      }else if(this.state.navegation=='visit'){
        if(nextProps.Show_Visit!=this.props.Show_Visit|| nextProps.Show_Visit!={} ){
            if(nextProps.Show_Visit=='error'){
              Alert.alert(I18n.t('Error'),I18n.t('Server'),[{text: I18n.t('Retry'), onPress: () => this.visits_view()},{text: I18n.t('Cancel'), onPress: () => {console.log('cancel')}},  ])
            }else{
              const {navigation} = this.props;
              this.setState({navegation:''})
               navigation.navigate('Visits');
            }
          }}
        }
        constructor(props) {
          super(props);
          this.props.Update_avatar(1)
          this.props.Show_menu(false)
            this.state = {
            url:`${CLIENT_FORM}${this.props.user.user.link.replace('+', '%2B')}/${this.props.user.user.language}`,
            modalVisible:false,
            modalWhatsappContactsVisible: false,
            selectedContact: { name: null, cell: null },
            sending_whatsapp: false,
            phoneContacts: [],
            contactsDataProvider: [],
            searchText: '',
            token:'',
            image:`${BASE_URL}/${this.props.user.user.avatar}`,
          }

          AsyncStorage.getItem('phoneContacts').then((values) => {
            let contacts = values ? JSON.parse(values) : [];
            this.setState({ phoneContacts: contacts, contactsDataProvider: contacts})
          })

        }
        toggleModal(visible){
          this.setState({modalVisible: visible});
        }
        writeToClipboard = async () => {
          await Clipboard.setString(CLIENT_FORM + this.props.user.user.link.replace('+', '%2B')+'/'+this.props.user.user.language);
          Alert.alert(I18n.t('Copied_link'))
        }
        toggleWhatsappContactsModal(visible) {
          this.setState({ 
            modalVisible: false,
            modalWhatsappContactsVisible: visible
          });
        }
        toggleOpen=()=>{
          if(this.props.Menu==true){
            this.props.Show_menu(false)
          }else{
            this.props.Show_menu(true)
          }
        };

        Balance = () =>{
          this.setState({navegation:'Balance'})
          this.props.Update_avatar(0)
          const Bal=[this.props.user.access_token, this.props.user.user.id]
          this.props.Balance(Bal)
        };
        Client = () =>{
          this.setState({navegation:'Client'})
          this.props.Update_avatar(0)
          const client=[this.props.user.access_token, this.props.user.user.id]
          this.props.Client(client)
        };
        visits_view=()=>{
          this.props.Update_avatar(0)
          this.props.Update([this.props.user.user.id,this.props.user.access_token])
          this.setState({navegation:'visit'})

        }

        onSelectContact = (contact) => {
          this.setState({
            selectedContact: contact
          })
        }
        onSearchContact = (text) => {
          let contactsFiltered = [];
          if (text != '') {
            contactsFiltered = this.state.phoneContacts.filter((contact) => {
              if (contact.name && contact.name.toLowerCase().includes(text.toLowerCase()))
                return true;
              else 
                return false;
            })
          }
          else {
            contactsFiltered = this.state.phoneContacts;
          }
          this.setState({ 
            searchText: text,
            contactsDataProvider: contactsFiltered
          }) 
        }
  /** 
   * 
   * Funtions for render contact single item
   * 
   **/
   renderContactItem = ({ item, index }) => {
       return (
         <ContactListItem  key={item.cell + index}
         styles={styles.modalContactListItem}
         name={item.name} 
         phone={item.cell} 
         checked={item.cell == this.state.selectedContact.cell}
         onToggle={(contact) => this.onSelectContact(contact)}/>
         );
     }

     showAlert=()=>{
       Alert.alert(I18n.t('message_w'),I18n.t('message_w1'),[{text: 'OK', onPress: () => this.shareWhatsappMessage()},{text: I18n.t('Cancel'), onPress: () => {console.log('cancel')}},  ])
     }
  /**
   * 
   * Send a message to potential clients using whatsapp's custom URL scheme
   *  
   */
   shareWhatsappMessage = () => {

     if (this.state.selectedContact.cell) {

       fetch(FIND_CLIENT_BY_CELL + this.state.selectedContact.cell.replace('+', '%2B'), {
         method: 'POST',
         headers: {
           /* 'Authorization': 'Bearer ' + this.props.user.access_token, */
           'Content-Type': 'application/json',
         }
       })
       .then(response => { return response.json() })
       .then(data => {

         if (data == 204) {
           // Generating whatsapp's URL for sharing
           const url =CLIENT_FORM +this.props.user.user.link.replace('+', '%2B')+'/'+this.props.user.user.language;
           const whatsappText = I18n.t('Message_link') + ' ' + url;
           const link = 'whatsapp://send?phone=' + this.state.selectedContact.cell + '&text=' + whatsappText;

           // Verifying that can be open the URL
           Linking.canOpenURL(link)
           .then(supported => {

             if (!supported) {
               Alert.alert(I18n.t('Message'), I18n.t('Install_w'));
             }
             else {      
               this.setState({ sending_whatsapp: true });
               // Register a new user with his phone contact data in Backend
               const payload = {
                 name: this.state.selectedContact.name,
                 cell: this.state.selectedContact.cell,
                 reference: this.props.user.user.link,
                 role:'client',
                 status:'send',
                 role_id:this.props.user.country.id,
               }
               fetch(CLIENTS_URL, {
                 method: 'POST',
                 headers: {
                   'Authorization': 'Bearer ' + this.props.user.access_token,
                   'Content-Type': 'application/json',
                 },
                 body: JSON.stringify(payload)
               })
               .then(response => {})
               .catch(err => {
                 console.log('ERROR: ', err);
               });
               // Redirect to whatsapp for sharing message
               return Linking.openURL(link).then(() => {
                 this.setState({ 
                   sending_whatsapp: false,
                   selectedContact: { name: null, cell: null }
                 });
               });
             }
           })
           .catch(err => {
             Alert.alert(I18n.t('Message'), I18n.t('Ups'));
           });
         }
         else {
           Alert.alert(I18n.t('Message'), I18n.t('Other_number'));
         }
       })
       .catch(err => {
         Alert.alert(I18n.t('Message'), I18n.t('Ups'));
       })

     }
     else {
       Alert.alert(I18n.t('Message'), I18n.t('Select_contact'));
     }
   }

   shareFacebookPost = () => {

     // Generating facebook messenger's URL for sharing
     const url  = CLIENT_FORM + this.props.user.user.link.replace('+', '%2B')+'/'+this.props.user.user.language;
     const link = 'https://facebook.com/dialog/share?app_id=' + shareSettings.FACEBOOK_ID 
     + '&quote=' + I18n.t('Message_link')
     + '&href=' + url
     + '&redirect_uri=https://www.facebook.com/'
     + '&display=page';

     // Verifying that can be open the URL
     Linking.canOpenURL(link)
     .then(supported => {
       if (!supported) {
         Alert.alert(I18n.t('Message'), I18n.t('Install_fb'));
       }
       else { 
         // Redirect to facebook messenger for sharing message
         return Linking.openURL(link);
       }
     })
     .catch(err => console.error(I18n.t('Ups'), err));

   }
   selectPicture = async () => {//select image of the gallery
         const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
           allowsEditing: true,
           aspect: [1, 2],
           base64: true,
           quality:0.5
         });
         if (!cancelled) {
           this.setState({ image: uri });
           const uriParts = uri.split('.');
           const fileType = uriParts[uriParts.length - 1];
           let formdata = new FormData();
           formdata.append("avatar", {uri,  name: `avatar.${fileType}`, type: `image/${fileType}`})
           formdata.append("_method",'PUT')
           this.props.Update_avatar(0)
           this.props.submit([formdata,this.props.user.user.id])
         }
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
             const uriParts = uri.split('.');
             const fileType = uriParts[uriParts.length - 1];
             let formdata = new FormData();
             formdata.append("avatar", {uri,  name: `avatar.${fileType}`, type: `image/${fileType}`})
             formdata.append("_method",'PUT')
             this.props.Update_avatar(0)
             this.props.submit([formdata,this.props.user.user.id])
           };}
           shareFacebookMessenger = () => {

             // Generating facebook messenger's URL for sharing
             const url  =  CLIENT_FORM +this.props.user.user.link.replace('+', '%2B')+'/'+this.props.user.user.language;
             const link =  'fb-messenger://share?app_id=' + shareSettings.FACEBOOK_ID
             + '&link=' + url;

             // Verifying that can be open the URL
             Linking.canOpenURL(link)
             .then(supported => {          
               if (!supported) {
                 Alert.alert(I18n.t('Message'), I18n.t('Install_fm'));
               }
               else {
                 // Redirect to facebook messenger for sharing message
                 return Linking.openURL(link);
               }
             })
             .catch(err => console.error(I18n.t('Ups'), err));
     }

     render() {

       const {navigation} = this.props;
       return (
       <View style={styles.container}>
         {this.props.answer==0?<View style={{width: '100%', height: '100%',backgroundColor:'rgba(0,0,0,0.50)',zIndex:2, justifyContent:'center',alignItems:'center', position:'absolute'}}><Progress.Circle size={100} indeterminate={true}/></View>:null}
         {this.state.sending_whatsapp ? 
           <View style={{justifyContent:'center',alignItems:'center',flex:7}}>
             <Progress.Circle size={100} color='#002A3D' indeterminate={true}/>
           </View>
           :
           <MenuDrawer open={this.props.Menu} drawerContent={<DrawerContent close={this.toggleOpen} visits_list={this.visits_view} navigation={navigation}/>} drawerPercentage={100} animationTime={20} >
           <View style={styles.header}>
             <ImageBackground style={styles.images} source={require('../assets/images/banner-2.jpg')}>
               <View style={{flex:3}}></View>
               <TouchableOpacity onPress={this.toggleOpen} style={{flex:1,alignItems:'flex-end'}}>
                 <Icon name="menu" size={30} color="#fff" style={[styles.icon,{marginRight:10}]}/>
               </TouchableOpacity>
             </ImageBackground>
           </View>
           <Modal animationType ={'slide'} transparent = {true} visible={this.state.modalVisible} 
           onRequestClose={()=>{console.log('close')}}>
           <View style={{flex:1, backgroundColor:'rgba(0,0,0,0.50)', justifyContent:'center',alignItems:'center'}}>
             <View style={styles.modal}>
               <TouchableOpacity onPress={()=>{this.toggleModal(!this.state.modalVisible)}} style={{flex:1, justifyContent:'flex-start',alignItems:'flex-end', marginRight:5}} >
                 <Icon name="close" size={22} color="#002A3D" />
               </TouchableOpacity>
               <Text style={{flex:1, textAlign:'center', marginBottom:15}}>{I18n.t('Share')}:</Text>
               <TouchableOpacity style={{backgroundColor:'#5acf66', width:250, height:40, marginBottom:10,justifyContent:'center', alignItems:'center'}} onPress={() => { this.toggleWhatsappContactsModal(true) }} >
                 <Text style={styles.text}>Whatsapp</Text>
               </TouchableOpacity>
               <TouchableOpacity style={{backgroundColor:'#304c7c', width:250, height:40, marginBottom:10,justifyContent:'center', alignItems:'center'}} onPress={() => { this.shareFacebookPost() }}>
                 <Text style={styles.text}>Facebook</Text>
               </TouchableOpacity>
               <TouchableOpacity style={{backgroundColor:'#0e85fd', width:250, height:40, marginBottom:10,justifyContent:'center', alignItems:'center'}} onPress={() => { this.shareFacebookMessenger() }}>
                 <Text style={styles.text}>Facebook Messenger</Text>
               </TouchableOpacity>
               <TouchableOpacity style={{backgroundColor:'#e8415b', width:250, height:40, marginBottom:10,justifyContent:'center', alignItems:'center'}} onPress={() => {this.toggleModal(!this.state.modalVisible),navigation.navigate('Instagram');}} >
                 <Text style={styles.text}>Instagram</Text>
               </TouchableOpacity>

               <TouchableOpacity style={{backgroundColor:'#00acee', width:250, height:40, marginBottom:10,justifyContent:'center', alignItems:'center'}} onPress={() => Linking.openURL('https://twitter.com/share?text='+I18n.t('Twitter')+'&url='+ this.state.url)} >
                 <Text style={styles.text}>Twitter</Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={()=>this.writeToClipboard()} style={{alignItems:'center'}}>
                 <Text style={{textAlign:'center'}}><Icon name="link" size={20} color="#002A3D" style={{ transform: [{ rotate: '90deg' }] }}/>  {I18n.t('Copy_link')}</Text>
                 <View style={{backgroundColor:'#002A3D', height:2, width:12}}></View>
               </TouchableOpacity>
             </View>
           </View>
         </Modal>
         <Modal  animationType ={'slide'} 
         transparent = {true} 
         visible={this.state.modalWhatsappContactsVisible} 
         onRequestClose={()=>{ this.toggleWhatsappContactsModal(false) }}>
         <View style={{ flex:1, backgroundColor:'rgba(0,0,0,0.5)', justifyContent:'center', alignItems:'center' }}>
           <View style={styles.modalContactView}>
             <TouchableOpacity style={{width: '100%', justifyContent:'flex-start',alignItems:'flex-end'}} onPress={() => { this.toggleWhatsappContactsModal(false) }}>
               <Icon name="close" size={22} color="#002A3D" />
             </TouchableOpacity>
             <Text style={styles.modalTitle}>{I18n.t('Select_contact')}</Text>
             <View style={styles.modalSearch}>
               <Icon style={styles.searchIcon} name="search" size={20} color="#002A3D"/>
               <TextInput  placeholder={I18n.t('Search') }
               placeholderTextColor="#002A3D" 
               style={{margin:'10%', color:'#002A3D', width:200, textAlign:'center', borderBottomWidth:1, borderBottomColor:'#002A3D'}} 
               value={this.state.searchText} 
               onChangeText={(text)=> this.onSearchContact(text)} 
               keyboardeType="default" />
             </View>

             <View style={[styles.modalContactList, styles.modalContactScrollview]}>
               <FlatList
               data={this.state.contactsDataProvider}
               extraData={this.state.selectedContact}
               keyExtractor={(item, index) => item.cell + index}
               renderItem={this.renderContactItem}
               />
             </View>
             <View style={{ alignItems:'center' }}>
               <TouchableOpacity style={styles.modalContactShareButton} 
               onPress={() => { this.showAlert()}} >
               <Text style={styles.text}>{I18n.t('Send')}</Text>
             </TouchableOpacity>
           </View>
         </View>
       </View>
     </Modal>
     <View style={styles.body}>
       <TouchableOpacity onPress={()=>{Alert.alert(I18n.t('Select_image'),'',[{text: I18n.t('Select_a_image'), onPress: () => this.selectPicture()},
         {text: I18n.t('Photo'), onPress: () => {this.takePicture()}},   
         {text: I18n.t('Cancel'), onPress: () => console.log('Cancel Pressed')}])}} style={{flex:1,borderRadius:100, borderTopLeftRadius:100, borderColor:'#002A3D', borderWidth:6, height:'95%',  width:'34%',justifyContent:'center',alignItems:'center',zIndex:0}}>
         <Image style={{width:'100%',height:'100%',borderRadius:50, borderTopLeftRadius:50,zIndex:0}} source={{uri:this.state.image}}/>
         <View style={{marginLeft:'75%',marginTop:-30, zIndex:2, borderRadius:100, borderTopLeftRadius:100, backgroundColor:'#fff'}}>
           <Icon name="control-point" size={20} color="#002A3D" />
         </View>
       </TouchableOpacity>
       <View style={{flex:2, justifyContent:'center', alignItems:'center'}}>
         <Text style={{color:"#002A3D", fontFamily:'Lato-Black', fontSize:32, margin:15}}>{this.props.user.user.name}</Text>
         <Text style={{fontFamily:'Lato-Light', margin:15}}>{this.props.user.user.cell}</Text>
         <Text style={{fontFamily:'Lato-Light', }}>{I18n.t('Address')}: {this.props.user.user.address}</Text>
       </View>
       {this.props.user.role_id.find(function(element){return element.description != 'seller'})?<TouchableOpacity style={styles.button} onPress={() => {this.toggleModal(true)}}>
         <Text style={styles.text}>{I18n.t('Send_link')}</Text>
       </TouchableOpacity>:null}
     </View>
     <View style={styles.footer}>
       <TouchableOpacity onPress={() => {this.Balance()}} style={{backgroundColor:'#1590cf',flex:1, alignItems:'center', justifyContent:'center'}}>
         <Image source={require('../assets/images/icn-pagos.png')} resizeMode='contain' style={{width:'50%',height:'28%', marginBottom:'6%'}}/>
         <Text style={styles.text}>{I18n.t('Payments').toUpperCase()}</Text>
       </TouchableOpacity>
       {this.props.user.role_id.find(function(element){return element.description != 'seller'})?<TouchableOpacity onPress={() => {this.Client()}} style={{backgroundColor:'#198DBA', flex:1,alignItems:'center',justifyContent:'center'}}>
         <Icon name="group" size={70} color='#fff' style={{paddingTop:'15%'}}/>
         <Text style={[styles.text,{paddingBottom:'20%'}]}>{I18n.t('CP').toUpperCase()}</Text>
       </TouchableOpacity>:<TouchableOpacity onPress={() => {this.visits_view()}} style={{backgroundColor:'#198DBA', flex:1,alignItems:'center',justifyContent:'center'}}>
         <Icon name="group" size={70} color='#fff' style={{paddingTop:'15%'}}/>
         <Text style={[styles.text,{paddingBottom:'20%'}]}>{I18n.t('Visits').toUpperCase()}</Text>
       </TouchableOpacity>}
     </View>
   </MenuDrawer>}
 </View>
           );
}
}
const styles= StyleSheet.create({
  container:{
    flex:1,
  },
  images:{
    width:'100%',
    height:'100%',
    flexDirection:'row',
  },
  body:{
    flex:7,
    textAlign:'center',
    alignItems:'center',
    marginTop:-65,
  },
  modal:{
    backgroundColor:'#fff',
    padding:20,
    width:300,
    height:370,
  },
  modalTitle: {
    color: 'gray',
    fontSize: 18,
    marginRight: 20
  },
  modalSearch: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color:"#002A3D",
  },
  searchIcon: {
    position: 'relative',
    right: -45
  },
  modalContactView: {
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor:'#fff',
    padding:20,
    width:300,
    height:500
  },
  modalContactHeader: {
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
    alignItems: 'center' 
  },
  modalContactScrollview: { 
    flex: 4, 
    marginVertical: 10,
    height: 200,
    width: 200
  },
  modalContactlist: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  modalContactListItem: { 
    marginBottom: 10 
  },
  modalContactShareButton: {
    width: 250, 
    height: 40, 
    backgroundColor: '#002A3D',
    color: '#fff',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems:'center'
  },
  button:{
    backgroundColor:'#002A3D',
    alignItems:'center',
    justifyContent:'center',
    height:50,
    width:'80%', 
    marginBottom:20,
  },
  text:{
    color:'#fff',
    fontFamily:'Lato-Light',
  },
  footer:{
    flex:3,
    flexDirection:'row',
  },
  header:{
    flex:2,
  },
  icon:{
    flex:1,
    marginTop:15
  },
  logo:{
    width:320,
    height:107,
  },
})
const mapStateProps = (state) =>({
  Balances: state.ReducerBalance,
  list:state.ReducerList,
  user:state.ReducerLogin,
  contacts: state.ReducerSetContacts,
  answer:state.ReducerAnswer,
  Menu:state.ReducerMenu,
  Show_Visit: state.ReducerVisit,
})
const mapDispatchProps = (dispatch) => {
  return {
    Balance: (data) => {
      dispatch(actionBalance(data))
    },
    Client:(data)=>{
      dispatch(actionList_clients(data))
    },
    Update:(Seller)=>{
      dispatch(dispatchVisit(Seller))
    },
    submit:(password) =>{
      dispatch(actionPassword(password))
    },
    Update_avatar:(value)=>{
      dispatch(actionAnswer(value))
    },
    Show_menu: (show) => {
      dispatch(Show_menu(show))
    },
  }
}

export default connect(mapStateProps, mapDispatchProps)(Profile);