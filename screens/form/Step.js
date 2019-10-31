import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Image,Linking } from 'react-native';
import I18n from 'i18n-js';

class Step extends PureComponent {
  nav=()=>{
    //Linking.openURL('http://sirenalifestyle.com/file/Sirena_privacy_policy.pdf')
    
    console.log('asdasd')
  }
  render(){
    return(
      <View style={{flex:1}}>
       {this.props.children({
        onChangeValue: this.props.onChangeValue,
        values: this.props.values,
      })}
      <View style={styles.footer}>
      {this.props.currentIndex === 0 ? <TouchableOpacity style={styles.button}  onPress={()=>this.props.Cancel}>
        <Text style={styles.text}>{I18n.t('Cancel')}</Text>
      </TouchableOpacity>:<TouchableOpacity style={styles.button}  onPress={this.props.prevStep}>
        <Text style={styles.text}>{I18n.t('Previous')}</Text>
      </TouchableOpacity>}
      
       {this.props.isLast ? (
            <TouchableOpacity style={styles.button} onPress={this.props.onSubmit}>
              <Text style={styles.text}>{I18n.t('Send')}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={this.props.nextStep}>
              <Text style={styles.text}>{I18n.t('Next')}</Text>
            </TouchableOpacity>
          )}
         </View>
         <TouchableOpacity style={{alignItems:'center',justifyContent:'center', marginTop:-5}} onPress={() => Alert.alert(I18n.t('Information'),'Hello! It is important to read this statement until the end so that you are aware of the use of your personal data on our website. From May 25th enter into force the Regulation General Protection of Data (RGPD), approved finally by the European Parliament and the Council. This requires that businesses, Governments and other entities that make life in Europe, as well as all those institutions that handle data of European citizens, must protect their privacy and their personal data, as well as the transactions that take place within the EU Member States. But, what is meant by personal data? The name, email, the username and password, address, phone, age, billing data and all that gives the user a company. At Sirena, it is essential to collect, store and process your personal data to provide a quality service and health to your home. For this reason, we are committed to give you the greatest degree of transparency and reliability in relation to our privacy policy, and meet at the same time, provisions in the RGPD. For this reason, we update our privacy policy and create new mechanisms of control to protect your data and privacy. However, this does not save us any case of inviolability external to which our website may submit, but in that case, we undertake to inform you about what happened within the parameters of honesty and trust that must exist between you and siren. We are confident that this new regulation will make the relationship that we establish moretransparent, honest and reliable. Thank you for trusting in Sirena!',[{text: I18n.t('To_accept'), onPress: () => {console.log('accept')}},{text:I18n.t('Cancel'),onPress:()=>{this.props.Cancel()}}])}>
        <Text>Política de privacidad</Text>
        <View style={{height:2, backgroundColor:'#198DBA',width:150}}></View>
        <Text></Text>
        </TouchableOpacity>
      </View>)
  }
}
const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  button:{
    backgroundColor:'#002A3D',
    alignItems:'center',
    justifyContent:'space-around',
    height:50,
    width:120,
  }, 
  text:{
    fontFamily:'Lato-Light',
    color:"#fff"
  }
});
export default Step;