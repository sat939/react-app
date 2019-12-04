import { GET_EXECUTIVES } from './../actions/getAction';

export const initialState = {
    executives : []
}

export default (state= initialState, action) => {
    switch(action.type) { 
        case GET_EXECUTIVES: 
            return Object.assign({}, state, {
                executives: action.payload
            })
        default:
        return state
    }
    
}