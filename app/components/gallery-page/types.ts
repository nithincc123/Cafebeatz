export interface ImageFrame {
  id: number;
  src: string;
  alt: string;
  width: number;
  height: number;
  angle?: number;
  translateY?: number;
  rotation?: string;
  frameType?: "walnut" | "gold" | "black" | "canvas";
}
