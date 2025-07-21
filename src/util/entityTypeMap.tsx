import { useFrame } from "@react-three/fiber";
import { useAtomValue, useSetAtom } from "jotai";
import { Mesh, PointLight } from "three";
import { ReactNode, useEffect, useState } from "react";

import state from "../state/mutable";
import LitHero from "../components/LitHero";
import { doNothing } from "./constants";
import {
  actionFours,
  actionMap,
  entityMap,
  playerX,
  playerY,
} from "../state/immutable";

const entityTypeMap: Record<string, (props: SharedEntityProps) => ReactNode> = {
  player: function Player(props) {
    const setMap = useSetAtom(entityMap);
    const setFours = useSetAtom(actionFours);
    const setActions = useSetAtom(actionMap);

    const [cubeMesh, setCubeMesh] = useState<Mesh | null>(null);
    const [pointLight, setPointLight] = useState<PointLight | null>(null);

    useFrame((_, frameDelta) => {
      if (!cubeMesh || !pointLight) {
        return;
      }

      cubeMesh.position.x += state.moveMul.x * state.playerSpeed * frameDelta;
      cubeMesh.position.y += state.moveMul.y * state.playerSpeed * frameDelta;
      pointLight.position.x += state.moveMul.x * state.playerSpeed * frameDelta;
      pointLight.position.y += state.moveMul.y * state.playerSpeed * frameDelta;
    });

    useEffect(() => {
      const updatePlayerPos = () => {
        setMap((prev) => {
          if (!cubeMesh) {
            return prev;
          }
          const cloned = { ...prev };

          cloned.player!.position[0] = cubeMesh.position.x;
          cloned.player!.position[1] = cubeMesh.position.y;

          return cloned;
        });
      };

      setActions((prev) => ({ ...prev, updatePlayerPos }));
      setFours((prev) => {
        if (prev.includes("updatePlayerPos")) {
          return prev;
        }

        return [...prev, "updatePlayerPos"];
      });

      return () => {
        setActions((prev) => ({ ...prev, updatePlayerPos: doNothing }));
      };
    }, [setMap, setActions, setFours, cubeMesh]);

    return (
      <LitHero
        {...props}
        onCube={setCubeMesh}
        onLight={setPointLight}
      />
    );
  },
  basic: function Basic(props) {
    const targetX = useAtomValue(playerX);
    const targetY = useAtomValue(playerY);

    const [cubeMesh, setCubeMesh] = useState<Mesh | null>(null);
    const [pointLight, setPointLight] = useState<PointLight | null>(null);

    useFrame((_, frameDelta) => {
      if (!cubeMesh || !pointLight) {
        return;
      }

      const distanceX = targetX - cubeMesh.position.x;
      const distanceY = targetY - cubeMesh.position.y;
      const distanceAbs = Math.hypot(distanceX, distanceY);
      if (distanceAbs < 2) {
        return;
      }

      const targetAngle = Math.atan2(Math.abs(distanceY), Math.abs(distanceX));
      const coefX =
        (1 - 2 * +(distanceX < 0)) * +(distanceX !== 0) * Math.cos(targetAngle);
      const coefY =
        (1 - 2 * +(distanceY < 0)) * +(distanceY !== 0) * Math.sin(targetAngle);

      cubeMesh.position.x += coefX * state.enemySpeed * frameDelta;
      cubeMesh.position.y += coefY * state.enemySpeed * frameDelta;
      pointLight.position.x += coefX * state.enemySpeed * frameDelta;
      pointLight.position.y += coefY * state.enemySpeed * frameDelta;
    });

    return (
      <LitHero
        spin={1.5}
        {...props}
        onCube={setCubeMesh}
        onLight={setPointLight}
      />
    );
  },
} as const;

export default entityTypeMap;
