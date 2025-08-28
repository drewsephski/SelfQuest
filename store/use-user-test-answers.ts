import { create } from "zustand";
import { persist } from "zustand/middleware";

import { TestAnswerOption } from "../lib/personality-test";

interface UserTestAnswersState {
  userTestAnswers: TestAnswerOption["type"][];
  setUserTestAnswers: (newUserTestAnswers: TestAnswerOption["type"][]) => void;
}

const useUserTestAnswersStore = create<UserTestAnswersState>()(
  persist(
    (set) => ({
      userTestAnswers: [],
      setUserTestAnswers: (newUserTestAnswers) =>
        set(() => ({
          userTestAnswers: newUserTestAnswers,
        })),
    }),
    {
      name: "user-test-answers",
    }
  )
);

export default useUserTestAnswersStore;
