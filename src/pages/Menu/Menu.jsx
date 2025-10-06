import { Helmet } from 'react-helmet-async';
import Cover from '../Shared/Cover/Cover';
import menuImg from '../../assets/menu/banner3.jpg';
import dessertImg from '../../assets/menu/dessert-bg.jpeg'; 
import pizzaImg from '../../assets/menu/pizza-bg.jpg';
import saladImg from '../../assets/menu/salad-bg.jpg';
import soupImg from '../../assets/menu/soup-bg.jpg';

import SectionTitle from '../../componenets/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';
import useMenu from '../../hooks/useMenu';

const Menu = () => {
  const [menu] = useMenu();
  

const dessert = menu.filter(item => item.category === 'dessert');
  const soup = menu.filter(item => item.category === 'soup');
  const salad = menu.filter(item => item.category === 'salad');
  const pizza = menu.filter(item => item.category === 'pizza');
  const offered = menu.filter(item => item.category === 'offered');

  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Menu</title>
      </Helmet>

      {/* Main cover */}
      <Cover img={menuImg} title="Our Menu" />

      {/* Today's Offer */}
      <SectionTitle subHeading="Don't Miss" heading="TODAY'S OFFER" />
      <MenuCategory items={offered} />

      {/* Dessert Category */}
      <MenuCategory items={dessert} title={"dessert"} img={dessertImg} />

      {/* Pizza Category */}
      <MenuCategory items={pizza} title={"pizza"} img={pizzaImg} />

      {/* Salad Category */}
      <MenuCategory items={salad} title={"salad"} img={saladImg} />

      {/* Soup Category */}
      <MenuCategory items={soup} title={"soup"} img={soupImg} />
    </div>
  );
};

export default Menu;
