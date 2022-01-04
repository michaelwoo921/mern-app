import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState: any[] = [];
const alertReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload]; // {id, msg, alertType}
    case REMOVE_ALERT:
      return state.filter((alert: any) => alert.id !== action.payload);
    default:
      return state;
  }
};

export default alertReducer;
