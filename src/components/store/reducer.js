import * as actionTypes from './actionTypes';
import {isUserLoggedIn} from '../../helpers/authToken'

const defaultState = {
    count: 0,
    tasks: [],
    task: null,
    taskAdded: false,
    taskEdited: false,
    tasksDeleted: false,
    loading: false,
    successMsg: null,
    errorMsg: null,
    isUserLoggedIn: isUserLoggedIn(),
    user: null,
    contactFormSent: false
};

export default function reducer(state = defaultState, action) {

    switch (action.type) {
        case actionTypes.PENDING: {
            return {
                ...state,
                loading: true,
                taskAdded: false,
                taskEdited: false,
                tasksDeleted: false,
                contactFormSent: false,
                successMsg: null,
                errorMsg: null,
            };
        }
        case actionTypes.FETCH_TASKS: {
            return {
                ...state,
                tasks: action.tasks,
                loading: false
            }
        }
        case actionTypes.FETCH_TASK: {
            return {
                ...state,
                task: action.task,
                loading: false
            }
        }
        case actionTypes.ADD_TASK: {
            return {
                ...state,
                tasks: [...state.tasks, action.task],
                loading: false,
                taskAdded: true,
                successMsg: 'Task successfully created.'
            }
        }
        case actionTypes.SAVE_TASK: {
            const task = action.task;

            let successMsg = 'Task successfully modified.'

            if (action.status) {
                if (action.status === 'done') {
                    successMsg = 'Task status changed to Done'
                } else {
                    successMsg = 'Task status changed to Active'
                }
            }

            if (action.isSingle) {
                return {
                    ...state,
                    task,
                    taskEdited: true,
                    loading: false,
                    successMsg
                }
            } else {
                const tasks = [...state.tasks];
                const idx = tasks.findIndex((thisTask) => thisTask._id === task._id);
                tasks[idx] = task;

                return {
                    ...state,
                    tasks,
                    taskEdited: true,
                    loading: false,
                    successMsg
                }
            }
        }
        case actionTypes.DELETE_TASK: {
            const remainingTasks = state.tasks.filter((task) => {
                return action.taskId !== task._id
            });

            return {
                ...state,
                tasks: remainingTasks,
                task: null,
                loading: false,
                successMsg: 'Task successfully deleted.'
            }
        }
        case actionTypes.DELETE_TASKS: {
            const remainingTasks = state.tasks.filter(task => {
                return !action.tasks.has(task._id);
            })

            return {
                ...state,
                tasks: remainingTasks,
                tasksDeleted: true,
                loading: false,
                successMsg: 'Tasks successfully modified.'
            }
        }
        case actionTypes.REGISTER: {
            return {
                ...state,
                loading: false,
                successMsg: 'You have successfully registered. Please Log In.'
            }
        }
        case actionTypes.LOGIN: {
            return {
                ...state,
                loading: false,
                isUserLoggedIn: true
            }
        }
        case actionTypes.LOGOUT: {
            return {
                ...state,
                loading: false,
                isUserLoggedIn: false,
                user: null
            }
        }
        case actionTypes.GET_USER: {
            return {
                ...state,
                loading: false,
                user: action.user
            }
        }
        case actionTypes.CONTACT_FORM: {
            return {
                ...state,
                loading: false,
                contactFormSent: true,
                successMsg: 'Your message successfully sent!'
            }
        }
        case actionTypes.ERROR: {
            return {
                ...state,
                loading: false,
                errorMsg: action.error
            };
        }
        default:
            return state;
    }

}