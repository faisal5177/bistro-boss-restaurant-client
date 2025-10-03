import SectionTitle from '../../../componenets/SectionTitle/SectionTitle';
import featuredImg from '../../../assets/home/featured.jpg';
import './Featured.css';

const Featured = () => {
  return (
    <div className="featured-item pt-8 my-20 bg-fixed text-white my-20">
      <SectionTitle
        heading="FROM OUR MENU"
        subHeading="Check it out"
      ></SectionTitle>
      <div className="md:flex justify-center items-center gap-10 px-36 pb-20 pt-12 my-12 bg-slate-500 bg-opacity-40">
        <div>
          <img src={featuredImg} alt="" />
        </div>
        <div className="md: ml-10">
          <p>March 20, 2023</p>
          <p className="uppercase">WHERE CAN I GET SOME?</p>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
            voluptate facere, deserunt dolores maiores quod nobis quas quasi.
            Eaque repellat recusandae ad laudantium tempore consequatur
            consequuntur omnis ullam maxime tenetur.
          </p>
          <button className="btn btn-outline border-0 border-b-4 mt-4">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
