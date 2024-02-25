import Player from '../components/player';
import TopSongs from '../components/songs';
import TopArtist from '../components/artist';
import Weekly from '../components/weekly';
import Blend from '../components/blend';
import Search from '../components/search';

const Dashboard = () => {
  return (
    <>
      <section className='w-[95%] sm:w-[90%] md:w-[80%] lg:w-[65%] xl:w-[50%] flex items-center h-[80%] transition duration-400 ease-out'>
        {/* sm:h-[70%] md:h-[75%] lg:h-[80%] xl:h-[85%] */}
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
