const FoodCard = ({ item }) => {
  const { image, name, recipe, price } = item;

  return (
    <div className="card bg-base-100 shadow-lg w-96 mx-auto">
      <figure>
        <img className="h-[250px] w-full object-cover" src={image} alt={name} />
      </figure>
      <div className="absolute right-0 top-0 bg-slate-900 text-white px-4 py-2 m-4 rounded">
        <p className="text-lg bg-blick-500 font-bold  ">${price}</p>
      </div>

      <div className="card-body text-center">
        <h2 className="card-title justify-center text-xl font-semibold">
          {name}
        </h2>
        <p className="text-gray-600">{recipe}</p>
        <div className="card-actions justify-center mt-4">
          <button className="btn btn-outline border-0 border-b-4 border-orange-400">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
