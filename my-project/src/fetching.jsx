import  { useState } from 'react';

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
      <h1 >IP Address Locator</h1>

      <form onSubmit={handleSubmit} >
        <input
          
          type="text"
          value={ipAddress}
          onChange={handleInputChange}
          placeholder="Search for any IP address or domain name"
        
        />
        <button type="submit" >
          search
        </button>
      </form>

      {error && <div >{error}</div>}
      {locationData && (
        <div>
          <h2>Location Details</h2>
          
            <div>
              <h2>IP ADDRESS</h2>
              <h1>{locationData.location.ip}</h1>
            </div>
            <div>
              <h2>LOCATION</h2>
              <h1>{locationData.location.region},{locationData.location.city} {locationData.location.postalCode}</h1>
            </div>
            <div>
              <h2>TIMEZONE </h2>
              <h1>UTC{locationData.location.timezone}</h1>
            </div>
            <div>
              <h2>ISP </h2>
              <h1>{locationData.isp}</h1>
            </div>
        </div>
      )}
    </div>
  );
};

export default IPLocator;
