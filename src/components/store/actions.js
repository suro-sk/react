import makeRequest from "../../helpers/makeRequest";
import * as actionTypes from './actionTypes';

export function getTasks() {
    return (dispatch) => {
        dispatch({type: 'PENDING'});
        makeRequest('http://localhost:3001/task')
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
        makeRequest(`http://localhost:3001/task/${taskId}`)
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
        makeRequest('http://localhost:3001/task', 'POST', newTask)
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
        makeRequest(`http://localhost:3001/task/${taskData._id}`, 'PUT', taskData)
            .then((task) => {
                dispatch({type: actionTypes.SAVE_TASK, task, isSingle})
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
        makeRequest(`http://localhost:3001/task/${taskId}`, 'DELETE')
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
        makeRequest(`http://localhost:3001/task`, 'PATCH', {tasks: [...tasks]})
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