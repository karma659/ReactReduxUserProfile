import axios from "axios";
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE
} from "./userTypes";

const requestOne = axios.get("https://reqres.in/api/users?page=1");
const requestTwo = axios.get("https://reqres.in/api/users?page=2");
export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUsersRequest());
    axios
      .all([requestOne, requestTwo])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];

          const responseTwo = responses[1];
          // console.log(responseOne.data.data);
          // console.log(responseTwo.data.data);
          const obj1 = responseOne.data.data;
          const obj2 = responseTwo.data.data;

          const finalObj = obj1.concat(obj2);

          const users = finalObj;
          dispatch(fetchUsersSuccess(users));
          // use/access the results
        })
      )
      .catch((error) => {
        // error.message is the error message
        dispatch(fetchUsersFailure(error.message));
      });
  };
};

export const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST
  };
};

export const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users
  };
};

export const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error
  };
};
