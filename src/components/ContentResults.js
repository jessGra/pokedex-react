import React, { useContext, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ThemeContext from "../contexts/ThemeContext";
import { useModal } from "../hooks/useModal";
import "./ContentResults.css";
import Modal from "./parts/Modal";

const ContentResults = ({
  pokemonesList,
  infoList,
  handleUrlPokemonesList,
  handleSavePokemon,
  handleDelPokemon,
}) => {
  const { theme } = useContext(ThemeContext);

  const [isOpenModalPokemon, openModalPokemon, closeModalPokemon] =
    useModal(false); //modal template

  const [pokemon, setPokemon] = useState({}); //el pokemon que se va a inspeccionar

  const handleViewModal = (pokemon) => {
    setPokemon(pokemon);
    openModalPokemon();
  };

  const handleNext = () => {
    handleUrlPokemonesList(infoList.next);
  };

  const handlePrev = () => {
    handleUrlPokemonesList(infoList.previous);
  };

  //tooltip a mostrar
  const renderTooltip = (msg) => (
    <Tooltip id="simple-tooltip">Presiona para {msg} este pokemón.</Tooltip>
  );
  return (
    <div className="content-results">
      <div className="grid-1-4 mb-5">
        {pokemonesList.map((el) => {
          return (
            <div className="pokemon" key={el.id}>
              <figure onClick={() => handleViewModal(el)}>
                <img src={el.avatar} alt={`imagen ${el.nombre}`} />
              </figure>
              <h5>{el.nombre}</h5>
            </div>
          );
        })}
      </div>
      {infoList.count && (
        <>
          <p className="mb-3">
            Mostrando <b>{infoList.offsetStart}</b> al{" "}
            <b>{infoList.offsetEnd}</b> de un total de <b>{infoList.count}</b>{" "}
            pokemones.
          </p>
          {infoList.previous && (
            <button
              className={`btn float-start btn-outline-${theme === 'dark'? 'light':'dark'}`}
              onClick={handlePrev}
            >
              ◄ Atrás
            </button>
          )}
          {infoList.next && (
            <button
              className={`btn float-end btn-outline-${theme === 'dark'? 'light':'dark'}`}
              onClick={handleNext}
            >
              Siguiente ►
            </button>
          )}
        </>
      )}
      {/* modal que muestra la info de un pokemon */}
      <Modal isOpen={isOpenModalPokemon} closeModal={closeModalPokemon}>
        {pokemon && (
          <article className="card">
            <div className="card-header"></div>
            <div className="card-body">
              {handleSavePokemon && (
                <OverlayTrigger
                  overlay={renderTooltip("guardar")}
                  placement="top"
                >
                  <button
                    className="card-body-fav"
                    onClick={() => handleSavePokemon(pokemon)}
                  >
                    💾
                  </button>
                </OverlayTrigger>
              )}

              {handleDelPokemon && (
                <OverlayTrigger
                  overlay={renderTooltip("eliminar")}
                  placement="top"
                >
                  <button
                    className="card-body-fav"
                    onClick={() => {
                      handleDelPokemon(pokemon);
                      closeModalPokemon();
                    }}
                  >
                    🗑️
                  </button>
                </OverlayTrigger>
              )}

              <img
                src={pokemon.avatar}
                alt={`imagen de ${pokemon.nombre}`}
                className="card-body-img"
              />
              <h1 className="card-body-title">{pokemon.nombre}</h1>
              <p className="card-body-text">
                {pokemon.stats &&
                  pokemon.stats.map((el) => (
                    <span>
                      <b>{el.stat.name}:</b> {el.base_stat} |{" "}
                    </span>
                  ))}
              </p>
            </div>
            <div className="card-footer">
              <div>
                <h3>Altura</h3>
                <p>{pokemon.altura / 10} m</p>
              </div>
              <div>
                <h3>Peso</h3>
                <p>{pokemon.peso / 10} kg</p>
              </div>
              <div>
                <h3>Tipos</h3>
                {pokemon.tipos &&
                  pokemon.tipos.map((el) => (
                    <p className="m-0" key={el.slot}>
                      {el.type.name}
                    </p>
                  ))}
              </div>
            </div>
          </article>
        )}
      </Modal>
    </div>
  );
};

export default ContentResults;
