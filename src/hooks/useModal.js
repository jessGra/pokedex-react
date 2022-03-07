import { useState, useEffect } from "react";

export const useModal = (initialValue = false) => {
  const [isOpen, setIsOpen] = useState(initialValue);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    //crea una función que verifica cuando se presiona la tecla Escape
    const close = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    //agrega un listener de cuando se presiona algo
    window.addEventListener("keydown", close);

    return () => window.removeEventListener("keydown", close);//termina el listener
  }, []);

  return [isOpen, openModal, closeModal];
};
