import { Component } from 'react';

// Cart has 2 properties, received as props from its parent (OnlineShopping) — this is the
// difference between State (owned by a component) and Props (passed down from a parent).
class Cart extends Component {
  render() {
    const { itemName, price } = this.props;
    return (
      <li>
        {itemName} — &#8377;{price}
      </li>
    );
  }
}

export default Cart;
