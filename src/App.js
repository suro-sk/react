import Header from './Header';
import TodoList from "./todo-list/TodoList";
import Footer from './Footer';
import './App.css';


function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Header/>
            </header>
            <TodoList/>
            <Footer/>
        </div>
    );
}

export default App;
