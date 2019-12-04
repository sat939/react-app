import axios from 'axios';

export const GET_EXECUTIVES= 'GET_EXECUTIVES'

export default function getExecutivesAction() {
   return dispatch => {
       // Fetch the executive info using Axios
     axios.get('http://localhost:3000/executives').then(res => { 
        const executives = res.data;
        dispatch(getExecutives(executives));
    });
    }
}

function getExecutives(people) {
    return {
        type: GET_EXECUTIVES,
        payload: people
    }
}
