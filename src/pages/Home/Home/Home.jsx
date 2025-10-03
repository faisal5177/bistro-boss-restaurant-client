import Banner from "../Banner/Banner";
import BistroBoss from "../BistroBoss/BistroBoss";
import Category from "../Category/Category";
import Contact from "../Contact/Contact";
import Featured from "../Featured/Featured";
import PopularMenu from "../PopularMenu/PopularMenu";
import Testimonials from "../Testimonials/Testimonials";
import RecommendsMenu from './../RecommendsMenu/RecommendsMenu';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Category></Category>
      <BistroBoss></BistroBoss>
      <PopularMenu></PopularMenu>
      <Contact></Contact>
      <RecommendsMenu></RecommendsMenu>
      <Featured></Featured>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;