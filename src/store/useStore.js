import { create } from "zustand";

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

export default useStore;
