import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import studentReducer from "./studentReducer";
import agenturReducer from "./agenturReducer";

export default combineReducers({
  errors: errorReducer,
  student: studentReducer,
  agentur: agenturReducer,
});
