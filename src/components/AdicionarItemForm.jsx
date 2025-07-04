import React, { useState } from "react";

const AdicionarItemForm = ({ onAdicionar, responsaveis }) => {
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [unidade, setUnidade] = useState("");
  const [responsavel, setResponsavel] = useState(responsaveis[0] || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdicionar({ nome, quantidade, unidade, responsavel });
    setNome("");
    setQuantidade("");
    setUnidade("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 space-x-2">
      <input
        className="border p-1 rounded"
        placeholder="Item"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />
      <input
        className="border p-1 rounded w-20"
        placeholder="Qtd."
        value={quantidade}
        onChange={(e) => setQuantidade(e.target.value)}
        required
      />
      <input
        className="border p-1 rounded w-20"
        placeholder="Unid."
        value={unidade}
        onChange={(e) => setUnidade(e.target.value)}
        required
      />
      <select
        className="border p-1 rounded"
        value={responsavel}
        onChange={(e) => setResponsavel(e.target.value)}
      >
        {responsaveis.map((r) => (
          <option key={r}>{r}</option>
        ))}
        <option value="">(em falta)</option>
      </select>
      <button
        type="submit"
        className="bg-green-500 text-white px-2 py-1 rounded"
      >
        Adicionar
      </button>
    </form>
  );
};

export default AdicionarItemForm;
