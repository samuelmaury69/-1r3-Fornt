import React from 'react';
import {createStackNavigator,DrawerNavigator} from 'react-navigation';
import Profile from '../screens/Profile';
import List_client from '../screens/List_client';
import Payments from '../screens/Payments';
import Form from '../screens/form/Form';
import Add_contact from '../screens/Add_contact';
import Edit_contact from '../screens/Edit_contact';
import Instagram from '../screens/Instagram';
import Visits from '../screens/Visits';

const Authenticated = createStackNavigator({

  Profile:{
    screen:Profile,
  },
  Payments:{
    screen:Payments,
  },
   Form:{
    screen:Form,
  },
    List_client:{
    screen:List_client,
  },
   Add_contact:{
    screen:Add_contact,
  },
   Edit_contact:{
    screen:Edit_contact,
  },
   Instagram:{
    screen:Instagram,
  },
  Visits:{
    screen:Visits,
  },
}, {navigationOptions: {
   header:null
    },});
export {Authenticated}