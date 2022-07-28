import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onLogin = async () => {
    if (!username || !password) {
      alert('Username and Password are required.');
      return;
    }

    const { data } = await axios.post(`https://nft-gallery-api.herokuapp.com/users/login`, {
      username,
      password,
    });

    if (data.error) {
      alert(data.error);
      return;
    }

    localStorage.setItem('user', JSON.stringify(data.data));

    navigate('/');
  };

  return (
    <div className="bg-[url('https://wallpaperaccess.com/full/494151.jpg')] min-h-[100vh] bg-right-top bg-cover flex">
      <div className="relative p-8 my-[350px] rounded-md ml-[500px]  h-60">
        <label className="inline-block w-full text-2xl text-white">
          Username
        </label>
        <input
          className="h-8 p-2 mt-3 w-72"
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="inline-block w-full mt-3 text-2xl text-white">
          Password
        </label>
        <input
          className="h-8 p-2 mt-2 w-72"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Link to="/registration">
          <p className="mt-[60px] hover:text-[#ce9556] cursor-pointer text-white text-2xl">
            Sign up?
          </p>
        </Link>

        <button
          className="h-8 border border-black bg-[#ce9556] w-32 absolute bottom-0.5  rounded hover:bg-black hover:text-white"
          type="button"
          onClick={onLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;

// const [user, setUser] = useState(null);

// useEffect(() => {
//   // Check if there is an existing user saved on the localStorage
//   //     setUser(
//   //       localStorage.getItem('user')
//   //         ? JSON.parse(localStorage.getItem('user'))
//   //         : null
//   //     );
// }, []);
