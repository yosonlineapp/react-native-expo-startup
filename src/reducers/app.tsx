import { FETCH_ALL_DATA } from '../constants/app';

const initialState = {
  data: []
}

export const app = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_ALL_DATA:
      console.log(action.data);
      return {
        data: action.data
      }
    default:
      return state;
  }
}