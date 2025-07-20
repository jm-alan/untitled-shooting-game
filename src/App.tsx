import clsx from "clsx";
import { Canvas } from "@react-three/fiber";
import { useRef, useState, useEffect, useCallback } from "react";

import Floor from "./components/Floor";
import Player from "./components/Player";
import Joystick from "./components/Joystick";
import useCoords from "./util/useCoords";
import { useAtomValue, useAtom } from "jotai";
import {
  joystickSnapLeft,
  joystickSnapTop,
  joystickUnlocked,
  normalizedJoystickOffsetX,
  normalizedJoystickOffsetY,
  physicalJoystickRadius,
} from "./state/immutable";

import "./App.scss";
import mutable from "./state/mutable";
import Engine from "./Engine";

const widthUpscaleCeil = 720;
const heightUpscaleCeil = 1280;

function App() {
  const radius = useAtomValue(physicalJoystickRadius);
  const unlocked = useAtomValue(joystickUnlocked);
  const [snapLeft, setSnapLeft] = useAtom(joystickSnapLeft);
  const [snapTop, setSnapTop] = useAtom(joystickSnapTop);
  const [joystickX, setJoystickX] = useAtom(normalizedJoystickOffsetX);
  const [joystickY, setJoystickY] = useAtom(normalizedJoystickOffsetY);

  const [ready, setReady] = useState(false);
  const [canUpscale, setCanUpscale] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  const setJoystickSnap = useCoords(
    ({ clientX, clientY }) => {
      setSnapLeft(clientX);
      setSnapTop(clientY);
    },
    [setSnapLeft, setSnapTop],
  );

  const resetJoystickSnap = useCallback(() => {
    setSnapLeft(undefined);
    setSnapTop(undefined);
    setJoystickX(0);
    setJoystickY(0);
  }, [setSnapLeft, setSnapTop, setJoystickX, setJoystickY]);

  const onMove = useCoords(
    ({ clientX, clientY }) => {
      if (unlocked) {
        const x = clientX - snapLeft!;
        const y = clientY - snapTop!;
        const angle = Math.atan2(Math.abs(y), Math.abs(x));
        const coefX = (1 - 2 * +(x < 0)) * +(x !== 0) * Math.cos(angle);
        const coefY = (1 - 2 * +(y > 0)) * +(y !== 0) * Math.sin(angle);
        const offset = Math.min(1, Math.hypot(x, y) / radius);
        setJoystickX(offset * coefX);
        setJoystickY(offset * coefY);
      }
    },
    [setJoystickX, setJoystickY, unlocked, snapLeft, snapTop, radius],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && !ready) {
      const { width, height } = canvas.getBoundingClientRect();
      setCanUpscale(width < widthUpscaleCeil && height < heightUpscaleCeil);
      setReady(true);
    }

    return () => {
      if (canvas && ready) {
        setReady(false);
        setCanUpscale(false);
      }
    };
  }, [ready]);

  useEffect(() => {
    mutable.moveMul.x = joystickX;
    mutable.moveMul.y = joystickY;
  }, [joystickX, joystickY]);

  return (
    <main
      ref={containerRef}
      className={clsx(ready && "ready")}
      onMouseDown={setJoystickSnap}
      onTouchStart={setJoystickSnap}
      onMouseUp={resetJoystickSnap}
      onTouchEnd={resetJoystickSnap}
      onMouseMove={onMove}
      onTouchMove={onMove}
    >
      <Canvas
        id="surface"
        ref={canvasRef}
        dpr={1 + +canUpscale}
      >
        {ready ? (
          <>
            <Engine />
            <ambientLight
              color="white"
              intensity={0.25}
            />
            <Player position={[0, 0, -11]} />
            <Floor position={[0, 0, -12]} />
          </>
        ) : null}
      </Canvas>
      <Joystick />
      <div id="loading-container">
        <span id="main-title">Untitled Shooting Game</span>
        <span id="loading">Loading...</span>
      </div>
    </main>
  );
}

export default App;
