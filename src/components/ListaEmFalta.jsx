import React from "react";

const ListaEmFalta = ({ evento }) => {
  const emFalta = [];

  evento.refeicoes.forEach((r) =>
    r.lista.forEach((refeicao) =>
      refeicao.itens.forEach(({ nome, quantidade, unidade, responsavel }) => {
        if (!responsavel) {
          emFalta.push({ nome, quantidade, unidade });
        }
      })
    )
  );

  if (emFalta.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="font-bold text-md text-red-600">🚨 Em Falta</h3>
      <ul className="list-disc ml-4">
        {emFalta.map((item, idx) => (
          <li key={idx}>
            {item.nome} — {item.quantidade} {item.unidade}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaEmFalta;
