import { createStore } from "redux";
import { reducer } from "../../shop";

const store = createStore(reducer);

export default store;
