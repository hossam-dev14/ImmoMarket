import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import PropertyListComponent from "../../components/PropertyListComponent";
import api from "../../utils/api";

export default function LatestProperties({ sectionTitle }) {
  const [properties, setProperties] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProperties = async () => {
      try {
        const res = await api.get(`/properties/latest`);
        setProperties(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getProperties();
  }, []);

  return (
    <section className="bg-slate-300 body-font container flex items-center justify-center flex-col w-full mx-auto min-h-[30vh] rounded-md shadow-lg py-14">
      <div className=" flex flex-col items-center text-center w-full mb-12 rounded-md ">
        <strong className="text-secondary sm:text-4xl text-3xl font-medium title-font mb-2">
          {sectionTitle}
        </strong>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <span>Loading...</span>
        </div>
      ) : (
        <PropertyListComponent properties={properties} />
      )}
      {/* View all */}
      <div className="flex justify-center items-center mt-12">
        <a
          href="/properties"
          className="text-lg font-semibold text-white hover:text-secondary  transition duration-300 bg-secondary hover:bg-white py-2 px-3 rounded-md shadow-lg"
        >
          View all properties
        </a>
      </div>
    </section>
  );
}

LatestProperties.propTypes = {
  sectionTitle: PropTypes.string,
};
