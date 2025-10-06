import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import orderCoverImg from '../../../assets/shop/banner2.jpg';
import Cover from '../../../pages/Shared/Cover/Cover';
import { useState } from 'react';
import useMenu from '../../../hooks/useMenu';
import FoodCard from '../../FoodCard/FoodCard';
import OrderTab from '../OrderTab/OrderTab';

const Order = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [menu] = useMenu();

  const dessert = menu.filter((item) => item.category === 'dessert');
  const soup = menu.filter((item) => item.category === 'soup');
  const salad = menu.filter((item) => item.category === 'salad');
  const pizza = menu.filter((item) => item.category === 'pizza');
  const drinks = menu.filter((item) => item.category === 'drinks');

  return (
    <div className="pt-8 my-12 mx-auto text-center">
      <Cover img={orderCoverImg} title="Order Food" />

      <Tabs
        className="mt-12"
        selectedIndex={tabIndex}
        onSelect={(index) => setTabIndex(index)}
      >
        <TabList>
          <Tab>SALAD</Tab>
          <Tab>PIZZA</Tab>
          <Tab>SOUPS</Tab>
          <Tab>DESSERTS</Tab>
          <Tab>DRINKS</Tab>
        </TabList>

        <TabPanel>
          <OrderTab items={salad} />
        </TabPanel>

        <TabPanel>
          <OrderTab items={pizza} />
        </TabPanel>

        <TabPanel>
          <OrderTab items={soup} />
        </TabPanel>

        <TabPanel>
          <OrderTab items={dessert} />
        </TabPanel>

        <TabPanel>
          <OrderTab items={drinks} />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Order;
