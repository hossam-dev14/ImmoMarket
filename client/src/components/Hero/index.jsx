import Search from "../Search";
import bgImg from '/src/assets/images/bg.png'

const Hero = () => {
  return (
  <section className="h-[70vh] bg-gray-100">
      <div className={`paddings innerWidth flex justify-center items-center bg-center bg-cover bg-no-repeat h-full w-full `} style={{backgroundImage: `url(${bgImg})`}}>

        <div className="flex flex-col justify-center items-start py-4 mt-20 w-1/2">
          <div className="hero-title">
            <h1 className="text-4xl font-bold text-gray-200">
              Discover Most Suitable <br />
              Properties in One Place
            </h1>
          </div>

          <div className='w-full mt-8 mb-20'>
            <Search />
          </div>
        </div>

      </div>
  </section>
  );
};

export default Hero;