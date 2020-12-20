import {Component} from 'react';
import ProductName from "./ProductName";
import ProductPrice from "./ProductPrice";
import ProductDescription from "./ProductDescription";

class Product extends Component {

    render() {
        return (
            <div className="product">
                <ProductName name={this.props.name}/>
                <ProductPrice price={this.props.price}/>
                <ProductDescription description={this.props.description}/>
            </div>
        )
    }

}

export default Product;