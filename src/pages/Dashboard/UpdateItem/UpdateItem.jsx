import { useLoaderData } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import SectionTitle from '../../../componenets/SectionTitle/SectionTitle';

// ✅ ইমেজ হোস্টিং কী ও API লিংক
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
  // ✅ লোডার থেকে ডেটা আনো
  const { name, category, recipe, price, _id, image } = useLoaderData();

  const { register, handleSubmit } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  // ✅ ফর্ম সাবমিট হ্যান্ডলার
  const onSubmit = async (data) => {
    try {
      console.log('Form data:', data);
      let imageUrl = image; // পুরনো image default হিসেবে থাকবে

      // 🖼️ যদি নতুন image দেয়া হয়, তাহলে upload করো
      if (data.image && data.image.length > 0) {
        const formData = new FormData();
        formData.append('image', data.image[0]);

        const res = await axiosPublic.post(image_hosting_api, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (res.data.success) {
          imageUrl = res.data.data.display_url;
        } else {
          Swal.fire('Image upload failed!', '', 'error');
          return;
        }
      }

      // ✅ Updated item তৈরি করো
      const updatedItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: imageUrl,
      };

      // 🔁 PATCH request পাঠাও backend এ
      const menuRes = await axiosSecure.patch(`/menu/${_id}`, updatedItem);
      console.log('Update Response:', menuRes.data);

      if (menuRes.data.modifiedCount > 0) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${data.name} has been updated successfully!`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire('No changes detected.', '', 'info');
      }
    } catch (error) {
      console.error('Update error:', error);
      Swal.fire('Something went wrong!', error.message, 'error');
    }
  };

  return (
    <div>
      <SectionTitle heading="Update an Item" subHeading="Refresh info" />

      <div className="bg-base-200 p-8 rounded-xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Recipe Name */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Recipe Name*</span>
            </label>
            <input
              type="text"
              defaultValue={name}
              placeholder="Recipe Name"
              {...register('name', { required: true })}
              className="input input-bordered w-full"
            />
          </div>

          {/* Category & Price */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Category */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select
                defaultValue={category}
                {...register('category', { required: true })}
                className="select select-bordered w-full"
              >
                <option disabled value="default">
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
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input
                type="number"
                defaultValue={price}
                placeholder="Price"
                {...register('price', { required: true })}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Recipe Details */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipe Details</span>
            </label>
            <textarea
              defaultValue={recipe}
              {...register('recipe')}
              className="textarea textarea-bordered h-24"
              placeholder="Details"
            ></textarea>
          </div>

          {/* Image Upload */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Upload New Image (optional)</span>
            </label>
            <input
              {...register('image')}
              type="file"
              accept="image/*"
              className="file-input w-full max-w-xs"
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary">
            Update Menu Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;
