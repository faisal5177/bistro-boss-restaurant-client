import SectionTitle from './../../../componenets/SectionTitle/SectionTitle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useState } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure('/reviews')
      .then((res) => {
        setReviews(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching reviews:', err);
        setError('Failed to load testimonials.');
        setLoading(false);
      });
  }, []);

  return (
    <section className="my-20">
      <SectionTitle heading="TESTIMONIALS" subHeading="What Our Clients Say" />

      {loading && <p className="text-center">Loading reviews...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && reviews.length === 0 && (
        <p className="text-center">No testimonials available at the moment.</p>
      )}

      {!loading && !error && reviews.length > 0 && (
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="mx-24 my-16 flex flex-col items-center">
                <Rating
                  style={{ maxWidth: 180 }}
                  value={review.rating}
                  readOnly
                />
                <p className="text-center py-8">{review.details}</p>
                <h3 className="text-2xl text-orange-400 font-semibold">
                  {review.name}
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};

export default Testimonials;
