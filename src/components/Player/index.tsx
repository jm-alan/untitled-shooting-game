import { useEffect } from "react";
import { useSetAtom } from "jotai";

import { entityMap } from "../../state/immutable";
import { playerStart } from "../../util/constants";

export default function Player() {
  const setMap = useSetAtom(entityMap);

  useEffect(() => {
    setMap((prev) => {
      if ("player" in prev) {
        return prev;
      }

      return {
        ...prev,
        player: {
          position: playerStart,
          color: "cyan",
          meshType: "player",
        },
      };
    });

    return () => {
      setMap((prev) => {
        const cloned = { ...prev };
        delete cloned["player"];
        return cloned;
      });
    };
  }, [setMap]);

  return null;
}
