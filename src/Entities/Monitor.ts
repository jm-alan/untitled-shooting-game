import { useAtomValue, useSetAtom } from "jotai";
import { activeEntities, entityMap } from "../state/immutable";
import { useEffect } from "react";

export default function Monitor() {
  const map = useAtomValue(entityMap);
  const setList = useSetAtom(activeEntities);

  useEffect(() => {
    setList(Object.keys(map));
  }, [setList, map]);

  return null;
}
