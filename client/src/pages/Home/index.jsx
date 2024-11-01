// import { useState, useEffect } from "react";
import Layout from "../../Layout";
import bgImg from "/src/assets/images/bg.png";
// import Search from "../../components/Search";
// import api from "../../utils/api";
import LatestProperties from "../../components/LatestProperties";
import PopularProperties from "../../components/PopularProperties";

export default function Home() {
  // const [properties, setProperties] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [searchTerm, setSearchTerm] = useState("");

  // useEffect(() => {
  //   const getProperties = async () => {
  //     try {
  //       const res = await api.get(`/properties/`, {
  //         params: { search: searchTerm },
  //       });
  //       setProperties(res.data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error(error);
  //       setLoading(false);
  //     }
  //   };
  //   getProperties();
  // }, [searchTerm]);

  return (
    <Layout>
      <main className="text-gray-600 body-font">
        <div
          className={`w-full h-[90vh] flex justify-center items-center bg-center bg-cover bg-no-repeat bg-gray-100`}
          style={{ backgroundImage: `url(${bgImg})` }}
        >
          <div className="flex flex-col justify-center items-start py-4 mt-16 w-1/2">
            <div className="hero-title">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold lg:font-bold text-gray-200">
                Discover Most Suitable <br />
                Properties in One Place
              </h1>
            </div>
            {/* <Search /> */}
            <div className="w-full max-w-[43rem] min-w-60 mt-8 mb-16">
              {/* <Search setSearchTerm={setSearchTerm} />{" "} */}
              {/* Pass setSearchTerm to the Search component */}
            </div>
          </div>
        </div>

        <div className="pt- px-4 md:px-10 pb-10 my-16">
          {/* Recent Propereties */}
          <LatestProperties sectionTitle="Recent Properties" />
          {/* View all */}
          {/* <div className="flex justify-center items-center mt-12">
            <a
              href="/properties"
              className="text-lg font-semibold text-white hover:text-secondary  transition duration-300 bg-secondary hover:bg-white py-2 px-3 rounded-md shadow-lg"
            >
              View all properties
            </a>
          </div> */}
        </div>

        <div className="pt- px-4 md:px-10 pb-10 my-16">
          {/* Popular Propereties */}
          <PopularProperties sectionTitle="Popular Properties" />
        </div>
      </main>
    </Layout>
  );
}

/** 
  _Search: Buy/Rent , I'm looking to (buy Apartments), Location(Berlin, Germany), Price Range($10,0000-$200,000) 
  _Buy, Rent & Sell 
  _Why Choose Us
  _Meet Our Agents 
  _Client Review
*/
