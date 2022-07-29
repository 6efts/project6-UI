import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router';
import deleteicon from '../images/deletesign.png';
import saveicon from '../images/saveicon.png';
import Header from '../components/Header';

const Item = () => {
  const navigate = useNavigate();
  const [itemId, setItemId] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState({
    high: '',
    low: '',
  });
  const [artist, setArtist] = useState('');
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (id) {
        response = await axios.put(`https://nft-gallery-api.herokuapp.com/api/items/${id}`, {
          name,
          price,
          images,
          artist,
        });
      } else {
        response = await axios.post(`https://nft-gallery-api.herokuapp.com/api/items`, {
          items: [{ name, price, images, artist }],
        });
      }

      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }

    clearForm();
  };

  const clearForm = () => {
    setItemId(null);
    setName('');
    setPrice(0);
    setImages({
      high: '',
      low: '',
    });
    setArtist('');
  };

  const onDelete = async () => {
    try {
      const response = await axios.delete(
        `https://nft-gallery-api.herokuapp.com/api/items/${id}`
      );
      console.log(response.data);
      clearForm();
    } catch (error) {
      console.log(error.message);
    }
  };

  const onAddToCart = (itemId) => {
    if (!cart || cart.length === 0) {
      localStorage.setItem('cart', JSON.stringify([itemId]));
    } else {
      localStorage.setItem('cart', JSON.stringify([...cart, itemId]));
    }
    navigate('/gallery');
  };

  useEffect(() => {
    if (id) {
      const getById = async () => {
        try {
          const response = await axios.get(
            `https://nft-gallery-api.herokuapp.com/api/items/${id}`
          );

          if (response.data.data) {
            setItemId(response.data.data._id);
            setName(response.data.data.name);
            setPrice(response.data.data.price);
            setImages(response.data.data.images);
            setArtist(response.data.data.artist);
          }
        } catch (error) {
          console.log(error.message);
        }
      };

      getById();
    }
  }, [id]);

  return (
    <div className="bg-[url('https://www.99images.com/download-image/960916/1600x1200')] min-h-[100vh]  bg-cover flex flex-col">
      <Header />
      <div className="relative p-8 mx-auto my-[150px] bg-gray-600 rounded-md w-[500px] h-[400px] text-center">
        <form onSubmit={onFormSubmit}>
          <label className="inline-block w-full">Name</label>
          <input
            className="inline-block mt-2 text-center"
            type="text"
            value={name}
            placeholder="Input name ..."
            onChange={(e) => setName(e.target.value)}
          />
          <label className="inline-block w-full mt-4">Price </label>
          <input
            className="inline-block mt-2 text-center"
            type="number"
            placeholder="Input price ..."
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <label className="inline-block w-full mt-4">Images </label>
          <input
            className="inline-block mt-2 text-center"
            type="text"
            placeholder="Input image ..."
            value={images.high}
            onChange={(e) =>
              setImages({ high: e.target.value, low: e.target.value })
            }
          />
          <label className="inline-block w-full mt-4">Artist </label>
          <input
            className="inline-block mt-2 text-center"
            type="text"
            placeholder="Input artist ..."
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
          <br />

          {user && user.role === 'admin' && (
            <>
              <button type="button" onClick={onFormSubmit}>
                <img
                  className="absolute w-[45px] cursor-pointer bottom-4 right-3"
                  src={saveicon}
                  alt="save-icon"
                />
              </button>
              <button type="button" onClick={onDelete}>
                <img
                  className="absolute w-12 cursor-pointer bottom-3 left-3"
                  src={deleteicon}
                  alt="delete-icon"
                />
              </button>
            </>
          )}
          {user && user.role === 'user' && !cart.includes(itemId) && (
            <button
              className="text-black bg-[#ce9556] border w-32 absolute bottom-4 right-4 rounded border-none h-8 hover:bg-gray-900 hover:text-white "
              type="button"
              onClick={() => onAddToCart(itemId)}
            >
              ADD TO CART
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Item;
