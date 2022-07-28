import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [items, setItems] = useState([]);

  const onRemoveItem = (id) => {
    const index = items.findIndex(({ _id }) => id === _id); // get Index from Items
    const _items = [...items]; // duplicate
    _items.splice(index, 1); // remove item using index found

    const storage = _items.map(({ _id }) => _id); // map object to id only
    localStorage.setItem('cart', JSON.stringify(storage)); // save array of ids to localstorage

    setItems(_items); // update state with removed item
  };

  const onBuyItems = async () => {
    try {
      const items = JSON.parse(localStorage.getItem('cart'));
      const { _id } = JSON.parse(localStorage.getItem('user'));

      await axios.post(`${process.env.REACT_APP_API}users/buy`, {
        id: _id,
        items,
      });

      localStorage.removeItem('cart');
      setItems([]);
      setCart([]);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart')) || []);
  }, []);

  useEffect(() => {
    const getItemsByIds = async () => {
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_API}items/multiple`,
          {
            ids: cart,
          }
        );

        setItems(data.data);
      } catch (error) {
        alert(error.message);
      }
    };

    if (cart.length > 0) {
      getItemsByIds();
    }
  }, [cart]);

  return (
    <div>
      <div className="bg-black min-h-[100vh]  bg-cover flex flex-col wrap">
        <Header />
        <div className="text-center">
          <h1 className="mt-20 text-6xl text-white">Cart</h1>
          <div className="">
            {items.length > 0 ? (
              <div className="flex flex-wrap justify-center w-10/12 pb-20 m-auto mt-20 text-center text-white">
                {items.map((item) => (
                  <div>
                    <p className="mt-8 text-white">{item.name}</p>
                    <img
                      className="mt-4"
                      src={item.images.high}
                      alt={item.images.high}
                    />
                    <p className="mt-2 text-white">
                      ${Number(item.price).toFixed(2)}
                    </p>
                    <p className="mt-2 text-white">{item.artist}</p>
                    <button
                      className="mt-4 text-white bg-gray-700 border w-28"
                      type="button"
                      onClick={() => onRemoveItem(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <div className="absolute w-16 top-[250px] right-[400px]">
                  <button
                    className="text-white bg-[#ce9556] border w-28 mt-2"
                    type="button"
                    onClick={onBuyItems}
                  >
                    Buy
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-white">No items in cart</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
