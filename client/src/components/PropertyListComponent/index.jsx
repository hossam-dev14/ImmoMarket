import PropTypes from "prop-types";
import PropertyCard from "../PropertyCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import "swiper/css/pagination";

export default function PropertyListComponent({ properties }) {
  return (
    <div className="container mx-auto ">
      <div className="flex flex-wrap justify-center gap-8">
        <Swiper
          spaceBetween={30}
          slidesPerView={3}
          navigation
          // pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          modules={[Navigation, Pagination, Autoplay]}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="mySwiper w-[17rem] sm:w-[27rem] md:w-[40rem] lg:w-[57rem] xl:w-[70rem]"
        >
          {properties && properties.length > 0 ? (
            properties.map((property) => (
              <SwiperSlide key={property.id}>
                <PropertyCard key={property.id} propsCard={property} />
              </SwiperSlide>
            ))
          ) : (
            <p>No properties founded.</p>
          )}
        </Swiper>
      </div>
    </div>
  );
}

// Define propTypes for your component
PropertyListComponent.propTypes = {
  properties: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      listingType: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      ownerId: PropTypes.object.isRequired,
      views: PropTypes.number,
    })
  ),
  sectionTitle: PropTypes.string,
};
