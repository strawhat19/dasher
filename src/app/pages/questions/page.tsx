'use client';

import { useState } from 'react';
import { Grid } from '@mui/material'
import Question from '@/app/components/question/question';
import { routes } from '@/app/(DashboardLayout)/components/nav/nav';
import { Difficulties, Topics } from '@/app/shared/library/common/enums';
import QuestionForm from '@/app/components/question/questionform/questionform';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';

export class QuestionClass {
  [key: string]: any;
  constructor(quesObj: {
    answer: number,
    question: string,
    topics: Topics[],
    explanation: string,
    difficulty: Difficulties,
    choices: string[] | number[] | any[],
  }) {
    Object.assign(this, quesObj);
  }
}

export default function QuestionsPage() {
  let [questions, setQuestions] = useState<any[]>([
    new QuestionClass({
      answer: 4,
      choices: [3, 5, 4, 22],
      question: `What is 2 + 2?`,
      difficulty: Difficulties.Easy,
      explanation: `2 + 2 = 4 Because I Said So`,
      topics: [Topics.Math, Topics.Algebra, Topics.Arithmetic],
    }),
    new QuestionClass({
      answer: 5,
      choices: [3, 5, 4, 22],
      question: `What is 3 + 2?`,
      difficulty: Difficulties.Medium,
      explanation: `3 + 2 = 5 Because I Said So`,
      topics: [Topics.Math, Topics.Algebra, Topics.Arithmetic],
    }),
    new QuestionClass({
      answer: 22,
      choices: [3, 5, 4, 22],
      question: `What is 11 + 11?`,
      difficulty: Difficulties.Hard,
      explanation: `11 + 11 = 22 Because I Said So`,
      topics: [Topics.Math, Topics.Algebra, Topics.Arithmetic],
    }),
    new QuestionClass({
      answer: 100,
      choices: [100, 5, 4, 22],
      question: `What is 10 x 10?`,
      difficulty: Difficulties.Hard,
      explanation: `10 x 10 = 100 Because I Said So`,
      topics: [Topics.Math, Topics.Algebra, Topics.Arithmetic],
    }),
  ])
  return (
    <PageContainer title={routes.questions.title} description={`${routes.questions.title} Page`}>
      <Grid container spacing={3}>
        <QuestionForm />
        {questions && questions.length > 0 ? (
          <Grid className={`questionsContainerItem`} item xs={12}>
            <Grid className={`questionsContainer`} container spacing={3}>
              {questions.map((question: any, qidx: any) => {
                return (
                  <Grid key={qidx} item xs={12}>
                    <Question title={`Q${qidx + 1}.`} question={question} />
                  </Grid>
                )
              })}
            </Grid>
          </Grid>
        ) : <></>}
      </Grid>
    </PageContainer>
  );
};