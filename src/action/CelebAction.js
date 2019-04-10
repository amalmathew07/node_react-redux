import * as ActionType from './ActionType';
import CelebApi from '../api/CelebApi';
import { ApiCallBeginAction, ApiCallErrorAction } from './ApiAction';



export const getCelebsResponse = celebs => ({
    type: ActionType.GET_CELEBS_RESPONSE,
    celebs
});



export function getCelebsAction() {
    return (dispatch) => {
        dispatch(ApiCallBeginAction());
        return CelebApi.getAllCelebs()
            .then(celebs => {
                dispatch(getCelebsResponse(celebs));
            }).catch(error => {
                throw error;
            });
    };
}



export const addNewCelebResponse = () => ({
    type: ActionType.ADD_NEW_CELEB_RESPONSE
});

export const loginResponse = () => ({
    type: ActionType.LOGIN_RESPONSE
});

export function saveCelebAction(celebBeingAddedOrEdited) {
    return function (dispatch) {

        dispatch(ApiCallBeginAction());
        return CelebApi.saveCeleb(celebBeingAddedOrEdited)
            .then(() => {
                    dispatch(addNewCelebResponse());

            }).then(() => {
                dispatch(getCelebsAction());
            }).catch(error => {
                dispatch(ApiCallErrorAction());
                throw (error);
            });
    };
}

export function loginUserAction(userData) {
    return function (dispatch) {

        dispatch(ApiCallBeginAction());

        return CelebApi.loginUser(userData)
            .then((data) => {
                    dispatch(loginResponse());
            }).catch(error => {
                dispatch(ApiCallErrorAction());
                throw (error);
            });
    };
}



export const getCelebResponse = celebFound => ({
    type: ActionType.GET_CELEB_RESPONSE,
    celeb: celebFound
});



export function getCelebAction(celebId) {
    return (dispatch) => {

        dispatch(ApiCallBeginAction());

        return CelebApi.getCeleb(celebId)
            .then(celeb => {
                dispatch(getCelebResponse(celeb));
            }).catch(error => {
                throw error;
            });
    };
}



export const deleteCelebResponse = () => ({
    type: ActionType.DELETE_CELEB_RESPONSE
});



export function deleteCelebAction(celebId) {
    return (dispatch) => {

        dispatch(ApiCallBeginAction());

        return CelebApi.deleteCeleb(celebId)
            .then(() => {
                dispatch(deleteCelebResponse());
            }).then(() => {
                dispatch(getCelebsAction());
            }).catch(error => {
                throw error;
            });
    };
}