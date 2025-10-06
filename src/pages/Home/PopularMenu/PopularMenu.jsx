import SectionTitle from './../../../componenets/SectionTitle/SectionTitle';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import useMenu from '../../../hooks/useMenu';
import { Link } from 'react-router-dom';

const PopularMenu = () => {
  const [menu] = useMenu([]);
  const popular = menu.filter((item) => item.category === 'popular');

  return (
    <section className="mb-12">
      <SectionTitle heading="From Our Menu" subHeading="Popular Items" />
      <div className="grid md:grid-cols-2 gap-10">
        {popular.map((item) => (
          <MenuItem 
          key={item._id} item={item}>
          </MenuItem>
        ))}
      </div>
      <div className="text-center mt-5">
        <Link to='/menu' className="btn btn-outline border-0 border-b-4">
          View Full Menu
        </Link>
      </div>
    </section>
  );
};

export default PopularMenu;
