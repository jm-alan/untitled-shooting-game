import { useAtomValue } from "jotai";
import {
  actionFours,
  actionMap,
  actionOnes,
  actionTwos,
} from "../state/immutable";
import { useFrame } from "@react-three/fiber";
import { useMemo } from "react";
import state from "../state/mutable";

export default function Engine() {
  const ones = useAtomValue(actionOnes);
  const twos = useAtomValue(actionTwos);
  const fours = useAtomValue(actionFours);
  const actions = useAtomValue(actionMap);

  // Memoizing these means we don't re-compute onOne if only the fours change
  const onOne = useMemo(() => [...ones, ...twos], [ones, twos]);
  const onThree = useMemo(
    () => [...ones, ...twos, ...fours],
    [ones, twos, fours],
  );
  const actionSelectors = useMemo(
    () =>
      ({
        0: ones,
        1: onOne,
        2: ones,
        3: onThree,
      }) as const,
    [ones, onOne, onThree],
  );

  useFrame(() => {
    const aList = actionSelectors[state.actionSelect];

    for (let i = aList.length; i--; ) {
      actions[aList[i]]();
    }
    state.actionSelect = ((state.actionSelect + 1) % 4) as ActionSelect;
  });

  return null;
}
