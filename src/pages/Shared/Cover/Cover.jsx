import { Link } from "react-router-dom";

const Cover = ({ img, title }) => {
  return (
    <div>
      <div
        className="hero h-[700px] w-full text-center"
        style={{
          backgroundImage: `url("${img}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="hero-overlay bg-black bg-opacity-50"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md bg-[#151515] bg-opacity-50 p-20 text-center text-white">
            <h1 className="mb-5 text-5xl font-bold uppercase">{title}</h1>
            <p className="mb-5">Would you like to try a dish?</p>
          </div>
        </div>
      </div>
        <div className="flex justify-center mt-10">
        <Link to='/order' className="btn btn-outline border-0 border-b-4 border-black-600">
        ORDER YOUR FAVOURITE FOOD
      </Link>
        </div>
    </div>
  );
};

export default Cover;
