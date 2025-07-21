import { nanoid } from "nanoid";
import { useAtom } from "jotai";
import { useEffect } from "react";

import { entityMap } from "../state/immutable";
import { justAboveFloor } from "../util/constants";

export default function Spawner() {
  const [map, setMap] = useAtom(entityMap);

  useEffect(() => {
    const id = nanoid();
    const color = "hsl(" + Math.round(Math.random() * 360) + ", 100%, 50%)";

    setMap((prev) => ({
      ...prev,
      [id]: {
        position: [
          Math.random() * 10 + -5,
          Math.random() * 10 + -5,
          justAboveFloor,
        ],
        color,
        meshType: "basic",
      },
    }));

    return () => {
      setMap((prev) => {
        const cloned = { ...prev };
        delete cloned[id];
        return cloned;
      });
    };
  }, [setMap]);

  return null;
}
