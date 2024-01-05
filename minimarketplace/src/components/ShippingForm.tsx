import { useState } from "react";

interface Props {
  totalPrice: number;
}

const ShippingForm: React.FC<Props> = (props) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  let totalPrice = props.totalPrice;

  const handleSubmitInfo = (event: React.FormEvent) => {
    event.preventDefault();
  };

  if (selectedPaymentMethod === "cash") {
    totalPrice += 10;
  }

  return (
    <>
      <div className="flex flex-col items-center sm:pr-4">
        <h3>Shipping Info</h3>
        <form
          className="grid grid-cols-2 gap-4 bg-red-800 p-3"
          onSubmit={handleSubmitInfo}
        >
          <div className="flex flex-col">
            <label htmlFor="firstName">Firstname:</label>
            <input
              className="rounded-md"
              type="text"
              name="firstName"
              id="firstName"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName">Lastname:</label>
            <input
              className="rounded-md"
              type="text"
              name="lastName"
              id="lastName"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="address">Address:</label>
            <input
              className="rounded-md"
              type="text"
              name="address"
              id="address"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="zipCode">Zip Code:</label>
            <input
              className="rounded-md"
              type="text"
              name="zipCode"
              id="zipCode"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="province">Province:</label>
            <input
              className="rounded-md"
              type="text"
              name="province"
              id="province"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="country">Country:</label>
            <select id="country" name="country" className="rounded-md" required>
              <option value="italy">Italy</option>
              <option value="france">France</option>
              <option value="germany">Germany</option>
              <option value="england">England</option>
            </select>
          </div>

          <p className="text-white font-semibold">
            <p>cash payment 10€ more</p> Total price: {totalPrice}€
          </p>

          <div className="mt-4">
            <p>Payment method:</p>
            <label>
              <input
                type="radio"
                value="cash"
                checked={selectedPaymentMethod === "cash"}
                onChange={() => {
                  setSelectedPaymentMethod("cash");
                }}
              />
              Cash
            </label>
            <label className="ml-2">
              <input
                type="radio"
                value="creditCard"
                checked={selectedPaymentMethod === "creditCard"}
                onChange={() => setSelectedPaymentMethod("creditCard")}
              />
              Credit Card
            </label>
          </div>
          <button
            type="submit"
            className="hover:bg-[#2c0d00] bg-[#4d1601] rounded-2xl px-4 py-2 text-xs text-white h-fit"
          >
            Procedi all'acquisto
          </button>
          {selectedPaymentMethod === "creditCard" && (
            <div className="flex flex-col gap-3">
              <h2 className="font-semibold text-lg">Info card owner</h2>
              <div className="flex flex-col">
                <label htmlFor="firstNameCard">Firstname</label>
                <input
                  className="rounded-md"
                  type="text"
                  name="firstNameCard"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="lastNameCard">Lastname:</label>
                <input
                  className="rounded-md"
                  type="text"
                  name="lastNameCard"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="creditCardNumber">Credit Card Number:</label>
                <input
                  className="rounded-md"
                  type="text"
                  name="creditCardNumber"
                  minLength={16}
                  maxLength={16}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="cvc">CVC:</label>
                <input
                  className="rounded-md"
                  type="text"
                  name="cvc"
                  minLength={3}
                  maxLength={3}
                  required
                />
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default ShippingForm;
