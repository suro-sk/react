import makeRequest from "../../helpers/makeRequest";
import {formatDate} from "../../helpers/functions";

export function getTasks() {
    return (dispatch) => {
        makeRequest('http://localhost:3001/task')
            .then((tasks) => {
                dispatch({type: 'FETCH_TASKS', tasks})
            })
    }
}

export function addTask(newTask) {
    return (dispatch) => {
        dispatch({type: 'ADDING_TASK'});
        makeRequest('http://localhost:3001/task', 'POST', newTask)
            .then((task) => {
                dispatch({type: 'ADD_TASK', task})
            })
    }
}

export function editTask(taskData) {
    return (dispatch) => {
        dispatch({type: 'SAVING_TASK'});
        makeRequest(`http://localhost:3001/task/${taskData._id}`, 'PUT', taskData)
            .then((task) => {
                dispatch({type: 'SAVE_TASK', task})
            })
    }
}

export function deleteTask(taskId) {
    return (dispatch) => {
        makeRequest(`http://localhost:3001/task/${taskId}`, 'DELETE')
            .then((task) => {
                dispatch({type: 'DELETE_TASK', taskId})
            })
    }
}

export function deleteTasks(tasks) {
    return (dispatch) => {
        makeRequest(`http://localhost:3001/task`, 'PATCH', {tasks: [...tasks]})
            .then(() => {
                dispatch({type: 'DELETE_TASKS', tasks})
            })


    }
}