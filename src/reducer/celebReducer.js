import * as ActionType from '../action/ActionType';
import initialState from './initialState';
import _ from 'lodash';



const celebReducer = (state = initialState.celebReducer, action) => {
    switch(action.type) {
        case ActionType.GET_CELEBS_RESPONSE: {
            return {
                ...state, 
                celebs: _.assign(action.celebs)
            };
        }


        default: { return state; }
    }
};



export default celebReducer;