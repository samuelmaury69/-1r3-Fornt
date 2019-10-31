import React from 'react';
import {createStackNavigator} from 'react-navigation';
import Start from '../screens/Start';
import Register from '../screens/Register';
import Forgot from '../screens/Forgot';
import Login from '../screens/Login';
import Form from '../screens/form/Form';

const NotAuthenticated = createStackNavigator({
  Start:{
    screen:Start,
  },
   Register:{
    screen:Register,
  },
  Login: {
    screen: Login,
  },
  Forgot: {
    screen: Forgot,
  },
   Form:{
    screen:Form,
  },
},{navigationOptions: {
   header:null
    }},);
export {NotAuthenticated}
