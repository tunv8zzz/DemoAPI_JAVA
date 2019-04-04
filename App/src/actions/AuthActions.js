import RNFetchBlob from 'rn-fetch-blob'
import ConfigAPI from '../api/ConfigAPI';

export function isLoading(bool: Boolean) {
  return {
    type: 'LOGIN_ATTEMPT',
    isLoading: bool
  }
}

export function loginSuccess(userData: Object) {
  return {
    type: 'LOGIN_SUCCESS',
    userData
  }
}

export function loginFailed(error: Object) {
  return {
    type: 'LOGIN_FAILED',
    error
  }
}

export function objectToURLParameters(params) {
  if (params == null) {
    return "";
  }
  let array = [];
  let keys = Object.keys(params);
  for (let i = 0; i < keys.length; i++) {
    let name = keys[i];
    let value = params[name];
    let text = name + "=" + value;
    array.push(text);
  }
  let string = array.join("&");
  return string;
}

export function login(methodType, data: Object) {
  return dispatch => {
    dispatch(isLoading(true));
    return RNFetchBlob.config({ trusty: true }).fetch(methodType, ConfigAPI.DOMAIN, {
      "Content-Type": "application/x-www-form-urlencoded"
    }, objectToURLParameters(data))
      .then((res) => {
        let resJSON = res.json();
        // alert(JSON.stringify(resJSON));
        if (resJSON.code === 0) {
          dispatch(isLoading(false))
          dispatch(loginSuccess(resJSON))
        }
        else {
          dispatch(isLoading(false))
          dispatch(loginFailed(resJSON.message))
        }
      }).catch((errorMessage) => {
        // alert(JSON.stringify(errorMessage));
        console.log("error", errorMessage);
        dispatch(isLoading(false))
        dispatch(loginFailed(errorMessage))
      })
  }
}
