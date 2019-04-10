import * as ActionType from '../action/ActionType';
import initialState from './initialState';
import _ from 'lodash';


const selectedCelebReducer = (state = initialState.selectedCelebReducer, action) => {
    switch(action.type) {

        case ActionType.GET_CELEB_RESPONSE: {
            return {
                ...state,
                celeb: _.assign(action.celeb)
            };
        }


        default: { return state; }
    }
};


export default selectedCelebReducer;