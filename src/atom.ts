import { atom } from "recoil";
export interface Score {
  [key: string]: boolean;
}

export const scoreState = atom<Score[]>({
  key: "scoreState",
  default: [],
});

interface QuizImg {
  url: string;
  answer: string | boolean;
}
export interface Quiz {
  quizId: string;
  quizName: string;
  images: QuizImg | QuizImg[];
}

export const quizDataState = atom<Quiz[]>({
  key: "quizDataState", //JSON data from fakeDB
  default: [],
});

export const routesState = atom<string[]>({
  key: "routesState", //Route array refer JSON data
  default: [],
});

export const currRouteState = atom<number>({
  key: "currRouteState", //current index of routeState array
  default: 0,
});
