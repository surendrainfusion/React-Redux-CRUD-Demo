import authservices from "../services/authservices";
import { SET_LOGIN, SET_POST, SET_REGISTER } from "./type";

export const registartionData = (information) => (dispatch) => {
  return Promise.resolve(authservices.RegisterData(information)).then(
    (response) => {
      dispatch({
        type: SET_REGISTER,
        payload: response,
      });
      return Promise.resolve();
    }
  );
};

export const LoginDatas = (logininformation) => (dispatch) => {
  return Promise.resolve(authservices.LoginData(logininformation)).then(
    (datas) => {
      dispatch({
        type: SET_LOGIN,
        payload: datas,
      });
      return Promise.resolve();
    }
  );
};

export const addPost = (addDetail) => (dispatch) => {
  return Promise.resolve(authservices.AddPost(addDetail)).then((addData) => {
    dispatch({
      type: SET_POST,
      payload: addData,
    });
    return Promise.resolve();
  });
};
