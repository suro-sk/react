import {Component} from 'react';
import Task from "./Task";


export default class TodoList extends Component {

    state = {
        inputValue: '',
        tasks: []
    }

    handleInputChange = e => {
        this.setState({
            inputValue: e.target.value
        })
    }

    handleTaskCreating = (e) => {
        e.preventDefault();
        if (!this.state.inputValue.length) return;
        
        this.setState({
            tasks: [...this.state.tasks, ...[this.state.inputValue]],
            inputValue: ''
        })
    }

    render() {
        const generatedTasks = this.state.tasks.map((el, i) => {
            return (
                <li key={i}>
                    <Task name={el}/>
                </li>
            )
        })

        return (
            <div className="todo-list">
                <form className="controls-area" onSubmit={this.handleTaskCreating}>
                    <input type="text" value={this.state.inputValue} onChange={this.handleInputChange}
                           placeholder="Add Your Task"/>
                    <button>Add</button>
                </form>
                <ol className="tasks-area">{generatedTasks}</ol>
            </div>
        )
    }
}