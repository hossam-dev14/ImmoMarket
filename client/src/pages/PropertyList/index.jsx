import Layout from "../../Layout/DashLayout";
import MyListing from "../../components/MyListing";

const PropertyList = () => {
  return (
    <Layout>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto h-[78vh]">
          <div className="flex flex-col text-center w-full mb-16">
            <strong className="text-secondary sm:text-3xl text-2xl font-bold title-font mb-2">
              My Properties
            </strong>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Welcome to your dashboard!
            </p>
          </div>
          <MyListing />
        </div>
      </section>
    </Layout>
  );
};

export default PropertyList;
