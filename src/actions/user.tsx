import axios from 'axios';
import { FETCH_ALL_DATA } from '../constants/app';

const dataFetch = (data: any) => ({
  type: FETCH_ALL_DATA,
  data,
});

export const fetchDataAll = (uname: string, upassword: string) => (dispatch: any) => {
  axios.get('https://jsonplaceholder.typicode.com/users')
    .then((response: any) => {
      dispatch(dataFetch(response.data));
    })
}