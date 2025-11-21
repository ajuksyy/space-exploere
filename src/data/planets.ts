export interface Planet {
  id: string;
  name: string;
  diameter: string;
  dayLength: string;
  distanceFromSun: string;
  temperatureRange: string;
  moons: number;
  textureUrl: string;
  orbitalRadius: number;
  size: number;
  orbitalSpeed: number;
  rotationSpeed: number;
  color: string;
  description: string;
}

export const planets: Planet[] = [
  {
    id: "mercury",
    name: "Mercury",
    diameter: "4,879 km",
    dayLength: "59 Earth days",
    distanceFromSun: "57.9 million km",
    temperatureRange: "-173°C to 427°C",
    moons: 0,
    textureUrl: "/textures/mercury.jpg",
    orbitalRadius: 8,
    size: 1.2,
    orbitalSpeed: 0.04,
    rotationSpeed: 0.01,
    color: "#8C7853",
    description: "The closest planet to the Sun and the smallest in our solar system. It has extreme temperature variations and no atmosphere to speak of."
  },
  {
    id: "venus",
    name: "Venus",
    diameter: "12,104 km",
    dayLength: "243 Earth days",
    distanceFromSun: "108.2 million km",
    temperatureRange: "462°C",
    moons: 0,
    textureUrl: "/textures/venus.jpg",
    orbitalRadius: 12,
    size: 1.8,
    orbitalSpeed: 0.015,
    rotationSpeed: -0.005,
    color: "#FFC649",
    description: "The hottest planet in our solar system, with a thick toxic atmosphere and crushing surface pressure. It rotates backwards."
  },
  {
    id: "earth",
    name: "Earth",
    diameter: "12,756 km",
    dayLength: "24 hours",
    distanceFromSun: "149.6 million km",
    temperatureRange: "-88°C to 58°C",
    moons: 1,
    textureUrl: "/textures/earth.jpg",
    orbitalRadius: 16,
    size: 1.95,
    orbitalSpeed: 0.01,
    rotationSpeed: 0.02,
    color: "#4A90E2",
    description: "Our home planet, the only known celestial body to harbor life. It has liquid water, a protective atmosphere, and a magnetic field."
  },
  {
    id: "mars",
    name: "Mars",
    diameter: "6,792 km",
    dayLength: "24.6 hours",
    distanceFromSun: "227.9 million km",
    temperatureRange: "-153°C to 20°C",
    moons: 2,
    textureUrl: "/textures/mars.jpg",
    orbitalRadius: 20,
    size: 1.5,
    orbitalSpeed: 0.008,
    rotationSpeed: 0.018,
    color: "#CD5C5C",
    description: "The Red Planet, known for its rusty appearance. It has the largest volcano in the solar system and evidence of ancient water flows."
  },
  {
    id: "jupiter",
    name: "Jupiter",
    diameter: "142,984 km",
    dayLength: "9.9 hours",
    distanceFromSun: "778.5 million km",
    temperatureRange: "-110°C",
    moons: 95,
    textureUrl: "/textures/jupiter.jpg",
    orbitalRadius: 28,
    size: 3.6,
    orbitalSpeed: 0.002,
    rotationSpeed: 0.03,
    color: "#D8CA9D",
    description: "The largest planet in our solar system, a gas giant with a Great Red Spot storm larger than Earth. It has a strong magnetic field and many moons."
  },
  {
    id: "saturn",
    name: "Saturn",
    diameter: "120,536 km",
    dayLength: "10.7 hours",
    distanceFromSun: "1.43 billion km",
    temperatureRange: "-140°C",
    moons: 146,
    textureUrl: "/textures/saturn.jpg",
    orbitalRadius: 36,
    size: 3.0,
    orbitalSpeed: 0.0009,
    rotationSpeed: 0.025,
    color: "#FAD5A5",
    description: "Famous for its spectacular ring system made of ice and rock particles. It's a gas giant with a density so low it would float in water."
  },
  {
    id: "uranus",
    name: "Uranus",
    diameter: "51,118 km",
    dayLength: "17.2 hours",
    distanceFromSun: "2.87 billion km",
    temperatureRange: "-195°C",
    moons: 27,
    textureUrl: "/textures/uranus.jpg",
    orbitalRadius: 44,
    size: 2.4,
    orbitalSpeed: 0.0004,
    rotationSpeed: 0.015,
    color: "#4FD0E7",
    description: "An ice giant that rotates on its side, likely due to a collision. It has a unique blue-green color from methane in its atmosphere."
  },
  {
    id: "neptune",
    name: "Neptune",
    diameter: "49,528 km",
    dayLength: "16.1 hours",
    distanceFromSun: "4.5 billion km",
    temperatureRange: "-214°C",
    moons: 16,
    textureUrl: "/textures/neptune.jpg",
    orbitalRadius: 52,
    size: 2.4,
    orbitalSpeed: 0.0001,
    rotationSpeed: 0.02,
    color: "#4166F5",
    description: "The windiest planet with speeds up to 2,100 km/h. It's the farthest planet from the Sun and takes 165 Earth years to orbit."
  }
];

