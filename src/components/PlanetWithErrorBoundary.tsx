"use client";

import { Component, ReactNode } from "react";
import { Planet as PlanetType } from "@/data/planets";
import Planet from "./Planet";

interface Props {
  planet: PlanetType;
  angle: number;
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class PlanetErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.warn(`Texture loading failed for ${this.props.planet.name}:`, error);
  }

  render() {
    if (this.state.hasError) {
      // Fallback: render planet without texture (using color)
      return <Planet planet={this.props.planet} angle={this.props.angle} />;
    }

    return this.props.children;
  }
}

export default function PlanetWithErrorBoundary({ planet, angle }: Props) {
  return (
    <PlanetErrorBoundary planet={planet} angle={angle}>
      <Planet planet={planet} angle={angle} />
    </PlanetErrorBoundary>
  );
}

