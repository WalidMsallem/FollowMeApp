const initialState = "";

function searchReducer(state = initialState, action) {
  if (action.type === "SEARCH") {
    return action.payload;
  }

  return state;
}
export default searchReducer;
