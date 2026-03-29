function CountryCard({ name, population, region, flag }) {
  return (
    <div className="card">
      <img src={flag} alt={`Flag of ${name}`} />
      <h3>{name}</h3>
      <p><strong>Region:</strong> {region}</p>
      <p><strong>Population:</strong> {population.toLocaleString()}</p>
    </div>
  );
}

export default CountryCard;
