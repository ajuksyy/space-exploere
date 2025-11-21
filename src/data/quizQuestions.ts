export type Difficulty = "easy" | "medium" | "hard";

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: Difficulty;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "1",
    question: "Which planet is closest to the Sun?",
    options: ["Venus", "Mercury", "Earth", "Mars"],
    correctAnswer: 1,
    difficulty: "easy",
    explanation: "Mercury is the closest planet to the Sun, orbiting at an average distance of 57.9 million kilometers."
  },
  {
    id: "2",
    question: "What is the largest planet in our solar system?",
    options: ["Saturn", "Jupiter", "Neptune", "Uranus"],
    correctAnswer: 1,
    difficulty: "easy",
    explanation: "Jupiter is the largest planet in our solar system, with a diameter of 142,984 km - more than 11 times Earth's diameter."
  },
  {
    id: "3",
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
    difficulty: "easy",
    explanation: "Mars is called the Red Planet due to iron oxide (rust) on its surface, giving it a distinctive reddish appearance."
  },
  {
    id: "4",
    question: "How many moons does Earth have?",
    options: ["0", "1", "2", "3"],
    correctAnswer: 1,
    difficulty: "easy",
    explanation: "Earth has one natural satellite - the Moon, which is the fifth largest moon in the solar system."
  },
  {
    id: "5",
    question: "Which planet has the most moons?",
    options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
    correctAnswer: 1,
    difficulty: "easy",
    explanation: "Saturn has 146 known moons, the most of any planet in our solar system, including its largest moon Titan."
  },
  {
    id: "6",
    question: "What is the hottest planet in our solar system?",
    options: ["Mercury", "Venus", "Earth", "Mars"],
    correctAnswer: 1,
    difficulty: "medium",
    explanation: "Despite being farther from the Sun than Mercury, Venus is the hottest planet due to its thick atmosphere creating a runaway greenhouse effect, with surface temperatures around 462°C."
  },
  {
    id: "7",
    question: "Which planet rotates on its side?",
    options: ["Neptune", "Uranus", "Saturn", "Jupiter"],
    correctAnswer: 1,
    difficulty: "medium",
    explanation: "Uranus rotates on its side at a 98-degree angle, likely due to a massive collision in its past. This gives it extreme seasonal variations."
  },
  {
    id: "8",
    question: "What are Saturn's rings primarily made of?",
    options: ["Gas", "Ice and rock particles", "Dust", "Metal fragments"],
    correctAnswer: 1,
    difficulty: "medium",
    explanation: "Saturn's rings are primarily composed of ice particles and rocky debris, ranging from tiny grains to house-sized chunks."
  },
  {
    id: "9",
    question: "How long does it take Neptune to orbit the Sun?",
    options: ["84 Earth years", "165 Earth years", "248 Earth years", "30 Earth years"],
    correctAnswer: 1,
    difficulty: "medium",
    explanation: "Neptune takes approximately 165 Earth years to complete one orbit around the Sun, making it the planet with the longest orbital period."
  },
  {
    id: "10",
    question: "Which planet has the shortest day?",
    options: ["Mercury", "Jupiter", "Saturn", "Mars"],
    correctAnswer: 1,
    difficulty: "medium",
    explanation: "Jupiter has the shortest day of any planet in our solar system, completing one rotation in just 9.9 hours."
  },
  {
    id: "11",
    question: "What is the Great Red Spot on Jupiter?",
    options: ["A volcano", "A massive storm", "A moon", "An ocean"],
    correctAnswer: 1,
    difficulty: "medium",
    explanation: "The Great Red Spot is a massive storm that has been raging on Jupiter for at least 400 years. It's larger than Earth itself."
  },
  {
    id: "12",
    question: "Which planet has no atmosphere?",
    options: ["Mercury", "Mars", "Venus", "All planets have atmospheres"],
    correctAnswer: 0,
    difficulty: "medium",
    explanation: "Mercury has virtually no atmosphere - only a very thin exosphere. This is why it experiences extreme temperature variations."
  },
  {
    id: "13",
    question: "What is the average distance from Earth to the Sun called?",
    options: ["A light-year", "An astronomical unit (AU)", "A parsec", "A solar radius"],
    correctAnswer: 1,
    difficulty: "hard",
    explanation: "An astronomical unit (AU) is the average distance from Earth to the Sun, approximately 149.6 million kilometers. It's used as a standard unit for measuring distances within our solar system."
  },
  {
    id: "14",
    question: "Which planet has retrograde rotation (rotates backwards)?",
    options: ["Uranus", "Venus", "Neptune", "Mars"],
    correctAnswer: 1,
    difficulty: "hard",
    explanation: "Venus rotates backwards (retrograde rotation), meaning the Sun rises in the west and sets in the east. It takes 243 Earth days to complete one rotation."
  },
  {
    id: "15",
    question: "What causes Mars' red color?",
    options: ["Volcanic activity", "Iron oxide (rust)", "Atmospheric composition", "Surface temperature"],
    correctAnswer: 1,
    difficulty: "hard",
    explanation: "Mars appears red due to iron oxide (rust) covering its surface. This iron-rich dust gives the planet its characteristic reddish hue."
  },
  {
    id: "16",
    question: "Which planet has the strongest winds in the solar system?",
    options: ["Jupiter", "Saturn", "Neptune", "Uranus"],
    correctAnswer: 2,
    difficulty: "hard",
    explanation: "Neptune has the strongest winds in the solar system, reaching speeds up to 2,100 km/h (1,300 mph), nearly supersonic speeds."
  },
  {
    id: "17",
    question: "What is the name of Jupiter's largest moon?",
    options: ["Europa", "Io", "Ganymede", "Callisto"],
    correctAnswer: 2,
    difficulty: "hard",
    explanation: "Ganymede is Jupiter's largest moon and is actually larger than the planet Mercury. It's the only moon in the solar system known to have its own magnetic field."
  },
  {
    id: "18",
    question: "Which planet has the most extreme temperature variations?",
    options: ["Mercury", "Venus", "Mars", "Jupiter"],
    correctAnswer: 0,
    difficulty: "hard",
    explanation: "Mercury has the most extreme temperature variations, ranging from -173°C at night to 427°C during the day, a difference of 600°C, due to its lack of atmosphere."
  },
  {
    id: "19",
    question: "What is the composition of Jupiter and Saturn primarily?",
    options: ["Rock and metal", "Hydrogen and helium", "Ice and rock", "Carbon and nitrogen"],
    correctAnswer: 1,
    difficulty: "hard",
    explanation: "Jupiter and Saturn are gas giants primarily composed of hydrogen and helium, similar to the composition of the Sun, but without enough mass to ignite nuclear fusion."
  },
  {
    id: "20",
    question: "Which planet is the densest in our solar system?",
    options: ["Mercury", "Venus", "Earth", "Mars"],
    correctAnswer: 2,
    difficulty: "hard",
    explanation: "Earth is the densest planet in our solar system, with an average density of 5.52 g/cm³, due to its large iron-nickel core."
  },
  {
    id: "21",
    question: "What is the Kuiper Belt?",
    options: ["A ring around Saturn", "A region beyond Neptune with icy objects", "Jupiter's asteroid belt", "A cloud around the Sun"],
    correctAnswer: 1,
    difficulty: "hard",
    explanation: "The Kuiper Belt is a region beyond Neptune filled with icy objects, dwarf planets, and comets. Pluto is located in this region."
  },
  {
    id: "22",
    question: "Which planet has the longest day?",
    options: ["Venus", "Mercury", "Mars", "Jupiter"],
    correctAnswer: 0,
    difficulty: "hard",
    explanation: "Venus has the longest day of any planet, taking 243 Earth days to complete one rotation on its axis, which is longer than its year (225 Earth days)."
  }
];

