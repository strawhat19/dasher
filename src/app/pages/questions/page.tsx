'use client';

import { useContext } from 'react';
import { Grid } from '@mui/material'
import { SharedDatabase } from '@/app/shared/shared';
import QuestionCard from '@/app/components/question/question';
import { routes } from '@/app/(DashboardLayout)/components/nav/nav';
import QuestionForm from '@/app/components/question/questionform/questionform';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';

export default function QuestionsPage() {
  let { questions } = useContext<any>(SharedDatabase);
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
                    <QuestionCard title={`Q${qidx + 1}.`} question={question} />
                  </Grid>
                )
              })}
            </Grid>
          </Grid>
        ) : <>No Questions Yet</>}
      </Grid>
    </PageContainer>
  );
};