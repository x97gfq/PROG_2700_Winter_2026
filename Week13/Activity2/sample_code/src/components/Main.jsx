import { useState, useEffect } from "react";
import CountryCard from "./CountryCard";

function Main({ user, setUser }) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,population,region,flags")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="main">
      <div className="main-header">
        <h1>Hello, {user}!</h1>
        <button onClick={() => setUser(null)}>Sign Out</button>
      </div>

      {loading ? (
        <p className="loading">Loading countries...</p>
      ) : (
        <div className="card-grid">
          {countries.map((country) => (
            <CountryCard
              key={country.name.common}
              name={country.name.common}
              population={country.population}
              region={country.region}
              flag={country.flags.svg}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Main;
