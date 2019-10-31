import React from 'react';
import { Platform, StatusBar, StyleSheet, View,Keyboard, KeyboardAvoidingView, Animated, LayoutAnimation,Alert,AsyncStorage} from 'react-native';
import { AppLoading, Asset, Notifications } from 'expo';
import * as Font from 'expo-font'
import * as Icon from '@expo/vector-icons'
import * as Permissions from 'expo-permissions'
import * as Contacts from 'expo-contacts'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Selection from './navigation/Selection';
import {store, persistor} from './Store/Store';
import {saveContacts} from './Config/Dispatch';

export default class App extends React.Component {
  constructor(props){
    super(props);
  }
  state = {
    anim: new Animated.Value(0),
    isKeyBoardVisible: false,
    isLoadingComplete: false,
  };

  render() {
     const TopComponent = Platform.select({ ios: KeyboardAvoidingView, android: View });
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
        startAsync={this._loadResourcesAsync}
        onError={this._handleLoadingError}
        onFinish={this._handleFinishLoading}
        />
        );
    } else {
      return (
        <View style={styles.container}>
        <Provider store={store}>
        <PersistGate loading={ null} persistor={persistor}>
        {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
        <View hasTabs style={styles.header}/>  
        <Selection/>
        </PersistGate>
        </Provider>
        </View>
        );
      }
    }

  async componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(Platform.select({ android: 'keyboardDidShow', ios: 'keyboardWillShow' }), this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener(Platform.select({ android: 'keyboardDidHide', ios: 'keyboardWillHide' }), this._keyboardDidHide.bind(this));
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.getContactsListAsync();
  }

  componentDidMount() {
    Animated.timing(this.state.anim, { toValue: 3000, duration: 3000 }).start();
    this.notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  
  _handleNotification = async (notification) => {
    console.log(notification)
  }
  /**
   * 
   * This function will request user's contacts and process it 
   * to generate a contact list without duplicated contacts and sorted ascendent by contact's name
   * 
   */
  getContactsListAsync = async () => {
    // Ask for permission to request user phone's contacts
    const permission = await Permissions.askAsync(Permissions.CONTACTS);
  
    if (permission.status !== 'granted') {
      Alert.alert('Mensaje', 'Permisos para acceder a lista de contactos denegado');
      return;
    }

    const result = await Contacts.getContactsAsync();
    // const phoneRegex = /([+][(]?[0-9]{1,3}[)]?[-\s.()\d]{0,14})/g;
    const contacts = [];
    
    // Remove space characters, "-", ".", and parenthesis from contact phone number 
    // and remove duplicated contacts phone numbers
    result.data.map((contact) => {
      if (Array.isArray(contact.phoneNumbers)) {
          // To Do: filter contacts which have been share before
          contact.phoneNumbers.map((phone) => {
              let phoneReplaced = phone.number.replace(/[-\s.()]/g, '');
              let index = contacts.map(contact => contact.cell).indexOf(phoneReplaced);
              if (index == -1) {
                contacts.push({
                  name: contact.name,
                  cell: phoneReplaced
                })
              }
          })
      }
    });

    // Sort phone contacts array by ascendent contact fullname
    contacts.sort((a, b) => {
      if (a.name == b.name) {
        return 0;
      }
      else if (a.name > b.name) {
        return 1;
      }
      else {
        return -1;
      }
    }); 
    
    // Set contacts list in AsyncStorage to get everywhere application need it
    AsyncStorage.setItem('phoneContacts', JSON.stringify(contacts));
    // store.dispatch(saveContacts(contacts))
  }

  _keyboardDidShow() {
    LayoutAnimation.easeInEaseOut();
    this.setState({ isKeyboardVisible: true });
  }

  _keyboardDidHide() {
    LayoutAnimation.easeInEaseOut();
    this.setState({ isKeyboardVisible: false });
  }
    _loadResourcesAsync = async () => {
      return Promise.all([
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        'Lato-Black': require('./assets/fonts/Lato-Black.ttf'),
        'Lato-Light': require('./assets/fonts/Lato-Light.ttf'),
      }),
      ]);
    };

    _handleLoadingError = error => {
      // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
   header: {
        paddingTop: getStatusBarHeight(),
        backgroundColor:'#002A3D'
    },
});