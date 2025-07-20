import Player from '../components/player';
import TopSongs from '../components/songs';
import TopArtist from '../components/artist';
import Weekly from '../components/weekly';
import Blend from '../components/blend';
import Search from '../components/search';

const Dashboard = () => {
  return (
    <>
      <section className='w-[95%] sm:w-[90%] md:w-[80%] lg:w-[65%] xl:w-[50%] flex items-center h-[50%] sm:h-[80%] sm:mt-0 mt-24 transition duration-400 ease-out'>
        <article className='w-[33%] h-[100%] grid grid-rows-3 ml-1 mt-3 mr-1'>
          <Blend />
          <Weekly />
          <Search />
        </article>
        <article className='w-[67%] h-[100%]' style={{ transition: '1s ease' }}>
          <Player height={30} />
          <div className='w-[100%] h-[70%] flex'>
            <TopSongs />
            <TopArtist />
          </div>
        </article>
      </section>
    </>
  );
};

export default Dashboard;
