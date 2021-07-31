import { shuffleArray } from './utils';

export type Difficulty = 'easy' | 'medium' | 'hard';

export type Question = {
  category: string;
  correct_answer: string;
  question: string;
  difficulty: string;
  incorrect_answers: string[];
  type: string;
};

export type QuestionState = Question & { answers: string[] };

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`);
  const jsonResponse = await response.json();
  return jsonResponse.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
  }));
};
