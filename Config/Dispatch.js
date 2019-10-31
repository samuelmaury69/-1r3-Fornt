export const actionSearch =(user) => ({
        type: 'SEARCH',
        data: user,
});
export const actionforgot =(user) => ({
        type: 'REESTABLISH',
        data: user,
});
export const showSearch =user => ({
        type: 'SHOWSEARCH',
          user,
});
export const actionRegister =(values) => ({
        type: 'REGISTER',
        data: values,
});
export const actionPassword =(password) => ({
        type: 'PASSWORD',
          password
});
export const actionAnswer=(data)=>({
        type: 'ANSWER',
        data
})
export const actionError=(error)=>({
  type:'ERROR',
  error
})
export const actionSessionActive =(user) => ({
        type: 'Active',
          user,
});
export const actionSessionEnable =() => ({
        type: 'ENABLE',
});
export const actionLogin =(data) => ({
        type: 'LOGIN',
        data,
});

export const actionBalance =(data) => ({
        type: 'BALANCE',
          data,
});
export const showBalance =(Balance) => ({
        type: 'SHOWBALANCE',
          Balance,
});
export const actionList_clients =(data) => ({
        type: 'LIST_CLIENTS',
          data,
});
export const showList =(List) => ({
        type: 'SHOWLIST',
          List,
});
export const actionEdit_contact =(Client) => ({
        type: 'Edit_contact',
          Client,
});
export const register_new_user =(Client) => ({
        type: 'REGISTER_NEW',
           Client,
});
export const show_visit =(visits) => ({
        type: 'SHOW_VISIT',
           visits,
});
export const actionSave_Visit =(visit) => ({
        type: 'VISIT',
           visit,
});
export const register_visit =(visit) => ({
        type: 'VISIT_REGISTER',
           visit,
});
export const dispatchError=(error)=>({
    type:'SERVER_ERROR',
    error
})
export const actionUpdate =(Client) => ({
        type: 'UPDATE',
           Client,
});
export const dispatchVisit =(Seller) => ({
        type: 'SHOW_VISIT2',
          Seller,
});
export const saveDeviceToken = (token) => ({
        type: 'SET_DEVICE_TOKEN',
        device_token: token,
});
export const saveContacts = (contacts) => ({
        type: 'SET_CONTACTS',
        contacts
})
export const Show_menu = (show) => ({
        type: 'SHOW_MENU',
        show
})
export const actionchanguelanguage = (language) => ({
        type: 'LANGUAGE',
        language
})
export const actionShowlanguage = () => ({
        type: 'SHOW_LANGUAGE',
})
