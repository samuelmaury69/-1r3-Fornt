import 'react-native';
import React from 'react';
import ConnectedDrawerContent from '../screens/Menu';
import {shallow}  from 'enzyme';
import '../setupTests.js';
import {GlobalWithFetchMock} from "jest-fetch-mock";
import configureMockStore from 'redux-mock-store';
import {ShowLanguage} from '../Config/Actions'
import createSagaMiddleware from 'redux-saga';




describe('DrawerContent Component', () => {
      	let wrapper, store;
        const sagaMiddleware = createSagaMiddleware();
       const mocklanguage = configureMockStore([sagaMiddleware]);
       // make our assertion and what we expect to happen 
       beforeEach(() => {
            store = mocklanguage({user:{user:{'name':'test'}}, answer: [{"name": "Español","code": "es_es","text": "{ \"Enter\":\"Entrar\", \"Check_in\":\"Registrarse\", \"User\":\"Usuario\", \"Password\":\"Contraseña\", \"Dont_have\":\"No tienes una cuenta?\", \"Forgot\":\"He olvidado mi contraseña\", \"Reestablish\":\"Reestablecer contraseña \", \"Reestablish_message\":\"Introduce el email con el que te has registrado. Te enviaremos un correo para que escoger una nueva contraseña\", \"Return\":\"Volver\", \"Sign_up\":\"Registrate\", \"Enter_user\":\"Debe ingresar usuario\", \"Enter_password\":\"Debe ingresar contraseña\", \"Invalid\":\"Contraseña o usuario inválido\", \"Mail\":\"Correo\", \"Address\":\"Dirección\", \"Photo\":\"Tomar foto\"}"},
              {"code": "de","name": "Deutsch","text":"{\"Enter\":\"Eingeben\", \"Check_in\":\"Registrieren\", \"User\":\"Benutzer\", \"Password\":\"Passwort\", \"Dont_have\":\"Hast du keinen Account?\", \"Forgot\":\"Ich habe mein passwort vergessen\", \"Reestablish\":\"Stellen sie das passwort wieder her\", \"Reestablish_message\":\"Geben sie die e-mail-adresse ein, unter der sie sich registriert haben.Wir senden Ihnen eine e-mail, um ein neues passwort zu wählen\", \"Return\":\"Komm zurück\", \"Sign_up\":\"Aufgezeichnet\", \"Enter_user\":\"Sie müssen den benutzer eingeben\", \"Enter_password\":\"Sie müssen das passwort eingeben\", \"Invalid\":\"Ungültiger benutzer oder password\", \"Mail\":\"e-mail\", \"Address\":\"Adresse\", \"Photo\":\"Fotografiere\"}"},
              {"code": "en","name": "English","text":"{\"Enter\":\"Login\", \"Check_in\":\"Sign up\", \"User\":\"User\", \"Password\":\"Password\", \"Dont_have\":\"Dont' have an account?\", \"Forgot\":\"I forgot my password\", \"Reestablish\":\"Reset password\", \"Reestablish_message\":\"Enter your e-mail address and we'll send you an email to choose a new password\", \"Return\":\"Go Back\", \"Sign_up\":\"Sign up\", \"Enter_user\":\"Username required\", \"Enter_password\":\"Password required\", \"Invalid\":\"Username or password incorrect\", \"Mail\":\"e-mail\", \"Address\":\"Address\", \"Photo\":\"Take photo\"}"}]});
            wrapper = shallow(<ConnectedDrawerContent store={store}/>).childAt(0).dive();
       })

       it('should show previously store', () => {
        // test that the state values were correctly passed as props
            console.log('asdasd')
            console.log(shallow(<ConnectedDrawerContent store={store}/>).get())
      expect(store.getState().answer).toBeTruthy();
      });

       it('should roll the dice again when button is press', () => {
         // test that the component events dispatch the expected actions
         wrapper.find('#button-flag1').simulate('press', {preventDefault: () => {} });
         expect(wrapper.find('#modal1').get(0).props.visible).toEqual(true)
         // test dispatch
           const actions = store.getActions();
         expect(actions[1].type).toEqual( 'SHOW_LANGUAGE');
         // test endponit
          return ShowLanguage().catch(()=>{
          expect(wrapper).toMatchSnapshot();
        }).then((value)=>{
          expect(value.length).not.toBe(0)
        })

       })
       it('test reducer and list',()=>{
        const NewState=store.getState()
        wrapper.setProps(store.getState());
        wrapper.update()
          wrapper.find('#es_es').simulate('press', {preventDefault: () => {} });
       expect(wrapper.find('#enter').get(0).props.children.props.children).toEqual('Entrar')
          wrapper.find('#de').simulate('press', {preventDefault: () => {} });
       expect(wrapper.find('#enter').get(0).props.children.props.children).toEqual('Eingeben')
          wrapper.find('#en').simulate('press', {preventDefault: () => {} });
       expect(wrapper.find('#enter').get(0).props.children.props.children).toEqual('Login')
       
       })
})
