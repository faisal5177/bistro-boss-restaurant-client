import { useForm } from 'react-hook-form';
import SectionTitle from '../../../componenets/SectionTitle/SectionTitle';
import { FaUtensils } from 'react-icons/fa';
import useAxiosPublic from './../../../hooks/useAxiosPublic';
import useAxiosSecure from './../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddItem = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const onSubmit = async (data) => {
    console.log(data);
    // image uploaded to imgbb and the get an url
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });

    if (res.data.success) {
      // now send the menu item data to the server with the image url
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res.data.data.display_url,
      };
      //
      const menuRes = await axiosSecure.post('/menu', menuItem);
      console.log(menuRes.data);
      if (menuRes.data.insertedId) {
        // so success poppup
        reset();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${data.name} is added to the menu`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    console.log(res.data);
  };

  return (
    <div>
      <SectionTitle heading="Add an Item" subHeading="What's new?" />

      <div className="bg-base-200 p-6 rounded-xl mt-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Recipe Name */}
          <div className="form-control w-full my-4">
            <label className="label">
              <span className="label-text">Recipe Name*</span>
            </label>
            <input
              {...register('name', { required: true })}
              type="text"
              placeholder="Enter recipe name"
              className="input input-bordered w-full"
            />
          </div>

          {/* Category & Price */}
          <div className="flex gap-6">
            {/* Category */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select
                defaultValue=" default"
                {...register('category', { required: true })}
                className="select select-bordered w-full"
              >
                <option value="default" disabled>
                  Select a category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
              </select>
            </div>

            {/* Price */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input
                {...register('price', { required: true })}
                type="number"
                placeholder="Enter price"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Recipe Details */}
          <div className="form-control w-full my-4">
            <label className="label">
              <span className="label-text">Recipe Details</span>
            </label>
            <textarea
              {...register('recipe')}
              className="textarea textarea-bordered h-24"
              placeholder="Enter recipe details"
            ></textarea>
          </div>

          {/* Image Upload */}
          <div className="form-control w-full my-4">
            <label className="label">
              <span className="label-text">Upload Image*</span>
            </label>
            <input
              {...register('image', { required: true })}
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-outline border-0 border-b-4 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white w-full"
          >
            Add Item <FaUtensils className="ml-4"></FaUtensils>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
