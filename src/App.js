import logo from './logo.svg';
import Header from './Header';
import Product from "./Product";
import Footer from './Footer';
import './App.css';


function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Header/>
            </header>
            <section className="shop">
                <h2>Shop</h2>
                <div className="products-holder">
                    <Product name="Bananas" price="$10" description="Fresh bananas from Ecuador"/>
                    <Product name="Apples" price="$8" description="Juicy apples"/>
                    <Product name="Apricots" price="$12" description="Tasty Apricots from Armenia"/>

                    <Product name="Bananas" price="$10" description="Fresh bananas from Ecuador"/>
                    <Product name="Apples" price="$8" description="Juicy apples"/>
                    <Product name="Apricots" price="$12" description="Tasty Apricots from Armenia"/>

                    <Product name="Bananas" price="$10" description="Fresh bananas from Ecuador"/>
                    <Product name="Apples" price="$8" description="Juicy apples"/>
                    <Product name="Apricots" price="$12" description="Tasty Apricots from Armenia"/>

                </div>
            </section>
            <Footer/>
        </div>
    );
}

export default App;
