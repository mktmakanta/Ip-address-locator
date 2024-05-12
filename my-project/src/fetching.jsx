import  { useState } from 'react';
import Map from './fetchinMap';

const IPLocator = () => {
  const [ipAddress, setIPAddress] = useState('');
  const [locationData, setLocationData] = useState(null);
  const [error, setError] = useState(null);

  const fetchLocation = async () => {
    try {
      const apiKey = "at_jglx4vYybuUxKFoIX2waBdvfmNBFz";
      
      const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipAddress}`);
      if (!response.ok) {
        throw new Error('Failed to fetch location data');
      }
      const Location = await response.json();
      setLocationData(Location);
      
    } catch (error) {
      setError(error.message);
    }
  };

  const handleInputChange = (e) => {
    setIPAddress(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchLocation();
  };

  return (
    <div >
      {/* <div className='' style={{ backgroundImage: "url('src/images/image1.png')" }}></div> */}
      <img src="src/images/image1.png" alt="" className='w-screen h-94'/>
      <Map />
      <div className='absolute top-12 left-12 mx-auto'>
      <h2 className='font-bold text-4xl text-center my-5 text-white'>IP Address Tracker</h2>
      <form className='' onSubmit={handleSubmit} >
        <input
          className='h-16 w-96 px-4 mt-6 rounded-l-lg border-gray-300  placeholder-gray-500 text-gray-900 focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 '
          type="text"
          value={ipAddress}
          onChange={handleInputChange}
          placeholder="Search for any IP address or domain name"
        
        />
        <button className='bg-black text-white  h-16 px-4 rounded-r-lg' type="submit" >
          search
        </button>
      </form>
      </div>
      {error && <div >{error}</div>}
      {locationData && (
        <div className='bg-white absolute w-4/5 top-64 mx-auto left-12 rounded-xl py-4 px-6 text-center shadow-md'>
        <div>
        
    
            <div>
              <h2 className='text-xl text-gray-400 font-bold mt-5'>IP ADDRESS</h2>
              <h1  className='text-3xl text-black font-bold'>{ipAddress}</h1>
            </div>
            <div>
              <h2 className='text-xl text-gray-400 font-bold mt-5'>LOCATION</h2>
              <h1 className='text-3xl text-black font-bold'>{locationData.location.region},{locationData.location.city} {locationData.location.postalCode}</h1>
            </div>
            <div>
              <h2 className='text-xl text-gray-400 font-bold mt-5'>TIMEZONE </h2>
              <h1 className='text-3xl text-black font-bold'>UTC{locationData.location.timezone}</h1>
            </div>
            <div>
              <h2 className='text-xl text-gray-400 font-bold mt-5'>ISP </h2>
              <h1 className='text-3xl text-black font-bold mb-6'>{locationData.isp}</h1>
            </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default IPLocator;
