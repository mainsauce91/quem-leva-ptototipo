import React, { useEffect } from 'react';
import { create } from 'zustand';
import jsPDF from 'jspdf';
import AdicionarItemForm from './components/AdicionarItemForm';
import ListaPorPessoa from './components/ListaPorPessoa';
import ListaEmFalta from './components/ListaEmFalta';
import { eventoExemplo } from './data/eventoExemplo';

const useStore = create((set) => ({
  eventos: [],
  adicionarEvento: (evento) =>
    set((state) => ({ eventos: [...state.eventos, evento] })),
  atualizarEvento: (eventoAtualizado) =>
    set((state) => ({
      eventos: state.eventos.map((e) =>
        e.id === eventoAtualizado.id ? eventoAtualizado : e
      ),
    })),
}));

const App = () => {
  const { eventos, adicionarEvento, atualizarEvento } = useStore();

  useEffect(() => {
    adicionarEvento(eventoExemplo);
  }, []);

  const handleAdicionarItem = (eventoId, dia, refeicaoNome, novoItem) => {
    const evento = eventos.find((e) => e.id === eventoId);
    const novaRefeicoes = evento.refeicoes.map((r) => {
      if (r.dia !== dia) return r;
      return {
        ...r,
        lista: r.lista.map((ref) => {
          if (ref.nome !== refeicaoNome) return ref;
          return { ...ref, itens: [...ref.itens, novoItem] };
        }),
      };
    });
    atualizarEvento({ ...evento, refeicoes: novaRefeicoes });
  };

  const exportarPDF = (evento) => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text(`Resumo do Evento: ${evento.nome}`, 10, 10);
    let y = 20;

    evento.refeicoes.forEach((r) => {
      doc.setFontSize(12);
      doc.text(`${r.dia}`, 10, y);
      y += 6;
      r.lista.forEach((refeicao) => {
        doc.text(`- ${refeicao.nome}`, 14, y);
        y += 6;
        refeicao.itens.forEach((item) => {
          doc.setFontSize(10);
          doc.text(
            `  • ${item.nome}: ${item.quantidade} ${item.unidade} (${
              item.responsavel || 'em falta'
            })`,
            18,
            y
          );
          y += 5;
          if (y > 280) {
            doc.addPage();
            y = 10;
          }
        });
        y += 2;
      });
      y += 4;
    });

    doc.save(`${evento.nome.replace(/\s+/g, '_')}_resumo.pdf`);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">QuemLeva</h1>
      <ul className="mt-6">
        {eventos.map((evento) => (
          <li key={evento.id} className="border p-4 mb-6 rounded shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-semibold text-lg">{evento.nome}</h2>
                <p>Data: {evento.data}</p>
                <p>Criador: {evento.criador}</p>
                <p>Participantes: {evento.participantes.join(', ')}</p>
              </div>
              <button
                onClick={() => exportarPDF(evento)}
                className="bg-gray-800 text-white px-3 py-1 rounded"
              >
                Exportar PDF
              </button>
            </div>

            {evento.refeicoes.map((r) => (
              <div key={r.dia} className="mt-4">
                <h3 className="font-semibold text-md">{r.dia}</h3>
                {r.lista.map((refeicao) => (
                  <div key={refeicao.nome} className="ml-4 mt-2">
                    <h4 className="font-medium">{refeicao.nome}</h4>
                    <ul className="ml-4 list-disc">
                      {refeicao.itens.map((item, idx) => (
                        <li key={idx}>
                          {item.nome} - {item.quantidade} {item.unidade} —{' '}
                          <strong>{item.responsavel || '(em falta)'}</strong>
                        </li>
                      ))}
                    </ul>
                    <AdicionarItemForm
                      onAdicionar={(novoItem) =>
                        handleAdicionarItem(
                          evento.id,
                          r.dia,
                          refeicao.nome,
                          novoItem
                        )
                      }
                      responsaveis={evento.participantes}
                    />
                  </div>
                ))}
              </div>
            ))}

            <ListaPorPessoa evento={evento} />
            <ListaEmFalta evento={evento} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
