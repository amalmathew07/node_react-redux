import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import celebReducer from './celebReducer';
import selectedCelebReducer from './selectedCelebReducer';
import apiReducer from './apiReducer';

export default combineReducers({
    celebReducer,
    selectedCelebReducer,
    apiReducer,
    form: formReducer    
});


