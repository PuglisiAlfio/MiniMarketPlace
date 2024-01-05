import { useSelector } from 'react-redux';

import CartIcon from "./CartIcon";
import classes from './NavCartButton.module.css'

const NavCartButton: React.FC = () => {

  const cartItems = useSelector((state: any) => state.cart.items);

  const totalQuantity = cartItems.reduce((total: number, item: { qnt: number }) => total + item.qnt, 0);

  return (
    <>
      <button className={classes.button}>
        <span className={classes.icon}>
          <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{totalQuantity}</span>
      </button>
    </>
  );
};

export default NavCartButton;