export const eventoExemplo = {
  id: 1,
  nome: "Fim de Semana em Aljezur",
  data: "2025-08-15",
  criador: "Bruno",
  participantes: ["Filipa", "Rita", "Fernando", "Lopes", "Andreia", "Machado", "Bernardo"],
  refeicoes: [
    {
      dia: "Sexta",
      lista: [
        {
          nome: "Jantar",
          itens: [
            { nome: "Pizzas congeladas", quantidade: "6", unidade: "unid.", responsavel: "" },
            { nome: "Pães de alho congelados", quantidade: "2", unidade: "unid.", responsavel: "Filipa" },
            { nome: "Latas de Atum", quantidade: "2", unidade: "latas", responsavel: "Rita" },
            { nome: "Ovos", quantidade: "4", unidade: "unid.", responsavel: "Fernando" },
            { nome: "Cebola", quantidade: "1", unidade: "unid.", responsavel: "Lopes" },
            { nome: "Pão/Tostas", quantidade: "1", unidade: "embalagem", responsavel: "Filipa" },
            { nome: "Sumo", quantidade: "2", unidade: "garrafas (1,5L)", responsavel: "Fernando" },
            { nome: "Maionese", quantidade: "1", unidade: "frasco", responsavel: "Filipa" },
            { nome: "Sobremesa", quantidade: "1", unidade: "unid.", responsavel: "" }
          ]
        }
      ]
    }
    // Continuação das restantes refeições pode ser adicionada...
  ]
};
