import { Component } from 'react';
import Cart from './Cart';

class OnlineShopping extends Component {
  constructor(props) {
    super(props);
    // An array of 5 items, each rendered via the Cart component below.
    this.items = [
      { id: 1, itemName: 'Laptop', price: 55000 },
      { id: 2, itemName: 'Mouse', price: 800 },
      { id: 3, itemName: 'Keyboard', price: 1500 },
      { id: 4, itemName: 'Monitor', price: 12000 },
      { id: 5, itemName: 'Headphones', price: 2500 },
    ];
  }

  render() {
    return (
      <div>
        <h2>OnlineShopping</h2>
        <ul>
          {/* Loop through the items array, passing each item's fields down as props to Cart */}
          {this.items.map((item) => (
            <Cart key={item.id} itemName={item.itemName} price={item.price} />
          ))}
        </ul>
      </div>
    );
  }
}

export default OnlineShopping;
