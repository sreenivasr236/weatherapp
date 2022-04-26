import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./components/card/card";
import { HashLoader } from "react-spinners";
import cities from "./utils/in.json";
// import Select from "react-select";

function App() {
  const [lat, setlat] = useState("");
  const [long, setlong] = useState("");
  const [loader, setloader] = useState(false);
  const [info, setinfo] = useState([]);
  const [selected,setselected]= useState("")

  const getCurrentPosition = () => {
    setloader(true);
    navigator.geolocation.getCurrentPosition(function (position) {
      setlat(position.coords.latitude);
      setlong(position.coords.longitude);
      setloader(false);
    });
  };


  const refreshpage = () => {
    window.location.reload();
  };

  const cityHandler = (e) => {
    setselected(e.target.value)
    const targetedobject = cities.filter((i) => i.city == e.target.value);
    const split = Object.assign({}, ...targetedobject);
    weatherinfo(split.lat, split.lng);
  };

  const weatherinfo = async (x, y) => {
    if (x && y !== "") {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${x}&lon=${y}&appid=25e03379a3e169dc8b5e529fc741a7b8&units=metric`;
      try {
        const resp = await axios.get(url);
        setinfo(resp.data);
      } catch (err) {
        console.error(err);
      }
    } else {
      setloader(true);
    }
  };

  useEffect(() => {
    getCurrentPosition();
    weatherinfo(lat, long);
  }, [lat, long]);

  return (
    <div className="App">
      {(loader && (
        <div className="loader">
          {" "}
          <HashLoader color={"#f0483e"} margin={2} size={150} />
        </div>
      )) || (
        <>
          <select id="Search" onChange={(e) => cityHandler(e)}  value={selected}>
            <option>Search</option>
            {cities.map((info) => (
              <option lat={info.lat} long={info.lng} value={info.city}>
                {info.city}
              </option>
            ))}
          </select>
          <Card info={info} browserdetected={true} refreshpage={refreshpage} />
        </>
      )}
    </div>
  );
}

export default App;
