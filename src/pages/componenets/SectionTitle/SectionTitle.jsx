const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="md:w-3/12 text-center mx-auto my-8">
      <p className="text-yellow-600 mb-2">--- {subHeading} ---</p>
      <h2 className="text-3xl uppercase border-y-4 py-2">{heading}</h2>
    </div>
  );
};

export default SectionTitle;
