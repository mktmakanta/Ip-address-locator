import  { useState } from 'react';

const IPLocator = () => {
  const [ipAddress, setIPAddress] = useState('');
  const [locationData, setLocationData] = useState(null);
  const [error, setError] = useState(null);

  const fetchLocation = async () => {
    try {
      const apiKey = "at_jglx4vYybuUxKFoIX2waBdvfmNBFz";
      const response = await fetch(`https://geo.ipify.org/api/v2/country?apiKey=${apiKey}&ipAddress=${ipAddress}`);
      if (!response.ok) {
        throw new Error('Failed to fetch location data');
      }
      const data = await response.json();
      setLocationData(data);
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
      <h1 >IP Address Locator</h1>
      <form onSubmit={handleSubmit} >
        <input
          
          type="text"
          value={ipAddress}
          onChange={handleInputChange}
          placeholder="Search for any IP address or domain name"
        
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          search
        </button>
      </form>
      {error && <div >{error}</div>}
      {locationData && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Location Details</h2>
          <ul>
            <li>IP Address: {locationData.ip}</li>
            <li>Country: {locationData.country_name}</li>
            <li>Region: {locationData.region}</li>
            <li>City: {locationData.city}</li>
            <li>Postal Code: {locationData.postal}</li>
            <li>Latitude: {locationData.latitude}</li>
            <li>Longitude: {locationData.longitude}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default IPLocator;
