import axios from "axios";
import React from "react";
import styles from "./Horario.module.css";
import { AiOutlineLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import Login from "./Carregamento/Login";
import Error from "./Error/Error";

const Horario = () => {
  const [hora, setHora] = React.useState(null);
  const [login, setLogin] = React.useState(false);

  let pesquisa = window.localStorage.getItem("dados");
  const get = async () => {
    try {
      setLogin(true);
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=5bf595a51e7d4feca9900553232202&q=${pesquisa}&days=7&aqi=yes&alerts=yes`
      );
      const data = response.data;
      setHora(data);
    } catch (error) {
      window.localStorage.clear();
      console.log(error);
    } finally {
      setLogin(false);
    }
  };

  React.useEffect(() => {
    get();
  }, [pesquisa]);

  if (login) return <Login />;
  if (pesquisa === null) return <Error />;
  if (hora === null) return null;
  return (
    <div className={styles.container}>
      <Link to="/previsao-tempo/">
        <AiOutlineLeft size={32} />
      </Link>
      <h2 className={styles.h2}>{hora.location.region}</h2>
      <h3 className={styles.h2}>{hora.location.name}</h3>
      <h3>Dados da Semana</h3>
      {hora &&
        hora.forecast.forecastday.map((item, index) => (
          <div key={index}>
            <div>
              {item.hour.map((item, index) => (
                <div key={index} className={styles.itens}>
                  <p>{item.time}</p>
                  <div className={styles.img}>
                    <img
                      src={item.condition.icon}
                      alt="icone-tempo"
                      className={styles.icone}
                    />
                    <p>
                      {item.condition.text === "Sunny"
                        ? "Sol"
                        : item.condition.text === "Partly cloudy"
                        ? "Parcialmente nublado"
                        : item.condition.text === "Clear"
                        ? "Céu limpo"
                        : item.condition.text === "Cloudy"
                        ? "Nublado"
                        : item.condition.text === "Thundery outbreaks possible"
                        ? "Possíveis trovoadas"
                        : item.condition.text === "Patchy rain possible"
                        ? "Possivel chuva"
                        : item.condition.text === "Light rain shower"
                        ? "Chuva leve"
                        : item.condition.text === "Mist"
                        ? "Neblina/Névoa"
                        : item.condition.text === "Overcast"
                        ? "Nublado"
                        : item.condition.text === "Fog"
                        ? "Neblina/Névoa"
                        : item.condition.text ===
                          "Moderate or heavy rain shower"
                        ? "Pancada de chuva moderada ou forte"
                        : item.condition.text}
                    </p>
                  </div>

                  <p>{item.temp_c}ªC</p>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Horario;
