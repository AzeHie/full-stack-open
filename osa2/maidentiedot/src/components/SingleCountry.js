import "./SingleCountry.css";

const SingleCountry = ({ country }) => {
  const image = country.flags.png;

  return (
    <div className="singlecountry__container">
      <h1>{country.name.common}</h1>
      <span>capital {country.capital}</span>
      <span>area {country.area}</span>
      <h3>languages:</h3>
      <ul>
        {Object.keys(country.languages).map((language) => (
          <li key={language}>{country.languages[language]}</li>
        ))}
      </ul>
      <img className="singlecountry__flag" src={image} alt="flag of country" />
    </div>
  );
};

export default SingleCountry;
