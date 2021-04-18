import { combineReducers } from "redux";
import courses from './courses'
import auth from './auth';

const rootReducer = combineReducers({
  //Chứa các Reducer con
  courses,
  auth,
});

export default rootReducer;
