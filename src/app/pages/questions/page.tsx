'use client';

import { useState } from 'react';
import { Grid } from '@mui/material'
import Question from '@/app/components/question/question';
import { routes } from '@/app/(DashboardLayout)/components/nav/nav';
import QuestionForm from '@/app/components/question/questionform/questionform';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';

export default function QuestionsPage() {
  let [questions, setQuestions] = useState<any[]>([
    {
      answer: 4,
      title: `Q1.`,
      difficulty: `easy`,
      bgColor: `var(--easy1)`,
      choices: [3, 5, 4, 22],
      question: `What is 2 + 2?`,
      buttonJustify: `flex-start`,
      topics: [`Math, Arithmetic, Algebra`],
      fontColor: `var(--darkMain) !important`,
    },
    {
      answer: 5,
      title: `Q1.`,
      difficulty: `easy`,
      bgColor: `var(--easy2)`,
      choices: [3, 5, 4, 22],
      question: `What is 3 + 2?`,
      buttonJustify: `flex-start`,
      topics: [`Math, Arithmetic, Algebra`],
      fontColor: `var(--darkMain) !important`,
    },
    {
      answer: 22,
      title: `Q1.`,
      difficulty: `easy`,
      bgColor: `var(--easy3)`,
      choices: [3, 5, 4, 22],
      buttonJustify: `flex-start`,
      question: `What is 11 + 11?`,
      topics: [`Math, Arithmetic, Algebra`],
      fontColor: `var(--darkMain) !important`,
    },
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
                    <Question 
                      idx={qidx + 1}
                      title={`Q${qidx + 1}.`}
                      topics={question.topics} 
                      answer={question.answer}
                      choices={question.choices}
                      question={question.question}
                    />
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