import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import addsign from '../images/addsign.png';
import Header from '../components/Header';

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [role, setRole] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}items`);
        setItems(response.data.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    if (user) {
      setRole(user.role);
    }
  }, [user]);

  return (
    <>
      <div className="flex flex-col justify-center  bg-black min-h-[100vh] wrap relative">
        <Header />
        <h3 className="mt-24 text-5xl text-center text-white">Products</h3>
        <div className="flex flex-wrap justify-center w-10/12 pb-20 m-auto mt-20 text-center text-white">
          {items.length > 0 &&
            items.map((item) => {
              return (
                <Link to={`/gallery/edit/${item._id}`}>
                  <div key={item.name} className="cursor-pointer">
                    <img
                      className="max-w-[330px]"
                      src={item.images.high}
                      alt={item.name}
                    />

                    <p className="hover:text-[#ce9556]">{item.name}</p>
                    <p>${Number(item.price).toFixed(2)}</p>
                    <p>{item.artist}</p>
                  </div>
                </Link>
              );
            })}
        </div>

        <div>
          {role === 'admin' && (
            <Link to="/gallery/add">
              <img
                className="absolute w-16 bottom-5 right-10 "
                src={addsign}
                alt="icon"
              />
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Gallery;
