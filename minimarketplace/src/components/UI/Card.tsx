import { useState } from "react";

import { useDispatch } from "react-redux";
import { addToCart } from "../../store/features/cartSlice";

interface Props {
  thumbnail: string;
  title: string;
  productId: number;
  price: number;
}

const Card: React.FC<Props> = (props) => {

  const[quantity, setQuantity] = useState<number>(1)

  const dispatch = useDispatch();

  //Proprietà del prodotto necessarie da inserire nel carrello
  const handleAddToCart = () => {
    let product = {
      product_img: props.thumbnail,
      product_name: props.title,
      product_id: props.productId,
      product_price: props.price,
      qnt: quantity,
    };
    dispatch(addToCart(product));
  };

  //Aumento quantità prodotto da mettere nel carrello
  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  //Riduzione quantità prodotto da mettere nel carrello
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <img
          src={props.thumbnail}
          alt="Prodotto in vendita"
          className="h-32 max-w-xs"
        />
        <p>{props.title}</p>
        <p>{props.price}€</p>
        <div className="flex items-center">
        <button
          type="button"
          className="hover:bg-[#4d1601] bg-red-800 border rounded-l-2xl px-2 py-2 text-xs text-white"
          onClick={handleDecreaseQuantity}
        >
          -
        </button>
        <p className="px-2 py-2">{quantity}</p>
        <button
          type="button"
          className="hover:bg-[#4d1601] bg-red-800 border rounded-r-2xl px-2 py-2 text-xs text-white"
          onClick={handleIncreaseQuantity}
        >
          +
        </button>
      </div>
        <button
          type="button"
          className="hover:bg-[#4d1601] bg-red-800 border rounded-2xl px-4 py-2 flex text-xs text-white items-center"
          onClick={handleAddToCart}
        >
          Add to Chart{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-4 rounded-full"
          >
            <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Card;