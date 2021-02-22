const defaultState = {
    count: 0,
    tasks: [],
    taskAdded: false,
    taskEdited: false,
    tasksDeleted: false
};

export default function reducer(state = defaultState, action) {

    switch (action.type) {
        case 'FETCH_TASKS': {
            return {
                ...state,
                tasks: action.tasks
            }
        }
        case 'ADD_TASK': {
            return {
                ...state,
                tasks: [...state.tasks, action.task],
                taskAdded: true
            }
        }
        case 'ADDING_TASK': {
            return {
                ...state,
                taskAdded: false
            }
        }
        case 'SAVE_TASK': {
            console.log('aaaaa',action.task)
            const task = action.task;
            const tasks = [...state.tasks];
            const idx = tasks.findIndex((thisTask) => thisTask._id === task._id);
            tasks[idx] = task;

            return {
                ...state,
                tasks,
                taskEdited: true
            }
        }
        case 'SAVING_TASK': {
            return {
                ...state,
                taskEdited: false
            }
        }
        case 'DELETE_TASK': {
            const remainingTasks = state.tasks.filter((task) => {
                return action.taskId !== task._id
            });

            return {
                ...state,
                tasks: remainingTasks,
            }
        }
        case 'DELETE_TASKS': {
            console.log('aaaa', action)
            const remainingTasks = state.tasks.filter(task => {
                return !action.tasks.has(task._id);
            })

            return {
                ...state,
                tasks: remainingTasks,
                tasksDeleted: true
            }
        }
        case 'INCREMENT_COUNT':
            return {
                ...state,
                count: state.count + 1
            }
        case 'DECREMENT_COUNT':
            return {
                ...state,
                count: state.count - 1
            }
        default:
            return state;
    }

}