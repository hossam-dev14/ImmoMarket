import PropTypes from "prop-types"; // Import PropTypes
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ propsCard, largCard }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`../properties/${propsCard.id}`)}
      className={`bg-slate-100 w-full shadow-md rounded-lg cursor-pointer hover:shadow-lg ${largCard}`}
    >
      <img
        className="min-h-64 w-full rounded-md object-cover object-center shadow-lg"
        src={propsCard.imageUrl}
        alt="home"
      />
      <div className="p-4">
        <h2 className="text-md text-gray-900 font-medium text-lg title-font mb-2">
          {propsCard.title}
        </h2>
        <div className="flex items-center justify-between">
          <h3 className="tracking-widest text-indigo-500 text-md font-medium title-font">
            {propsCard.listingType}
          </h3>
          <h3 className="">
            {propsCard.price}
            <span> $</span>
          </h3>
        </div>

        <div className="flex items-center bg-gray-200 rounded-md py-2 px-4 mt-4 ">
          <img
            src={propsCard.ownerId.avatar}
            alt={propsCard.ownerId.username}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col justify-center pl-7">
            <h4 className="font-semibold">{propsCard.ownerId.username}</h4>
            <p>+{propsCard.ownerId.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Define propTypes for your component
PropertyCard.propTypes = {
  propsCard: PropTypes.shape({
    id: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    listingType: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    ownerId: PropTypes.object.isRequired,
  }),
  largCard: PropTypes.string,
};

export default PropertyCard;
