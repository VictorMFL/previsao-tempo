import axios from "axios";
import React from "react";
import { AiOutlineRight, AiOutlineSearch } from "react-icons/ai";
import { FaWind } from "react-icons/fa";
import { Link } from "react-router-dom";
import Login from "./Components/Carregamento/Login";
import Error from "./Components/Error/Error";

const App = () => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(false);
  const [pesquisa, setPesquisa] = React.useState(cidade);

  var cidade = window.localStorage.getItem("dados");

  const get = async () => {
    try {
      setLogin(true);
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=5bf595a51e7d4feca9900553232202&q=${cidade}&days=7&aqi=yes&alerts=yes`
      );
      const data = response.data;
      setData(data);
    } catch (error) {
      console.log(error);
      window.localStorage.clear();
    } finally {
      setLogin(false);
    }
  };

  React.useEffect(() => {
    get();
    window.localStorage.setItem("dados", cidade);
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    cidade = pesquisa;
    window.localStorage.setItem("dados", cidade);
    get();
  }

  function handleChange({ target }) {
    setPesquisa(target.value);
  }

  if (login) return <Login />;
  if (!data) return <Login />;
  if (cidade === null) return <Error />;

  return (
    <div className={data.current.feelslike_c <= 28 ? "chuva" : "sol"}>
      <header>
        <menu>
          <h1>Previsão do Tempo</h1>
          <form className="pesquisa" onSubmit={handleSubmit}>
            <input onChange={handleChange} placeholder="Digite sua Cidade" />
            <AiOutlineSearch size={32} onClick={handleSubmit} />
          </form>
        </menu>
        <section className="dadosLocais">
          <h1>
            {data.location.country === "Brazil"
              ? "Brasil"
              : data.location.country}
          </h1>
          <h3>{data.location.region}</h3>
          <h4>{data.location.name}</h4>
          <img
            src={data.current.condition.icon}
            alt="Imagem tempo Rio de Janeiro"
          />
          <p>
            {data.current.condition.text === "Sunny"
              ? "Sol"
              : data.current.condition.text === "Partly cloudy"
              ? "Parcialmente nublado"
              : data.current.condition.text === "Clear"
              ? "Céu limpo"
              : data.current.condition.text === "Cloudy"
              ? "Nublado"
              : data.current.condition.text === "Thundery outbreaks possible"
              ? "Possíveis trovoadas"
              : data.current.condition.text === "Patchy rain possible"
              ? "Possivel chuva"
              : data.current.condition.text === "Light rain shower"
              ? "Chuva leve"
              : data.current.condition.text === "Mist"
              ? "Neblina/Névoa"
              : data.current.condition.text === "Overcast"
              ? "Nublado"
              : data.current.condition.text === "Fog"
              ? "Neblina/Névoa"
              : data.current.condition.text === "Moderate or heavy rain shower"
              ? "Pancada de chuva moderada ou forte"
              : data.current.condition.text}
          </p>
          <p className={data.current.feelslike_c >= 30 ? "quente" : "frio"}>
            {data.current.feelslike_c} Cº graus
          </p>
          <p>Última atualização em: {data.current.last_updated}</p>
        </section>
      </header>

      <main>
        {data.forecast.forecastday.map((item, index) => (
          <div key={index} className="dadosSemana">
            <div className="diaSemana">
              <p>{item.date}</p>
            </div>

            <div className="imgTempo">
              <div>
                <img src={item.day.condition.icon} alt="img-tempo" />
              </div>
              <div className="dadosTempo">
                <p>{item.day.avghumidity}%</p>
                {item.day.totalprecip_mm > 0 ? (
                  <p>{item.day.totalprecip_mm}mm</p>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="temperatura">
              <span className="tempMax">{item.day.maxtemp_c}º</span> /{" "}
              <span className="tempMin">{item.day.mintemp_c}º</span>
            </div>

            <div className="imgTempo">
              <div>
                <FaWind />
              </div>
              <div className="dadosTempo">
                <p className="dadosVento">{item.day.maxwind_mph}</p>
                <p className="dadosVento">km/h</p>
              </div>
            </div>

            <div>
              <Link to="/previsao-tempo/horario">
                <AiOutlineRight size={32} />
              </Link>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default App;
