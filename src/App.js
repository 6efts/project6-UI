import { Routes, Route } from 'react-router-dom';
// import Header from './components/Header';
import Home from './views/Home';
import Login from './views/Login';
import Gallery from './views/Gallery';
import Registration from './views/Registration';
import Item from './views/Item';
import Cart from './views/Cart';

const App = () => {
  // localStorage.getItem();

  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery/edit/:id" element={<Item />} />
        <Route path="/gallery/add" element={<Item />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
};

export default App;
