export type Answer = {
  body: string;
  points: number;
};

export type Question = {
  body: string;
  answers: Answer[];
};

export function get_game(): Question[] {
  return [
    {
      body: "Numiti ceva ce o persoana ar tine in beci",
      answers: [
        { body: "Vin", points: 45 },
        { body: "Conserve de mancare", points: 19 },
        { body: "Cadavre", points: 8 }, 
        { body: "Unelte de gradina", points: 7 }, 
        { body: "Gratar", points: 7 }, 
        { body: "Muraturi", points: 6 }, 
        { body: "Fructe", points: 5 }, 
        { body: "Soareci", points: 3 },
      ],
    },
    {
      body: "Numiti ceva ce creste mai rapid decat v-ati dori",
      answers: [
        { body: "Parul", points: 48 },
        { body: "Iarba", points: 16 }, 
        { body: "Copiii", points: 13 }, 
        { body: "Burta/Greutatea", points: 12 }, 
        { body: "Unghiile", points: 7 }, 
        { body: "Datoriile", points: 4 }, 
        { body: "empty", points: 0 }, 
        { body: "empty", points: 0 },
      ],
    },
    {
      body: "Numiti un lucru care are o gaura in mijloc",
      answers: [
        { body: "Covrigul", points: 30 }, 
        { body: "Inelul", points: 22 }, 
        { body: "Colacul", points: 17 }, 
        { body: "Gogoasa", points: 12 }, 
        { body: "Roata", points: 10 }, 
        { body: "Piulita", points: 5 }, 
        { body: "Toaleta", points: 4 }, 
        { body: "empty", points: 0 },
      ],
    },
    {
      body: "Daca un magazin ar vinde numai soti, majoritatea oamenilor ar cumpara unul care are ce?",
      answers: [
        { body: "Job", points: 72 }, 
        { body: "Personalitate", points: 42 }, 
        { body: "Simtul umorului", points: 24 }, 
        { body: "Garantie", points: 22 }, 
        { body: "Bani", points: 16 }, 
        { body: "Fund fain", points: 14 }, 
        { body: "Par in cap", points: 8 }, 
        { body: "Burta", points: 2 },
      ],
    },
    {
      body: "Numiti un loc in care daca barbatul si-ar duce sotia pentru aniversarea ei, ea ar fi suparata",
      answers: [
        { body: "Clubul de striptease", points: 68 }, 
        { body: "Marriage counselling/psiholog", points: 40 }, 
        { body: "Acasa la parintii lui", points: 30 }, 
        { body: "La reparat masina/motorul", points: 22 }, 
        { body: "Petrecerea burlacilor", points: 18 }, 
        { body: "Casa bantuita", points: 14 }, 
        { body: "Pescuit", points: 8 }, 
        { body: "empty", points: 0 },
      ],
    },
    {
      body: "Numiti un cadou care ar putea fi jignitor",
      answers: [
        { body: "Abonament la sala", points: 96 }, 
        { body: "Deodorant/Sapun", points: 78 }, 
        { body: "Pasta/Periuta de dinti", points: 45 }, 
        { body: "Carte de self-improvement", points: 30 }, 
        { body: "Carte de gatit", points: 24 }, 
        { body: "Cadouri reimpachetate", points: 18 }, 
        { body: "Obiecte fake", points: 6 }, 
        { body: "Cutite", points: 3 },
      ],
    },
  ];
}
