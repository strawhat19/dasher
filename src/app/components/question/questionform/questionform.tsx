'use client';

import './questionform.scss';

import { Question } from '../question';
import { useContext, useState } from 'react';
import { Check, Edit } from '@mui/icons-material';
import { SharedDatabase } from '@/app/shared/shared';
import { letters } from '@/app/shared/library/common/constants';
import DCard from '@/app/(DashboardLayout)/components/shared/DCard';
import { Difficulties, Topics } from '@/app/shared/library/common/enums';
import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import { Button, FormControl, Grid, MenuItem, Select, SelectChangeEvent, useMediaQuery } from '@mui/material';

export type QuestionFormOptions = {
    topics?: Topics[];
    choices?: string[];
    expanded?: boolean;
    questionToEdit?: Question;
    difficulties?: Difficulties[];
} 

export default function QuestionForm({
    questionToEdit,
    expanded = false,
    choices = letters.slice(0, 4),
    topics = Object.values(Topics),
    difficulties = Object.values(Difficulties),
}: QuestionFormOptions) {

    let { setQuestions } = useContext<any>(SharedDatabase);
    let [answer, setAnswer] = useState<any>(letters[0]);
    let [question, setQuestion] = useState<any>(`What is 2 + 2?`);
    let [difficulty, setDifficulty] = useState<Difficulties>(Difficulties.Easy);
    const smallScreenSize = useMediaQuery((theme: any) => theme.breakpoints.down(`sm`));
    let [formTopics, setFormTopics] = useState<Topics[] | string[]>(Object.values(Topics).slice(0, 3));

    const formDisabled = () => {
        return answer == `` || question == ``;
    }

    const onDifficultyChange = (event: SelectChangeEvent) => {
        setDifficulty(event.target.value as Difficulties);
    };

    const onQuestionField = (e?: any) => {
        let { value } = e?.target;
        setQuestion(value);
    }

    const onTopicChange = (event: SelectChangeEvent<typeof formTopics>) => {
        const { target: { value } } = event;
        let topicToSet: Topics | any = typeof value === `string` ? value.split(`,`) : value;
        setFormTopics(topicToSet);
    };

    const onQuestionFormSubmit = (e: any) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        let value = Object.fromEntries(formData.entries());
        let { question, A, B, C, D } = value;
        question = question.toString();

        let questionToSet: Question = new Question({ 
            question,
            difficulty,
            explanation: ``,
            topics: formTopics,
            choices: [A, B, C, D],
            answer: value[answer],
        });

        console.log(`Question`, questionToSet);

        setQuestions((prevQuestions: Question[]) => [questionToSet, ...prevQuestions]);
    }

    return (
        <Grid item xs={12} className={`questionFormItem`}>
          <DCard 
            titleMB={`10px`}
            expanded={expanded}
            expandCollapse={true}
            cardTitleLabelPadding={0} 
            cardTitleLabelBorderRadius={5}
            cardTitleBG={`var(--mainDark)`} 
            cardTitleLabelBG={`transparent`}
            className={`questionFormCard p0`} 
            cardTitleBorderColor={`transparent`}
            cardTitlePadding={`12px var(--space)`} 
            title={(
                <div className={`customCardTitle p0 m0 flex alignCenter gap5`}>
                    <span className={`formIcon`}>{questionToEdit ? <Edit style={{fontSize: 12}} /> : `+`}</span>
                    <h2 className={`p0 m0`}>{questionToEdit ? `Update` : `Create`} Question Form</h2>
                </div>
            )}
        >
            <form id={`questionForm`} onSubmit={(e) => onQuestionFormSubmit(e)} className={`questionForm flex column sideSpace bottomSpace`}>
              <Grid className={`formFields`} container spacing={2}>
                {topics && topics.length > 0 ? (
                    <Grid xs={12} item>
                        <div className={`p10b`}>
                            <strong>Topics</strong>
                        </div>
                        <FormControl className={`selectField topicsField`} fullWidth>
                            <Select
                                className={`hoverAction`}
                                onChange={onTopicChange}
                                id={`diffSelect`}
                                value={formTopics}
                                multiple
                            >
                                {topics.map((topic: any, tidx: any) => (
                                    <MenuItem 
                                        key={tidx} 
                                        value={topic}
                                        className={`selectItem`}
                                        disabled={formTopics.length == 1 && formTopics.includes(topic)} 
                                    >
                                        {topic}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                ) : <></>}
                <Grid item xs={12}>
                  <Grid container spacing={smallScreenSize ? 1 : 3} alignItems={`flex-end`}>
                    <Grid xs={8} item>
                        <div className={`p10b`}>
                            <strong>Question</strong>
                        </div>
                        <CustomTextField onChange={onQuestionField} defaultValue={question} id={`question`} name={`question`} placeholder={`Enter New Question`} type={`text`} className={`field`} variant={`outlined`} fullWidth />
                    </Grid>
                    {difficulties && difficulties.length > 0 ? (
                        <Grid xs={4} item>
                            <div className={`p10b`}>
                                <strong>Difficulty</strong>
                            </div>
                            <FormControl className={`selectField difficultyField`} fullWidth>
                                <Select
                                    onChange={onDifficultyChange}
                                    className={`hoverAction`}
                                    value={difficulty}
                                    id={`diffSelect`}
                                >
                                    {difficulties.map((diff: any, didx: any) => (
                                        <MenuItem key={didx} value={diff} className={`selectItem`}>
                                            {diff}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    ) : <></>}
                  </Grid>
                </Grid>
                <Grid className={`choicesContainer`} item xs={12}>
                  <div className={`p10b`}>
                    <strong>Choices</strong>
                  </div>
                  <Grid container spacing={2}>
                    {choices.map((choice: any, cidx: any) => (
                        <Grid key={cidx} xs={12} md={6} item>
                            <Grid container spacing={1} alignItems={`center`} direction={`row`}>
                                <Grid item xs={2} md={1} className={`text-center p0Important`}>
                                    {choice + `)`}
                                </Grid>
                                <Grid item xs={6} md={8} className={`p0Important`}>
                                    <CustomTextField required id={choice} name={choice} defaultValue={choice} placeholder={`Choice`} type={`text`} className={`field`} variant={`outlined`} fullWidth />
                                </Grid>
                                <Grid item xs={4} md={3} className={`pt0Important`}>
                                    <Button 
                                        fullWidth
                                        value={choice} 
                                        onClick={() => setAnswer(choice)}
                                        endIcon={answer == choice ? <Check className={`iconButtonIcon`} /> : undefined} 
                                        className={`mainButton choiceButton iconButton fieldHeight ${answer == choice ? `selected` : ``}`} 
                                    >
                                        <strong>Correct{answer == choice ? `` : `?`}</strong>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    ))}
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Button disabled={formDisabled()} className={`w100 mainButton choiceButton mainDark`} type={`submit`}>
                    <strong>{questionToEdit ? `Edit` : `Create`} Question</strong>
                  </Button>
                </Grid>
              </Grid>
            </form>
          </DCard>
        </Grid>
    )
}