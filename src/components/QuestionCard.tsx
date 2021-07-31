import { AnswerObject } from '../App';
import { ButtonWrapper, Wrapper } from './QuestionCard.style';

type IProps = {
  question: string;
  answers: string[];
  checkAnswer: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  userAnswer: AnswerObject | undefined;
  questionNumber: number;
  totalQuestions: number;
};

export default function QuestionCard({ question, answers, checkAnswer, userAnswer, questionNumber, totalQuestions }: IProps) {
  return (
    <Wrapper>
      <p className="number">
        Question: {questionNumber} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        {answers.map((answer) => (
          <ButtonWrapper key={answer} correct={userAnswer?.correctAnswer === answer} userClicked={userAnswer?.answer === answer}>
            <button disabled={!!userAnswer} value={answer} onClick={checkAnswer}>
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </ButtonWrapper>
        ))}
      </div>
    </Wrapper>
  );
}
