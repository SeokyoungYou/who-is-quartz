import { atom, selector } from "recoil";
export interface Score {
  [key: string]: boolean;
}

export const scoreState = atom<Score[]>({
  key: "scoreState",
  default: [],
});

export type Answer = "left" | "right" | boolean;
interface QuizImg {
  url: string;
  answer: Answer;
}
export interface Quiz {
  quizId: string;
  quizName: string;
  images: QuizImg[];
}

export const quizDataState = atom<Quiz[]>({
  key: "quizDataState", //JSON data from fakeDB
  default: [],
});

export const routesSelctor = selector<string[]>({
  key: "quizRoutes", //Route array refer JSON data: depends on quizDataState
  get: ({ get }) => {
    const quiz = get(quizDataState);
    let quizRoutes: string[] = [];
    quiz.forEach((quiz) => {
      quizRoutes.push(`/quiz/${quiz.quizId}`);
    });
    quizRoutes.push("/result");
    return quizRoutes;
  },
});

export const currRouteState = atom<number>({
  key: "currRouteState", //current index of routeState array
  default: 0,
});
