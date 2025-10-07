import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import orderCoverImg from '../../../assets/shop/banner2.jpg';
import Cover from '../../../pages/Shared/Cover/Cover';
import useMenu from '../../../hooks/useMenu';
import OrderTab from '../OrderTab/OrderTab';
import { Helmet } from 'react-helmet-async';

const Order = () => {
  const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks'];
  const { category } = useParams();

  // Safe default: if category not found, use 0
  const initialIndex = categories.indexOf(category);
  const [tabIndex, setTabIndex] = useState(
    initialIndex === -1 ? 0 : initialIndex
  );

  const [menu] = useMenu();

  // Re-set tabIndex if the URL changes (optional, but useful)
  useEffect(() => {
    const newIndex = categories.indexOf(category);
    if (newIndex !== -1) {
      setTabIndex(newIndex);
    }
  }, [category]);

  // Filter menu items
  const dessert = menu.filter((item) => item.category === 'dessert');
  const soup = menu.filter((item) => item.category === 'soup');
  const salad = menu.filter((item) => item.category === 'salad');
  const pizza = menu.filter((item) => item.category === 'pizza');
  const drinks = menu.filter((item) => item.category === 'drinks');

  return (
    <div className=" mx-auto text-center">
      <Helmet>
        <title>Bistro Boos | Order Food</title>
      </Helmet>
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
