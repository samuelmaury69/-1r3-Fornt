import { takeEvery, call, put} from 'redux-saga/effects';
import {showBalance,actionAnswer, showSearch,showRegister,showList,actionSessionActive,register_new_user,register_visit,show_visit,dispatchError,actionSessionEnable,actionShowlanguage} from '../Config/Dispatch'
import {searchFetch,loginFetch,balanceFetch,List_ClientsFetch,passwordFetch,New_userFetch,VisitFetch,Show_VisitFetch,UpdateFetch,ReestablishFetch,ShowLanguage} from '../Config/Actions'

function* sagaSearch(values){
    const Search = yield call(searchFetch, values.data);
    switch (Search) {
      case 'error':
        yield put(dispatchError('search'))
        break;
      default:
        yield put(actionAnswer(Search))
        break;
    }
    }
function* sagaReestablish(value){
  const Reestablish = yield call(ReestablishFetch, value.data);
  switch (Reestablish) {
      case 'error':
        yield put(dispatchError('reestablish'))
        break;
      default:
        yield put(actionAnswer(Reestablish))
        break;
    }
}
function* sagaRegister(values){
    const password = yield call(passwordFetch, values.password);
      switch (password) {
      case 'error':
        yield put(dispatchError('register'))
        break;
      default:
        yield put(actionAnswer('success'))
        break;
    }
 
}

function* sagaAccess(values){
 if(Object.is(JSON.stringify(values.data.language), '{}')){
   values.data.language='es'
 }
    const access_token = yield call(loginFetch, values.data);
      if(access_token=='error'){
           yield put(dispatchError('login'))
           yield put(actionSessionEnable())
      }else{
          if(access_token.message==='Unauthorized'){
            yield put(actionAnswer(access_token.message))
          }else if(access_token.role_id.find(function(element){return element==2})){  
           const Visits= yield call(Show_VisitFetch, [access_token.user.id,access_token.access_token])
            if(Visits==204){
              yield put(show_visit(''))
              yield put(actionSessionActive(access_token))
              yield put(actionAnswer('success'))
            }else{
              yield put(show_visit(Visits))
              yield put(actionSessionActive(access_token))
              yield put(actionAnswer('success'))
            }
          }else{
             yield put(actionSessionActive(access_token))
             yield put(actionAnswer('success'))
          }}
}

function* sagaBalance(values){
  const Balance = yield call(balanceFetch, values.data);
    if(Balance=='error'){
       yield put(dispatchError('Balance'))
       yield put(showBalance(Balance))
      }
      else{
      yield put(showBalance(Balance))
      yield put(actionAnswer('success'))
  }
  
}

function* sagaList_Clients(values){
  const List = yield call(List_ClientsFetch, values.data);
  if(List=='error'){
 yield put(dispatchError('List'))
 yield put(showList(List))
  }else{
    yield put(showList(List))
     yield put(actionAnswer('success'))
  }
}

function* sagaAdd_contact(values){
  const new_user = yield call(New_userFetch, values.data);
  if(new_user=='error'){
 yield put(dispatchError('new_user'))
  }else{
    yield put(register_new_user(new_user))
  }
}

function* sagaVisit(values){
  const Visit = yield call(VisitFetch, values.visit);
    yield put(register_visit(Visit))

}
function* sagaShowVisit(values){
   const Visits= yield call(Show_VisitFetch, values.Seller)
   if(Visits=='error'){
     yield put(dispatchError('error'))
      yield put(show_visit(Visits))
   }
   else{
      yield put(show_visit(Visits))
      yield put(actionAnswer(Visits))
    }


}
function* sagaUpdate(values){
 const UpdateClient = yield call(UpdateFetch, values.Client);
    switch (UpdateClient) {
      case 'error':
        yield put(dispatchError('UpdateClient'))
        break;
      default:
        yield put(actionAnswer('success'))
        break;
    }
}
function* sagaShowLanguage(values){
 const ListLanguage = yield call(ShowLanguage);
  switch (ListLanguage) {
      case 'error':
        yield put(dispatchError('ListLanguage'))
        break;
      default:
        yield put(actionAnswer(ListLanguage))
        break;
    }
}

export default function* functionP(){
  yield takeEvery('SEARCH',sagaSearch);
  yield takeEvery('REESTABLISH',sagaReestablish);
  yield takeEvery('PASSWORD',sagaRegister);
  yield takeEvery('LOGIN',sagaAccess);
  yield takeEvery('BALANCE',sagaBalance);
  yield takeEvery('LIST_CLIENTS',sagaList_Clients);
  yield takeEvery('REGISTER',sagaAdd_contact);
  yield takeEvery('VISIT',sagaVisit);
  yield takeEvery('UPDATE',sagaUpdate);
  yield takeEvery('SHOW_VISIT2',sagaShowVisit);
  yield takeEvery('SHOW_LANGUAGE',sagaShowLanguage);
}