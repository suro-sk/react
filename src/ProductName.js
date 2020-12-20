import {Component} from 'react';

class ProductName extends Component {

    render() {
        return(
            <h3>{this.props.name}</h3>
        )
    }

}

export default ProductName;