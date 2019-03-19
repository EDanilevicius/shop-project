import shop from "../../../shop";

const logger = ({ getState, dispatch }) => next => action => {
  const prevState = getState();
  const result = next(action);
  const nextState = getState();

  console.log("previous state", prevState);
  console.log(action.type, action.payload);
  console.log("next state", nextState);

  if (action.type === shop.types.TOGGLE_FAVORITE_PRODUCT) {
    dispatch({ type: "RANDOM" });
  }

  return result;
};

export default logger;
