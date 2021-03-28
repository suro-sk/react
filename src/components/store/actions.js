import makeRequest from "../../helpers/makeRequest";
import * as actionTypes from './actionTypes';
import {history} from "../../history";
import {requestNoToken, logOut} from '../../helpers/authToken';

const apiHost = process.env.REACT_APP_API_HOST;

export function getTasks(params = {}) {
    const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    return (dispatch) => {
        dispatch({type: 'PENDING'});
        makeRequest(`${apiHost}/task?${queryString}`)
            .then((tasks) => {
                dispatch({type: actionTypes.FETCH_TASKS, tasks})
            })
            .catch((err) => {
                dispatch({
                    type: actionTypes.ERROR,
                    error: err.message
                });
            });
    }
}

export function getTask(taskId) {
    return (dispatch) => {
        dispatch({type: 'PENDING'});
        makeRequest(`${apiHost}/task/${taskId}`)
            .then((task) => {
                dispatch({type: actionTypes.FETCH_TASK, task})
            })
            .catch((err) => {
                dispatch({
                    type: actionTypes.ERROR,
                    error: err.message
                });
            });
    }
}

export function addTask(newTask) {
    return (dispatch) => {
        dispatch({type: 'PENDING'});
        makeRequest(`${apiHost}/task`, 'POST', newTask)
            .then((task) => {
                dispatch({type: actionTypes.ADD_TASK, task})
            })
            .catch((err) => {
                dispatch({
                    type: actionTypes.ERROR,
                    error: err.message
                });
            });
    }
}

export function editTask(taskData, isSingle = false) {
    return (dispatch) => {
        dispatch({type: 'PENDING'});
        makeRequest(`${apiHost}/task/${taskData._id}`, 'PUT', taskData)
            .then((task) => {
                let dispatchArgs = {
                    type: actionTypes.SAVE_TASK,
                    task,
                    isSingle
                }

                taskData.status && (dispatchArgs.status = taskData.status);

                dispatch(dispatchArgs)
            })
            .catch((err) => {
                dispatch({
                    type: actionTypes.ERROR,
                    error: err.message
                });
            });
    }
}

export function deleteTask(taskId) {
    return (dispatch) => {
        dispatch({type: 'PENDING'});
        makeRequest(`${apiHost}/task/${taskId}`, 'DELETE')
            .then((task) => {
                dispatch({type: actionTypes.DELETE_TASK, taskId})
            })
            .catch((err) => {
                dispatch({
                    type: actionTypes.ERROR,
                    error: err.message
                });
            });
    }
}

export function deleteTasks(tasks) {
    return (dispatch) => {
        dispatch({type: 'PENDING'});
        makeRequest(`${apiHost}/task`, 'PATCH', {tasks: [...tasks]})
            .then(() => {
                dispatch({type: actionTypes.DELETE_TASKS, tasks})
            })
            .catch((err) => {
                dispatch({
                    type: actionTypes.ERROR,
                    error: err.message
                });
            });
    }
}

export function signUp(data) {
    return (dispatch) => {
        dispatch({type: 'PENDING'});
        requestNoToken(`${apiHost}/user`, 'POST', data)
            .then(() => {
                history.push('/sign-in')
                dispatch({type: actionTypes.REGISTER})
            })
            .catch((err) => {
                dispatch({
                    type: actionTypes.ERROR,
                    error: err.message
                });
            });
    }
}

export function signIn(data) {
    return (dispatch) => {
        dispatch({type: 'PENDING'});
        requestNoToken(`${apiHost}/user/sign-in`, 'POST', data)
            .then((data) => {
                localStorage.setItem('tokens', JSON.stringify(data))
                // history.push('/')
                dispatch({type: actionTypes.LOGIN})
            })
            .catch((err) => {
                dispatch({
                    type: actionTypes.ERROR,
                    error: err.message
                });
            });
    }
}

export function signOut(data) {
    return (dispatch) => {
        dispatch({type: 'PENDING'});
        requestNoToken(`${apiHost}/user/sign-out`, 'POST', data)
            .then((data) => {
                logOut();

            })
            .catch((err) => {
                dispatch({
                    type: actionTypes.ERROR,
                    error: err.message
                });
            });
    }
}

export function getUser() {
    return (dispatch) => {
        dispatch({type: 'PENDING'});
        makeRequest(`${apiHost}/user`)
            .then((user) => {
                dispatch({type: actionTypes.GET_USER, user: `${user.name} ${user.surname}`})
            })
            .catch((err) => {
                dispatch({
                    type: actionTypes.ERROR,
                    error: err.message
                });
            });
    }
}

export function sendContactForm(data) {
    return (dispatch) => {
        dispatch({type: 'PENDING'});
        requestNoToken(`${apiHost}/form`, 'POST', data)
            .then(() => {
                dispatch({type: actionTypes.CONTACT_FORM})
            })
            .catch((err) => {
                dispatch({
                    type: actionTypes.ERROR,
                    error: err.message
                });
            });
    }
}