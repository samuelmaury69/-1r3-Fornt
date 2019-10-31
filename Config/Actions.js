import { LOGIN_URL, BALANCE_URL,CLIENTS_URL,LIST_CLIENTS_URL,VISITS,UPDATE_VISIT,FORGOT_URL , LANGUAGE} from './URLs';
export const ShowLanguage=()=> {
 return     fetch(LANGUAGE,{
            method:'GET',
            headers: {
                'Content-Type' : 'application/json'
            },
        })
        .then(response => response.json())
        .then(json => {
          var language=new Array();
          for(var i=0;i<json.length;i++ ){
            if(json[i].description==='app'){
              language.push(json[i])
            }
          }
          return language })
        .catch((error) => {return 'error' })
}
export const searchFetch=(values) => {
 return fetch(CLIENTS_URL+'/showByEmail',{
            method:'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(values)
        })
        .then(response => response.json())
        .then(json => { return json})
        .catch((error) => {return 'error'})
}
export const ReestablishFetch=(values) => {
 return fetch(FORGOT_URL,{
                  method: 'POST',
                  headers: {
               'Content-Type' : 'application/json'
                  },
                  body: JSON.stringify(values)
                  })
        .then(response => response.json())
        .then(json => {return json})
        .catch((error) => {return 'error'})
}
export const passwordFetch=(values) => {
 return fetch(CLIENTS_URL+'/'+values[1],{
                  method: 'POST',
                  headers: {
                'Content-Type': 'multipart/form-data',
                  },
                  body: values[0]
                  })
        .then(response => response.json())
        .then(json => {return json})
        .catch((error) => {return 'error'})
}
export const loginFetch=(values) => {
 return fetch(LOGIN_URL,{
            method:'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(values)
        })
        .then(response => { return response.json() })
        .then(json => { return json })
        .catch((error) => { return 'error' })
}
export const balanceFetch=(values) => {
 return fetch(BALANCE_URL+values[1],{
            method:'GET',
            headers: {
                'Authorization':'Bearer '+values[0],
                'Content-Type' : 'application/json'
            },
        })
        .then(response => response.json())
        .then(json => {return json})
        .catch((error) => {return 'error'})
}
export const List_ClientsFetch=(values) => {
 return fetch(LIST_CLIENTS_URL+values[1],{
            method:'GET',
            headers: {
                'Authorization':'Bearer '+values[0],
                'Content-Type' : 'application/json'
            },
        })
        .then(response => response.json())
        .then(json => {return json})
        .catch((error) => {return 'error'})
}

export const New_userFetch=(values)=> {
  return fetch(CLIENTS_URL,{
            method:'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(values)
        })
        .then(response => response.json())
        .then(json => {return json})
        .catch((error) => {return 'error' })
}
export const Show_VisitFetch=(id)=> {
  return fetch(VISITS+id[0],{
            method:'GET',
            headers: {'Authorization':'Bearer '+id[1],
            'Content-Type' : 'application/json'}})
            .then(response => response.json())
            .then(json => {return json})
            .catch((error) => { return ('error')})
}
 
export const VisitFetch=(values)=> {
  return fetch(UPDATE_VISIT,{
                  method: 'POST',
                  headers: {'Authorization':'Bearer '+values[1],
                'Content-Type': 'multipart/form-data',
                  },
                  body: values[0]
                  })
        .then(response => response.json())
        .then(json => {return json})
        .catch((error) => {return 'error'})
}
export const UpdateFetch=(values)=> {
 return fetch(CLIENTS_URL+'/'+values[0],{
                  method: 'PUT',
                  headers: {
                'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(values[1])
                  })
        .then(response => response.json())
        .then(json => {return json})
        .catch((error) => {return 'error'})
}