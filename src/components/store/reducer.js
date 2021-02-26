import * as actionTypes from './actionTypes';

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
                taskAdded: true
            }
        }

        case actionTypes.SAVE_TASK: {
            const task = action.task;
            if (action.isSingle) {

                return {
                    ...state,
                    task,
                    taskEdited: true,
                    loading: false,
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
            }
        }
        case actionTypes.INCREMENT_COUNT:
            return {
                ...state,
                count: state.count + 1
            }
        case actionTypes.DECREMENT_COUNT:
            return {
                ...state,
                count: state.count - 1
            }
        default:
            return state;
    }

}