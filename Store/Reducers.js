export const ReducerSearch =(state={}, action) =>{
    switch (action.type) {
        case 'SHOWSEARCH':
           return action.user
           case 'SERVER_ERROR':
           return action.error
           case 'ENABLE':
      return {};
        default:
               return state;            
    }
}
export const ReducerPassword =(state={}, action) =>{
    switch (action.type) {
        case 'SHOWSEARCH':
           return action.user
           case 'SERVER_ERROR':
           return action.error
           case 'ENABLE':
      return {};
        default:
               return state;            
    }
}
export const ReducerAnswer=(state={},action)=>{
    switch (action.type) {
        case 'ANSWER':
           return action.data
           case 'SERVER_ERROR':
           return action.error
           case 'ENABLE':
      return {};
        default:
               return state;            
    }
}
export const ReducerBalance =(state={}, action) =>{
    switch (action.type) {
        case 'SHOWBALANCE':
           return action.Balance;
           case 'ENABLE':
      return {};
        default:
               return state;            
    }
}
export const ReducerList =(state={}, action) =>{
    switch (action.type) {
        case 'SHOWLIST':
           return action.List;
           case 'ENABLE':
      return {};
        default:
               return state;            
    }
}
export const ReducerEdit_contact =(state={}, action) =>{
    switch (action.type) {
        case 'Edit_contact':
           return action.Client;
           case 'ENABLE':
      return {};
        default:
               return state;            
    }
}
export const ReducerLogin=(state={},action)=>{
  switch (action.type){
    case 'Active':
      return action.user;
    case 'ERROR':
      return {error:true};
    case 'ENABLE':
      return {};
    default:
      return state;
  }
}
export const ReducerVisit=(state={},action)=>{
  switch (action.type){
    case 'SHOW_VISIT':
      return action.visits;
      break;
    case 'ERROR':
      return {error:true};
      break;
      case 'ENABLE':
      return {};
    default:
      return state;
  }
}
export const ReducerUpdate_Visit=(state={},action)=>{
  switch (action.type) {
    case 'VISIT_REGISTER':
      return action.visit;
       case 'ENABLE':
      return {};
    default:
      return state;
  }
}
export const ReducerSetDeviceToken = (state = {}, action) => {
  switch (action.type) {
    case 'SET_DEVICE_TOKEN':
      return action.device_token;
    case 'ERROR':
      return {};
    default:
      return state;
  }
}
export const ReducerSetContacts = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CONTACTS':
      return action.contacts;
    case 'ERROR':
      return { error: true };
    default:
      return state;
  }
}
export const ReducerMenu = (state = {}, action) => {
  switch (action.type) {
    case 'SHOW_MENU':
      return action.show;
       case 'ENABLE':
      return {};
    default:
      return state;
  }
}
export const ReducerLanguage = (state = {}, action) => {
  switch (action.type) {
    case 'LANGUAGE':
      return action.language;
      case 'ERROR':
      return {};
    default:
      return state;
  }
}