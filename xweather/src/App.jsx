import { useState } from 'react'

import './App.css'

function App() {

  const [search, setSearch] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);

  const API_KEY = '47f558eb839b451bb9f194016243101';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`)
      .then((res) => res.json())
      .then((data) => {
        data.location.name.toLowerCase() === city.toLowerCase()?setSearch(data): alert("Failed to fetch weather data");
        setLoading(false);
      })
      .catch((err) => {
        alert("Failed to fetch weather data");
        console.log("err",err);
        setLoading(false); 
      });
  }

  return (
    <>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='Enter city name' name='city' value={city} onChange={(e) => setCity(e.target.value)} />
          <button type='submit'>Search</button>
        </form>
      </div>
      {loading ? (<p>Loading data...</p>) : (
        <div className='weather-cards'>
          {search && search.location.name.toLowerCase() === city.toLowerCase() ? (
            <>
              <div className="weather-card">
                <h4>Temperature</h4>
                <p>{search.current.temp_c}°C</p>
              </div>
              <div className="weather-card">
                <h4>Humidity</h4>
                <p>{search.current.humidity}%</p>
              </div>
              <div className="weather-card">
                <h4>Condition</h4>
                <p>{search.current.condition.text}</p>
              </div>
              <div className="weather-card">
                <h4>Wind Speed</h4>
                <p>{search.current.wind_kph}kph</p>
              </div>
            </>
          ) : (
            search?(<p>No data available for {city}</p>):(<></>)
          )}
        </div>
      )}
    </>
  )
}

export default App
