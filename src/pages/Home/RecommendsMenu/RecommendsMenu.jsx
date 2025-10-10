import SectionTitle from '../../../componenets/SectionTitle/SectionTitle';
import recommendsImg from '../../../assets/home/slide5.jpg';
import { Link } from 'react-router-dom';

const RecommendsMenu = () => {
  return (
    <section className="py-12">
      <SectionTitle heading="CHEF RECOMMENDS" subHeading="Should Try" />
      <div className="grid md:grid-cols-3 gap-6 justify-center items-center mb-12">
        <div className="card bg-base-100 shadow-lg w-96 mx-auto">
          <figure>
            <img
              className="h-[250px] w-full object-cover"
              src={recommendsImg}
              alt="Caesar Salad"
            />
          </figure>
          <div className="card-body text-center">
            <h2 className="card-title justify-center text-xl font-semibold">
              Caesar Salad
            </h2>
            <p className="text-gray-600">
              Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.
            </p>
            <div className="card-actions justify-center mt-4">
              <Link
                to="/order/salad"
                className="btn btn-outline border-0 border-b-4 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white"
              >
                Add To Cart
              </Link>
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-lg w-96 mx-auto">
          <figure>
            <img
              className="h-[250px] w-full object-cover"
              src={recommendsImg}
              alt="Caesar Salad"
            />
          </figure>
          <div className="card-body text-center">
            <h2 className="card-title justify-center text-xl font-semibold">
              Caesar Salad
            </h2>
            <p className="text-gray-600">
              Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.
            </p>
            <div className="card-actions justify-center mt-4">
              <Link
                to="/menu"
                className="btn btn-outline border-0 border-b-4 border-orange-400"
              >
                Add To Cart
              </Link>
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-lg w-96 mx-auto">
          <figure>
            <img
              className="h-[250px] w-full object-cover"
              src={recommendsImg}
              alt="Caesar Salad"
            />
          </figure>
          <div className="card-body text-center">
            <h2 className="card-title justify-center text-xl font-semibold">
              Caesar Salad
            </h2>
            <p className="text-gray-600">
              Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.
            </p>
            <div className="card-actions justify-center mt-4">
              <Link
                to="/order"
                className="btn btn-outline border-0 border-b-4 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white"
              >
                Add To Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecommendsMenu;
