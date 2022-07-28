import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onFormSubmit = async (e) => {
    e.preventDefault();

    // Axios call
    // 1. Check if user email exists
    // 2. If not, proceed with registration
    try {
      const { data } = await axios.post(
        `https://nft-gallery-api.herokuapp.com/users/register`,
        {
          username,
          email,
          password,
        }
      );

      if (data.error) {
        alert(data.error);
        return;
      }

      navigate('/login');
    } catch (error) {
      alert(error.message);
    }
  };

  const clearForm = () => {
    setEmail('');
    setUsername('');
    setPassword('');
    setError('');
  };

  return (
    <>
      <div className="bg-[url('https://wallpaperaccess.com/full/494151.jpg')] min-h-[100vh] bg-cover flex">
        <div className="relative p-8 my-[300px]  rounded-md ml-[500px]  h-60">
          <form onSubmit={onFormSubmit}>
            <label className="inline-block w-full text-2xl text-white">
              Username
            </label>
            <input
              className="h-8 p-2 mt-3 border-white w-72"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className="inline-block w-full mt-3 text-2xl text-white">
              Email{' '}
            </label>
            <input
              className="h-8 p-2 mt-2 w-72"
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="inline-block w-full mt-3 text-2xl text-white">
              Password{' '}
            </label>
            <input
              className="h-8 mt-2 w-72"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button
              className="h-8 border border-black bg-[#ce9556] w-32 rounded hover:bg-gray-600 hover:text-white mt-8"
              type="submit"
            >
              Register
            </button>
          </form>
          <small>{error}</small>
        </div>
      </div>
    </>
  );
};

export default Registration;
