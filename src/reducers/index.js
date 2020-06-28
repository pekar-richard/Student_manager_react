import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import studentReducer from "./studentReducer";
import agenturReducer from "./agenturReducer";
import lektionReducer from "./lektionReducer";
import zahlungReducer from "./zahlungReducer";
import rechnungReducer from "./rechnungReducer";

export default combineReducers({
  errors: errorReducer,
  student: studentReducer,
  agentur: agenturReducer,
  lektion: lektionReducer,
  zahlung: zahlungReducer,
  rechnung: rechnungReducer,
});
