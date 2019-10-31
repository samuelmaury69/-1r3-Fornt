import React, { PureComponent } from 'react';
import { CLIENTS_URL } from '../../Config/URLs';
import { View, Text, Button, Alert, Image } from 'react-native';
import Step from './Step';
import I18n from 'i18n-js';

class Wizard extends PureComponent {
  static Step = Step;

  state = {
    index:0,
    values: {
      ...this.props.initialValues,
    },
   };
  _nextStep = () => {
   if(this.state.index===0 &&(this.state.values['name']===''|| this.state.values['country']===''|| this.state.values['email']===''|| this.state.values['cell']===''||this.state.values['cell']===undefined)||!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.values['email'])){
      this.setState({error:true})
    }else if(this.state.index===1 &&(this.state.values['address']===''|| this.state.values['province']==='')){
      this.setState({error:true})
    }else if(this.state.index===2 &&(this.state.values['air']===''||this.state.values['diseases']===''|| this.state.values['have']==='')){
      this.setState({error:true})
    }else {
      this.setState({error:false})
     if(this.state.find!=true)
  {  if (this.state.index !== this.props.children.length - 1) {
        this.setState(prevState => ({
          index: prevState.index + 1,
        }));
      }}
  }
  };
   _prevStep = () => {
    if (this.state.index !== 0) {
      this.setState(prevState => ({
        index: prevState.index - 1,
      }));
    }
  };
    _onChangeValue = (name, value) => {
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [name]: value,
      },
    }));
  };
    _onSubmit=()=>{
      if(this.state.values['availability']==''){
        this.setState({error:true})
      }else{
      fetch(CLIENTS_URL,{
            method:'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(this.state.values)
        })
        .then(response => response.json())
        .then(json => {
           Alert.alert(I18n.t('send_form'));
              this.props.Submit.navigate('Login');
        })
        .catch((error) => {
           Alert.alert(I18n.t('Error_server'))
        })
      }
    }
  render() { 
    const getImage = (sodaId) => {
    switch (this.state.index) {
        case 0:
            return <View style={{ width:'100%',marginBottom:15,height:'5%'}}>
                      <View style={{flexDirection:'row',zIndex:2}}>
                        <Text style={{ width:'50%', textAlign:'center', fontFamily:'Lato-Light'}}>1 {I18n.t('Data_person')}</Text>  
                        <Text style={{color:'#fff',width:'16%', textAlign:'right'}}>2</Text>
                        <Text style={{color:'#fff',width:'16%', textAlign:'right'}}>3</Text>
                        <Text style={{color:'#fff',width:'15%', textAlign:'right'}}>4</Text>
                      </View>
                      <Image style={{width:'100%', height:'100%',zIndex:0,marginTop:-18}} source={require('../../assets/images/formulario-paso-0.jpg')}/>
                    </View>;
        case 1:
            return <View style={{ width:'100%',marginBottom:15,height:'5%'}}>
                      <View style={{flexDirection:'row',zIndex:2}}>
                        <Text style={{color:'#fff',width:'16%', textAlign:'center'}}>1</Text>
                        <Text style={{ width:'50%', textAlign:'center', fontFamily:'Lato-Light'}}>2 {I18n.t('Data_person')}</Text>  
                        <Text style={{color:'#fff',width:'16%', textAlign:'right'}}>3</Text>
                        <Text style={{color:'#fff',width:'15%', textAlign:'right'}}>4</Text>
                      </View>
                      <Image style={{width:'100%', height:'100%',zIndex:0,marginTop:-18}} source={require('../../assets/images/formulario-paso-1.jpg')}/>
                    </View>;;
        case 2:
            return <View style={{ width:'100%',marginBottom:15,height:'5%'}}>
                      <View style={{flexDirection:'row',zIndex:2}}>
                        <Text style={{color:'#fff',width:'15%', textAlign:'center'}}>1</Text>
                        <Text style={{color:'#fff',width:'16%', textAlign:'left'}}>2</Text>
                        <Text style={{ width:'60%', textAlign:'center', fontFamily:'Lato-Light'}}>3 {I18n.t('Dwelling')}</Text>  
                        <Text style={{color:'#fff',width:'15%', textAlign:'center'}}>4</Text>
                      </View>
                      <Image style={{width:'100%', height:'100%',zIndex:0,marginTop:-18}} source={require('../../assets/images/formulario-paso-2.jpg')}/>
                    </View>;
        default:
            return <View style={{ width:'100%',marginBottom:15,height:'5%'}}>
                      <View style={{flexDirection:'row',zIndex:2}}>
                        <Text style={{color:'#fff',width:'15%', textAlign:'center'}}>1</Text>
                        <Text style={{color:'#fff',width:'16%', textAlign:'left'}}>2</Text>
                        <Text style={{color:'#fff',width:'16%', textAlign:'left'}}>3</Text>
                        <Text style={{ width:'54%', textAlign:'left', fontFamily:'Lato-Light'}}>4 {I18n.t('Dwelling')}</Text>  
                      </View>
                      <Image style={{width:'100%', height:'100%',zIndex:0,marginTop:-18}} source={require('../../assets/images/formulario-paso-3.jpg')}/>
                    </View>;
    }
};
    return (
      <View style={{flex:1}}>
      {getImage()}
      {this.state.error?<View style={{backgroundColor:'#d06972', alignItems:'center',justifyContent:'center',height:'10%',width:'80%', borderRadius:8, marginLeft:'8%'}}><Text style={{color:'#580000'}}>{I18n.t('All_fields')}*</Text></View>:null}
      {React.Children.map(this.props.children, (el, index)=>{
        if(index === this.state.index){
          return React.cloneElement(el, {
            currentIndex: this.state.index,
            nextStep:this._nextStep,
            prevStep: this._prevStep,
            isLast: this.state.index === this.props.children.length - 1,
            onChangeValue: this._onChangeValue,
            values: this.state.values,
            onSubmit: this._onSubmit,
          })
        }
        return null;
      })}
      </View>
    );
  }
}

export default Wizard;