import "./Home.css";
import React, { useContext, useEffect, useState } from "react";
import { helpHttp } from "../helpers/helpHttp";
import Loader from "./parts/Loader";
import ContentResults from "./ContentResults";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const initialUrl = "https://pokeapi.co/api/v2/pokemon/";
const initialPokemonesList = [];

const Home = () => {
  //estado para mostrar un loading mientras se consulta el endpoint
  const [loading, setLoading] = useState(false);

  //estado para controlar la pag a la que se va a consultar los pokemones, (pagination)
  const [urlPokemonesList, setUrlPokemonesList] = useState(initialUrl);

  //estado para el listado de pokemones con data
  const [pokemonesList, setPokemonesList] = useState(initialPokemonesList);

  //estado donde se guarda la informacion de paginacion y pokemones totales en el endpoint
  const [infoList, setInfoList] = useState([]);

  //estado donde se guarda la data filtrada
  const [filteredData, setfilteredData] = useState(null);

  //estado para guardar los pokemones favoritos
  const [favPokemones, setFavPokemones] = useState([]);

  const { auth } = useContext(AuthContext);
  //cuando carga la pag busca el local storage y lo asigna al estado
  useEffect(() => {
    let favPokemonesValue =
      JSON.parse(localStorage.getItem("favPokemones")) || [];
    setFavPokemones(favPokemonesValue);
  }, []);

  //cuando cambia el estado de favPokemones se guarda en el storage el cambio
  useEffect(() => {
    //establezco en el storages la variable favSongs con el contenido actual
    localStorage.setItem("favPokemones", JSON.stringify(favPokemones));
  }, [favPokemones]);

  //funcion que guarda el pokemon favorito
  const navigate = useNavigate();
  const handleSavePokemon = (pokemon) => {
    if (!auth) {
      return navigate("/login");
    }
    //verifico que el pokemon no este guardado como fav ya
    let exist = false;
    favPokemones.forEach((el) => {
      if (el === pokemon) {
        exist = true;
        return;
      }
    });

    if (exist) {
      alert("El pokemón ya es favorito");
      return;
    } else {
      alert("Pokemon guardado en favoritos");
      setFavPokemones((favPokemones) => [pokemon, ...favPokemones]);
    }
  };

  //este efecto se va a ejecutar cuando se cargue la pag Home y cuando la variable urlPokemonesList cambie
  useEffect(() => {
    //para no mostrar todos los pokemones a medida que voy haciendo pagination entonces limpio la variable
    setPokemonesList(initialPokemonesList);

    //creo una función async para realizar la consulta de la data
    const getPokemones = async () => {
      setfilteredData(null);
      setInfoList([]);
      setLoading(true);

      //aqui obtengo el listado de los pokemones y destructuro el contenido para infoList
      const resp = await helpHttp().get(urlPokemonesList);
      //esto es para cuando haga consultas por categorías
      if (!resp.results) {
        let newResults = [];
        resp.pokemon.slice(0, 30).forEach((el) => {
          newResults = [...newResults, el.pokemon];
        });
        resp.results = newResults;
      }

      //extraccion del offset para la pagination
      if (resp.next) {
        const startIndex = resp.next.indexOf("offset="),
          endIndex = resp.next.indexOf("&");

        const offsetEnd = resp.next.slice(startIndex + 7, endIndex),
          offsetStart = offsetEnd - 20;

        setInfoList({
          count: resp.count,
          next: resp.next,
          previous: resp.previous,
          offsetStart,
          offsetEnd,
        });
      }

      /* resumen
       *con el valor de results se hace una iteración y hace una consulta por cada
       *pokemón traído, para poder obtener la imagen y demás información
       */
      resp.results.forEach(async (el) => {
        //resultado de la consulta al endpoint por la información del pokemón y destructuro la info que necesito
        let { abilities, height, id, name, sprites, types, weight, stats } =
          await helpHttp().get(el.url);

        //variable temporal para ir haciendo el arreglo de pokemones a mostrar
        let pokemon = {
          habilidades: abilities,
          altura: height,
          tipos: types,
          peso: weight,
          stats,
          id: id,
          nombre: name,
          avatar: sprites.front_default,
        };

        //guardo el objeto listadoPokemones
        setPokemonesList((pokemonesList) => [...pokemonesList, pokemon]);
      });

      setLoading(false); //cierra el loading
    };

    getPokemones(); //ejecuto la función async
  }, [urlPokemonesList]);

  const handleUrlPokemonesList = (url) => {
    setUrlPokemonesList(url);
  };

  //funcion para litrado on typing
  const handleSearch = (e) => {
    let value = e.target.value.toLowerCase();

    let newData = pokemonesList.filter((el) => {
      return el.nombre.search(value) !== -1;
    });

    setfilteredData(newData);
  };

  //función para realizar la consulta de pokemones por cat
  const handleCategoria = (cat) => {
    if (cat) {
      setUrlPokemonesList(`https://pokeapi.co/api/v2/type/${cat}/`);
    }else{
      setUrlPokemonesList(initialUrl);
    }
  };

  return (
    <main className="p-md-3 p-0 text-center mb-5">
      <h1 className="title">POKEDEX</h1>
      {/* formulario de filtrado */}
      <div className="nosubmit">
        <input
          className="nosubmit"
          type="search"
          placeholder="Filtrar Pokemon"
          onKeyDown={handleSearch}
        ></input>
      </div>
      <div className="categories-buttons">
        <button onClick={() => handleCategoria("normal")}>Normal</button>
        <button onClick={() => handleCategoria("fighting")}>Luchador</button>
        <button onClick={() => handleCategoria("flying")}>Volador</button>
        <button onClick={() => handleCategoria("fire")}>Fuego</button>
        <button onClick={() => handleCategoria(null)}>todos</button>
      </div>
      {/* loading */}
      {loading && <Loader />}

      {/* si no esta activado el loading y existe pokemonesList renderiza los resultados */}
      {!loading && pokemonesList && (
        <ContentResults
          pokemonesList={filteredData || pokemonesList}
          infoList={infoList}
          handleUrlPokemonesList={handleUrlPokemonesList}
          handleSavePokemon={handleSavePokemon}
        />
      )}
    </main>
  );
};

export default Home;
