import logo from './logo.svg';
import './App.css';

function Header() {
    return (
        <h1>Hello <User name={"Elon Mask"}/>!</h1>
    )
}

function Footer() {
    return (
        <h4>Have a good day</h4>
    )
}

function User(props) {
    return (
        <span>{props.name || 'John Doe'}</span>
    )
}

function CurrentDay() {
    let currentDate = new Date();
    return (
        <div>
            <h3>Today is:</h3>
            <h2>{currentDate.toDateString()}</h2>
        </div>
    )
}

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Header/>
                <CurrentDay/>
                <Footer/>
            </header>
        </div>
    );
}

export default App;
