'use client';

import { Grid } from '@mui/material'
// import { db } from '@/server/firebase';
import Logo from '@/app/components/logo/logo';
import { useContext, useEffect } from 'react';
import QuizIcon from '@mui/icons-material/Quiz';
import { SharedDatabase } from '@/app/shared/shared';
import QuestionCard from '@/app/components/question/question';
import { devEnv } from '@/app/shared/library/common/constants';
// import { collection, onSnapshot } from 'firebase/firestore';
import { routes } from '@/app/(DashboardLayout)/components/nav/nav';
import QuestionForm from '@/app/components/question/questionform/questionform';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';

export default function QuestionsPage() {
  let { questions, setPageTitle } = useContext<any>(SharedDatabase);

  useEffect(() => {
    setPageTitle(<Logo logoIcon={<QuizIcon className={`quizIcon`} />} label={`Quiz List`} />);
    
    // Listen for Questions Database Updates
    // const questionsCollection = collection(db, `questions`);
    // const unsubscribeFromQuestionsDatabase = onSnapshot(questionsCollection, (currentquestionsInDB) => {
    //   const questionsFromDB: any[] = [];
    //   currentquestionsInDB.forEach((doc) => questionsFromDB.push(doc.data()));
    //   setQuestions(questionsFromDB);
    // });
    
    return () => {
      setPageTitle(<Logo />);
      // unsubscribeFromQuestionsDatabase();
    }
  }, [setPageTitle])

  return (
    <PageContainer title={routes.questions.title} description={`${routes.questions.title} Page`}>
      <Grid container spacing={3}>
        <QuestionForm expanded={devEnv} />
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