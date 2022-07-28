import Header from '../components/Header';
import background from '../images/background1.png';

const Home = () => (
  <div className="bg-[url('https://catwithmonocle.com/wp-content/uploads/2020/05/ff7r-buster-sword-v2-2560x1440-1.jpg')] min-h-[100vh] bg-cover ">
    <Header />
    <div className=" w-[75%]  mx-auto text-left text-white">
      <h3 className="text-5xl pt-[20%]">
        Custom <span className="text-[#ce9556]">Designs</span>
      </h3>
      <h3 className="mt-2 text-5xl">& The Best Digital Artists</h3>
      <h4 className="mt-2 text-2xl">Great Talent With Wide Choices of Arts</h4>
      <button className="px-6 py-2 bg-[#ce9556] rounded-md mt-8 hover:text-white hover:bg-gray-900">
        CHECK IT OUT!
      </button>
    </div>
  </div>
);

export default Home;
