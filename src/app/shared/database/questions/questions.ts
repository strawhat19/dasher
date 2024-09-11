import { Question } from '@/app/components/question/question';
import { Difficulties, Topics } from '../../library/common/enums';

export const SampleQuestions = [
    new Question({
      answer: 4,
      choices: [3, 5, 4, 22],
      question: `What is 2 + 2?`,
      difficulty: Difficulties.Easy,
      topics: Object.values(Topics).slice(0, 3),
      explanation: `2 + 2 = 4 Because I Said So`,
    }),
    new Question({
      answer: 5,
      choices: [3, 5, 4, 22],
      question: `What is 3 + 2?`,
      difficulty: Difficulties.Medium,
      explanation: `3 + 2 = 5 Because I Said So`,
      topics: Object.values(Topics).slice(0, 3),
    }),
    new Question({
      answer: 22,
      choices: [3, 5, 4, 22],
      question: `What is 11 + 11?`,
      difficulty: Difficulties.Hard,
      explanation: `11 + 11 = 22 Because I Said So`,
      topics: Object.values(Topics).slice(0, 3),
    }),
    new Question({
      answer: 100,
      choices: [100, 5, 4, 22],
      question: `What is 10 x 10?`,
      difficulty: Difficulties.Extreme,
      explanation: `10 x 10 = 100 Because I Said So`,
      topics: Object.values(Topics).slice(0, 3),
    }),
]