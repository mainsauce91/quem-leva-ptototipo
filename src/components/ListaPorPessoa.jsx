import React from "react";

const ListaPorPessoa = ({ evento }) => {
  const mapa = {};

  evento.refeicoes.forEach((r) =>
    r.lista.forEach((refeicao) =>
      refeicao.itens.forEach(({ nome, quantidade, unidade, responsavel }) => {
        if (responsavel) {
          if (!mapa[responsavel]) mapa[responsavel] = [];
          mapa[responsavel].push({ nome, quantidade, unidade });
        }
      })
    )
  );

  return (
    <div className="mt-6">
      <h3 className="font-bold text-md">🧍 Lista por Pessoa</h3>
      {Object.entries(mapa).map(([responsavel, itens]) => (
        <div key={responsavel} className="mt-2 ml-4">
          <p className="font-semibold">{responsavel}</p>
          <ul className="list-disc ml-4">
            {itens.map((item, idx) => (
              <li key={idx}>
                {item.nome} — {item.quantidade} {item.unidade}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ListaPorPessoa;
