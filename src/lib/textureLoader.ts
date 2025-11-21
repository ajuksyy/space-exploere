import { TextureLoader } from "three";

const loader = new TextureLoader();

export function loadTexture(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (texture) => resolve(texture),
      undefined,
      (error) => {
        console.warn(`Failed to load texture: ${url}`, error);
        resolve(null);
      }
    );
  });
}

