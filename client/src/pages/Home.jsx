import Hero from '@components/Hero';
import HomeFound from '@components/HomeFound';
import ServiceCard from '@/components/ServiceCard';
const Home = () => {
  

  return (
    <div className='sm:ml-[3rem]'>
      <Hero />
      <HomeFound />
      <ServiceCard />
    </div>
  )
};

export default Home;
