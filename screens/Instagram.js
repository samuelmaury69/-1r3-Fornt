import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground,TouchableOpacity,Text,Alert,Clipboard} from 'react-native';
import {connect} from 'react-redux';
import I18n from 'i18n-js';
import {BASE_URL} from '../Config/URLs';

class Instagram extends Component {

	writeToClipboardMessage = async () => {
    let text=I18n.t('Copied_link').replace('Link',I18n.t('Message'))
    let othertext=text.replace('Lien',I18n.t('Message'))
  await Clipboard.setString(I18n.t('Instagram'));
  Alert.alert(othertext)
}
	writeToClipboardLink = async () => {
  await Clipboard.setString(BASE_URL+'/users/form/'+this.props.user.user.link+'/'+this.props.user.user.language);
  Alert.alert(I18n.t('Copied_link'))
}
  render() {
    return (
    <View style={{backgroundColor:'#1590cf',flex:1}}>
      <View style={{flexDirection:'row', height:'15%'}}>
      <View style={{width:'20%',alignItems:'center'}}>
          <View  style={styles.line}/>
          <View style={styles.line}/>
          <View style={styles.line}/>
          <View style={styles.line}/>
          <View style={styles.line}/>
        </View>
        <View style={{marginTop:10}}>
          <Text style={{color:"#002A3D", fontSize:30,fontFamily:'Lato-Black'}}>{I18n.t('Share')}</Text>
          <Text style={{color:"#002A3D", fontSize:30,fontFamily:'Lato-Black'}}>Instagram</Text>
        </View>
      </View>
      <View style={{flexDirection:'row',height:'15%'}}>
        <View style={{width:'20%',alignItems:'center'}}>
        <View style={styles.line}/>
          <View style={styles.number}>
            <Text style={{fontSize:20}}>1</Text>
          </View>
          <View style={styles.line}/>
          <View style={styles.line}/>
        </View>
        <View>
          <View style={{marginTop:'3%'}}>
            <Text style={styles.text}>{I18n.t('Step1')}</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.button} onPress={()=>this.writeToClipboardMessage()}>
              <Text style={styles.text}>{I18n.t('Copied_messaje')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{flexDirection:'row',height:'15%'}}>
        <View style={{width:'20%',alignItems:'center'}}>
        <View style={styles.line}/>
          <View style={styles.number}>
            <Text style={{fontSize:20}}>2</Text>
          </View>
          <View style={styles.line}/>
          <View style={styles.line}/>
        </View>
        <View>
          <View style={{marginTop:'4%'}}>
      <Text style={styles.text}>{I18n.t('Step2')}.</Text>
      </View>
        </View>
      </View>
      <View style={{flexDirection:'row',height:'15%'}}>
        <View style={{width:'20%',alignItems:'center'}}>
        <View style={styles.line}/>
          <View style={styles.number}>
            <Text style={{fontSize:20}}>3</Text>
          </View>
          <View style={styles.line}/>
          <View style={styles.line}/>
        </View>
        <View>
          <View style={{marginTop:'4%'}}>
          <Text style={[styles.text,{width:'80%'}]}> {I18n.t('Step3')}</Text>
      </View>
        </View>
      </View>
      <View style={{flexDirection:'row',height:'15%'}}>
        <View style={{width:'20%',alignItems:'center'}}>
        <View style={styles.line}/>
          <View style={styles.number}>
            <Text style={{fontSize:20}}>4</Text>
          </View>
          <View style={styles.line}/>
          <View style={styles.line}/>
        </View>
        <View>
          <View style={{marginTop:'10%'}}>
          <Text style={styles.text}>{I18n.t('Step4')}</Text>
      </View>
          <View>
             <TouchableOpacity style={[styles.button]} onPress={()=>this.writeToClipboardLink()}>
      <Text style={styles.text}>{I18n.t('Copy_link')}</Text>
      </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{flexDirection:'row',height:'15%'}}>
        <View style={{width:'20%',alignItems:'center'}}>
        <View style={styles.line}/>
          <View style={styles.line}/>
          <View style={styles.number}>
            <Text style={{fontSize:20}}>5</Text>
          </View>
          <View style={styles.line}/>
          <View style={styles.line}/>
           <View style={styles.line}/>
           <View style={styles.line}/>
        </View>
        <View>
           <View style={{marginTop:'10%'}}>
      <Text style={[styles.text,{width:'70%'}]}>{I18n.t('Step5')}</Text>
      </View>
        </View>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  line:{
    width:'4%',
    height:'20%',
    backgroundColor:'#002A3D',
    marginTop:'5%'
  },
  number:{
  width:'60%',
  borderRadius:100,
  borderColor:'#002A3D',
  height:'45%',
  justifyContent:'center',
  alignItems:'center',
  borderWidth:3
  },
 images:{
      flex:1,
    },
     button:{
    backgroundColor:'#002A3D',
    width:'55%', 
    height:35,
    marginLeft:'30%',
    justifyContent:'center', 
    alignItems:'center',
    borderRadius:5,
    marginTop:'2%'
    },
    text:{
    color:'#fff',
    fontFamily:'Lato-Light',
    fontSize:15,

    }
});


const mapStateProps = (state) =>({
  user:state.ReducerLogin,
})
const mapDispatchProps = (dispatch) => {
  return { }
}

export default connect(mapStateProps, mapDispatchProps)(Instagram);