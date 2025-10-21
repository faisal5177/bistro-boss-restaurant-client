import FoodCard from "../../FoodCard/FoodCard";

const OrderTab = ({ items }) => {
  return (
    <div className="grid lg:grid-cols-3  md:grid-cols-2 sm:grid-cols-1 gap-6 mt-8 mx-auto px-8 ml-3">
            {items.map((item) => (
              <FoodCard key={item._id} item={item} />
            ))}
          </div>
  );
};

export default OrderTab;