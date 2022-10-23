import { atom } from "recoil";
export interface Score {
  [key: string]: boolean;
}

export const scoreState = atom<Score[]>({
  key: "scoreState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value
});
