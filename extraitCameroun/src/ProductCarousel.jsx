// 📁 src/ProductCarousel.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const products = [
  {
    id: 1,
    name: 'Eau de parfum - Rose bonbon',
    price: '3500 FCFA',
    img: 'https://i.imgur.com/r6TtZSk.jpeg',
    available: true,
  },
  {
    id: 2,
    name: 'Eau de parfum - Fresh Citrus',
    price: '3500 FCFA',
    img: 'https://i.imgur.com/Pq4w412.jpeg',
    available: false,
  },
  {
    id: 3,
    name: 'Eau de parfum - Jasmine Dream',
    price: '3500 FCFA',
    img: 'https://i.imgur.com/aVoSeaN.jpeg',
    available: true,
  },
  {
    id: 4,
    name: 'Eau de parfum - Rose Essence',
    price: '3500 FCFA',
    img: 'https://i.imgur.com/SEOKOAe.jpeg',
    available: true,
  },
  {
    id: 4,
    name: 'Eau de parfum - Rose Essence',
    price: '3500 FCFA',
    img: 'https://i.imgur.com/nu0pQl2.jpeg',
    available: true,
  },
  {
    id: 4,
    name: 'Eau de parfum - Rose Essence',
    price: '3500 FCFA',
    img: 'https://i.imgur.com/7zsDJks.jpeg',
    available: true,
  },
];

const ProductCarousel = () => {
  return (
    <section className="border-y py-8 px-4">
      {/* <h3 className="text-lg font-semibold mb-4 text-center">Explore Our Collections</h3> */}
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        loop={true}
        autoplay={{ delay: 3000 }}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination, Autoplay]}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="text-center">
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-80 object-cover mb-2 rounded"
              />
              {!product.available && (
                <p className="text-red-600 text-xs mb-1">indisponible</p>
              )}
              <p className="text-sm font-medium">{product.name}</p>
              <p className="text-xs text-gray-600">{product.price}</p>
              <a href="#" className="text-xs underline text-black">add to cart</a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ProductCarousel;