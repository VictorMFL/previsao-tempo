import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

const Cidade = () => {
  const [pesquisa, setPesquisa] = React.useState("");

  function handleSubmit(event) {
    event.preventDefault();
    let dados = pesquisa;
    window.localStorage.setItem("dados", dados);
  }

  function handleChange({ target }) {
    setPesquisa(target.value);
  }

  return (
    <form className="pesquisa" onSubmit={handleSubmit}>
      <input onChange={handleChange} placeholder="Digite sua Cidade" />
      <AiOutlineSearch size={32} onClick={handleSubmit} />
    </form>
  );
};

export default Cidade;
