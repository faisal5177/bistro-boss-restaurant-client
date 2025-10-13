// MenuItems.jsx
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MenuItems = () => {
  const [menu, setMenu] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure .get('menu').then((res) => setMenu(res.data));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Menu Items</h2>
      <ul>
        {menu.map((item) => (
          <li key={item._id}>
            {item.name} - ${item.price} ({item.category})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuItems;
