import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import Featured from "../Featured/Featured";
import PopularMenu from "../PopularMenu/PopularMenu";
import RecommendsMenu from './../RecommendsMenu/RecommendsMenu';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Category></Category>
      <PopularMenu></PopularMenu>
      <RecommendsMenu></RecommendsMenu>
      <Featured></Featured>
    </div>
  );
};

export default Home;