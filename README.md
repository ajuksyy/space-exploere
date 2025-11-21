# 🚀 Space Explorer - Solar System Exploration Website

A visually stunning solar system exploration website built with Next.js, Three.js, and React Three Fiber. Explore planets in 3D, learn about their characteristics, and test your knowledge with interactive quizzes.

## ✨ Features

- **Interactive 3D Solar System**: Real-time 3D visualization with smooth orbital animations
- **Planet Details**: Click any planet to view detailed information (diameter, distance, temperature, moons, etc.)
- **Educational Quiz**: Multiple-choice questions with difficulty levels and score tracking
- **Smooth Animations**: Framer Motion animations for UI transitions
- **Dark Space Theme**: Beautiful dark theme with animated starfield background
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Three.js** / **React Three Fiber** for 3D graphics
- **Framer Motion** for animations
- **Tailwind CSS** for styling
- **Zustand** for state management
- **Radix UI** (shadcn/ui components) for UI primitives

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd space-app
```

2. Install dependencies:
```bash
npm install
```

3. Add planet textures (optional):
   - Download planet textures from NASA or other sources
   - Place them in `public/textures/` directory with these names:
     - `mercury.jpg`
     - `venus.jpg`
     - `earth.jpg`
     - `mars.jpg`
     - `jupiter.jpg`
     - `saturn.jpg`
     - `uranus.jpg`
     - `neptune.jpg`
   
   **Note**: The app will work without textures (using colored spheres), but textures make it more realistic.

   **Recommended sources for textures**:
   - [Solar System Scope](https://www.solarsystemscope.com/textures/)
   - [NASA 3D Resources](https://nasa3d.arc.nasa.gov/models)
   - [Planet Textures](https://www.solarsystemscope.com/textures/)

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
space-app/
├── src/
│   ├── app/
│   │   ├── about/          # About page
│   │   ├── contact/        # Contact page
│   │   ├── solar-system/  # Main solar system page
│   │   ├── layout.tsx      # Root layout with Header and QuizDialog
│   │   ├── page.tsx        # Home page
│   │   └── globals.css     # Global styles
│   ├── components/
│   │   ├── ui/             # shadcn/ui components
│   │   ├── Header.tsx      # Navigation header
│   │   ├── Planet.tsx      # 3D Planet component
│   │   ├── PlanetPanel.tsx # Planet detail panel
│   │   ├── QuizDialog.tsx  # Quiz modal dialog
│   │   ├── QuizQuestion.tsx # Quiz question component
│   │   ├── SolarSystemScene.tsx # Main 3D scene
│   │   └── StarsBackground.tsx  # Animated stars
│   ├── data/
│   │   ├── planets.ts      # Planet data
│   │   └── quizQuestions.ts # Quiz questions
│   ├── lib/
│   │   └── utils.ts        # Utility functions
│   └── store/
│       ├── planetStore.ts  # Planet state management
│       └── quizStore.ts    # Quiz state management
├── public/
│   └── textures/           # Planet texture images (add your own)
└── package.json
```

## 🎮 Usage

### Exploring Planets

1. Navigate to the **Solar System** page
2. Use mouse to rotate, zoom, and pan the camera
3. Click on any planet to zoom in and view details
4. View planet information in the side panel

### Taking the Quiz

1. Click the **Quiz** button in the header
2. Answer multiple-choice questions
3. View explanations after each answer
4. See your final score at the end
5. Restart the quiz to try again

## 🎨 Customization

### Adding More Planets

Edit `src/data/planets.ts` to add more celestial bodies or modify existing data.

### Adding Quiz Questions

Edit `src/data/quizQuestions.ts` to add more questions. Each question should have:
- `id`: Unique identifier
- `question`: The question text
- `options`: Array of 4 answer options
- `correctAnswer`: Index of correct answer (0-3)
- `difficulty`: "easy", "medium", or "hard"
- `explanation`: Explanation of the correct answer

### Styling

The app uses Tailwind CSS. Modify `src/app/globals.css` for theme customization.

## 🚀 Deployment

Build for production:

```bash
npm run build
npm start
```

Deploy to Vercel:

```bash
vercel
```

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Credits

- Planet data sourced from NASA and ESA
- Built with modern web technologies
- Inspired by space exploration and education

## 🔮 Future Enhancements

- [ ] Add asteroid belt
- [ ] Add dwarf planets (Pluto, Ceres, etc.)
- [ ] Add moon visualization
- [ ] Add planet comparison feature
- [ ] Add more quiz categories
- [ ] Add user accounts and leaderboards
- [ ] Add VR support

---

Made with ❤️ and 🌌 for space enthusiasts everywhere!
