import { DependencyList, MouseEvent, TouchEvent, useCallback } from "react";

type UseCoordsConfig = {
  preventDefault?: boolean;
  stopPropagation?: boolean;
};

export default function useCoords(
  fn: (cc: ClientCoords) => void,
  deps: DependencyList,
  { preventDefault, stopPropagation }: UseCoordsConfig = {},
) {
  return useCallback((e: MouseEvent | TouchEvent) => {
    if ("changedTouches" in e && e.changedTouches.length) {
      fn(e.changedTouches[0]);
    } else {
      if (preventDefault) {
        e.preventDefault();
      }
      if (stopPropagation) {
        e.stopPropagation();
      }
      fn(e as MouseEvent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
