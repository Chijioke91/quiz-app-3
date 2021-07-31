import { useState } from 'react';
import { fetchQuizQuestions, QuestionState } from './Api';
import { GlobalStyle, Wrapper } from './App.style';
import QuestionCard from './components/QuestionCard';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

export default function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(true);

  const TOTAL_QUESTIONS = 10;

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, 'easy');

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;

      const correct = answer === questions[number].correct_answer;

      if (correct) setScore((prev) => prev + 1);

      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };

      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    const next_question = number + 1;

    if (next_question === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(next_question);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>Quiz App</h1>

        {(gameOver || userAnswers.length === TOTAL_QUESTIONS) && (
          <button className="start" onClick={startTrivia}>
            Start
          </button>
        )}

        {!gameOver && <p className="score">Score: {score}</p>}
        {loading && <p>Loading Questions...</p>}

        {!loading && !gameOver && <QuestionCard questionNumber={number + 1} totalQuestions={TOTAL_QUESTIONS} question={questions[number].question} answers={questions[number].answers} userAnswer={userAnswers[number]} checkAnswer={checkAnswer} />}

        {!gameOver && (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        )}
      </Wrapper>
    </>
  );
}
