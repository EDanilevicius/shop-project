import thunk from "redux-thunk";
import logger from "./logger";

const middlewares = [logger, thunk];

export default middlewares;
