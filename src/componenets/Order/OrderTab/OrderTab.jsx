import FoodCard from "../../FoodCard/FoodCard";

const OrderTab = ({ items }) => {
  return (
    <div className="grid md:grid-cols-3 gap-6 mt-8">
            {items.map((item) => (
              <FoodCard key={item._id} item={item} />
            ))}
          </div>
  );
};

export default OrderTab;