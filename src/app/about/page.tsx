import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-4xl">
        <Card className="bg-black/50 border-white/20 text-white backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-yellow-400">
              About Space Explorer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-gray-300">
            <p className="text-lg leading-relaxed">
              Welcome to Space Explorer, an interactive journey through our solar
              system! This application combines stunning 3D visualizations with
              educational content to help you explore the planets that orbit our
              Sun.
            </p>
            <div>
              <h3 className="text-2xl font-semibold text-yellow-400 mb-3">
                Features
              </h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>
                  <strong>Interactive 3D Solar System:</strong> Explore planets
                  in real-time with smooth animations and orbital mechanics
                </li>
                <li>
                  <strong>Planet Details:</strong> Click on any planet to learn
                  about its diameter, distance from the Sun, temperature, and
                  more
                </li>
                <li>
                  <strong>Educational Quiz:</strong> Test your knowledge with
                  multiple-choice questions about our solar system
                </li>
                <li>
                  <strong>Real Data:</strong> All information is based on
                  accurate NASA and ESA data
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-yellow-400 mb-3">
                Technology
              </h3>
              <p>
                Built with Next.js, Three.js, React Three Fiber, Framer Motion,
                and Tailwind CSS. This project demonstrates modern web
                technologies for creating immersive educational experiences.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

