// 📁 src/CollectionCarousel.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const products = [
  {
    id: 1,
    name: 'Collection : Fruits Rouges',
    // price: '3500 FCFA',
    img: 'https://i.imgur.com/c6iy3yi.jpeg',
    available: true,
  },
  {
    id: 2,
    name: 'Eau de parfum - Fresh Citrus',
    // price: '3500 FCFA',
    img: 'https://i.imgur.com/maDvu5B.jpeg',
    available: false,
  },
  {
    id: 3,
    name: 'Eau de parfum - Jasmine Dream',
    // price: '3500 FCFA',
    img: 'https://i.imgur.com/n2dh1h9.jpeg',
    available: true,
  },
  {
    id:4 ,
    name: 'Eau de parfum - Rose Essence',
    // price: '3500 FCFA',
    img: 'https://i.imgur.com/YfCsziX.jpeg',
    available: true,
  },
  {
    id: 5,
    name: 'Eau de parfum - Rose Essence',
    // price: '3500 FCFA',
    img: 'https://i.imgur.com/uCavJDR.jpeg',
    available: true,
  },
  {
    id: 6,
    name: 'Eau de parfum - Rose Essence',
    // price: '3500 FCFA',
    img: 'https://i.imgur.com/E2LHGP8.jpeg',
    available: true,
  },
];

const ProductCarousel = () => {
  return (
    <section className="border-y py-8 px-4">
      <h3 className="text-lg font-semibold mb-4 text-center">Explore Our Collections</h3>
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
              {/* <a href="#" className="text-xs underline text-black">add to cart</a> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ProductCarousel;