import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../store/features/cartSlice";
import ShippingForm from "../components/ShippingForm";

interface Item {
  product_img: string;
  product_name: string;
  product_id: number;
  product_price: number;
  qnt: number;
}

const Cart: React.FC = () => {
  const cartItems = useSelector((state: any) => state.cart.items);

  const dispatch = useDispatch();

  let cartTotalPrice = cartItems.reduce(
    (total: number, item: Item) => total + item.product_price * item.qnt,
    0
  );

  //Funzione che applica lo sconto
  const applyDiscounts = (items: Item[]) => {
    const itemsFree = items.map((item) => ({ ...item }));

    itemsFree.sort((a, b) => a.product_price - b.product_price);

    if (cartTotalPrice > 1000 && itemsFree.length > 3) {
      cartTotalPrice =
        cartTotalPrice -
        itemsFree[0].product_price -
        itemsFree[1].product_price;
      itemsFree[0] = { ...itemsFree[0], product_price: 0 };
      itemsFree[1] = { ...itemsFree[1], product_price: 0 };
    }
    return itemsFree;
  };

  // Rimozione prodotto dal carrello
  const handleRemoveFromCart = (productId: number) => {
    dispatch(removeFromCart({ product_id: productId, qnt: 1 }));
  };

  const calculateTotalPrice = (item: Item) => {
    return item.qnt * item.product_price;
  };

  const cartDiscounts = applyDiscounts(cartItems);

  return (
    <>
      <h2 className="text-center font-semibold text-2xl">Your Cart</h2>
      <p className="text-xs text-center">
        If basket total price is more than 1000€ and more than 3 items are
        present in the basket the 2 cheapest items will be free
      </p>
      <div className={`${cartDiscounts.length > 0 ? "sm:flex sm:justify-between" : ""}`}>
        <div className="sm:flex sm:flex-col mx-10 my-5">
          {cartItems.length === 0 ? (
            <p className="flex text-5xl items-center justify-center">
              Your cart is empty
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-28 h-28"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                />
              </svg>
            </p>
          ) : (
            <ul className="text-center sm:grid sm:grid-cols-3 flex flex-col items-center gap-4">
              {cartDiscounts.map((item) => (
                <>
                  <li
                    key={item.product_id}
                    className="sm:flex sm:items-center border rounded-lg flex-col"
                  >
                    <img
                      src={item.product_img}
                      alt="prodotto nel carrello"
                      className="h-32 max-w-xs mx-auto"
                    />
                    <div className="">
                      <p>{item.product_name}</p>
                      <p> Quantity: {item.qnt} </p>
                      <p>Price: {calculateTotalPrice(item)}€</p>
                      <button
                        className="hover:bg-[#4d1601] bg-red-800 border rounded-2xl px-4 py-2 text-xs text-white"
                        onClick={() => handleRemoveFromCart(item.product_id)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                </>
              ))}
              <li className="text-end mt-3">
                <strong>Total Cart Price: {cartTotalPrice}€</strong>
              </li>
            </ul>
          )}
        </div>
        {cartDiscounts.length > 0 && (
          <ShippingForm totalPrice={cartTotalPrice}/>
        )}
      </div>
    </>
  );
};

export default Cart;