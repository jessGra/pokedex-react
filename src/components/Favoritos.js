import React, { useEffect, useState } from "react";
import ContentResults from "./ContentResults";

const Favoritos = () => {
  //estado para guardar los pokemones favoritos
  const [favPokemones, setFavPokemones] = useState([]);
  //cuando carga la pag busca el local storage y lo asigna al estado
  useEffect(() => {
    let favPokemonesValue =
      JSON.parse(localStorage.getItem("favPokemones")) || [];
    setFavPokemones(favPokemonesValue);
  }, []);

  //funcion que elimina el pokemón favorito
  const handleDelPokemon = (pokemon) => {
    let confirm = window.confirm(
      `Realmente desea eliminar el Pokemon ${pokemon.nombre} de sus favoritos?`
    );
    if (confirm) {
      let newFavs = favPokemones.filter((el) => el.nombre !== pokemon.nombre);
      //console.log(newFavs);
      setFavPokemones(newFavs);

      //establezco en el storages la variable favSongs con el contenido actual
      localStorage.setItem("favPokemones", JSON.stringify(newFavs));
    } else {
      return;
    }
  };

  return (
    <main className="p-md-3 p-0 text-center mb-5">
      <h1 className="title">FAVORITOS</h1>
      {favPokemones.length ? (
        <ContentResults pokemonesList={favPokemones} handleDelPokemon={handleDelPokemon}/>
      ) : (
        <h5>No tienes favoritos aun.</h5>
      )}
    </main>
  );
};

export default Favoritos;
