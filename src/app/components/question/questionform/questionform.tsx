'use client';

import './questionform.scss';

import { useState } from 'react';
import { Check } from '@mui/icons-material';
import { letters } from '@/app/shared/library/common/constants';
import DCard from '@/app/(DashboardLayout)/components/shared/DCard';
import { Difficulties, Topics } from '@/app/shared/library/common/enums';
import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import { Button, FormControl, Grid, MenuItem, Select, SelectChangeEvent, useMediaQuery } from '@mui/material';

export default function QuestionForm({}: any) {
    const smallScreenSize = useMediaQuery((theme: any) => theme.breakpoints.down(`sm`));

    let [answer, setAnswer] = useState<any>(letters[0]);
    let [question, setQuestion] = useState<any>(`What is 2 + 2?`);
    let [choices, setChoices] = useState<string[]>(letters.slice(0, 4));
    let [difficulty, setDifficulty] = useState<Difficulties>(Difficulties.Easy);
    let [allTopics, setAllTopics] = useState<Topics[] | string[]>(Object.values(Difficulties));
    let [topics, setTopics] = useState<Topics[] | string[]>(Object.values(Difficulties).slice(0, 3));
    let [difficulties, setDifficulties] = useState<Difficulties[] | string[]>([Difficulties.Easy, Difficulties.Medium, Difficulties.Hard, Difficulties.Extreme]);

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

    const onTopicChange = (event: SelectChangeEvent<typeof topics>) => {
        const { target: { value } } = event;
        setTopics(typeof value === `string` ? value.split(`,`) : value);
    };

    const onQuestionFormSubmit = (e: any) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        let value = Object.fromEntries(formData.entries());
        let { question, A, B, C, D } = value;

        let questionToCreate = { 
            topics,
            question,
            difficulty,
            choices: [A, B, C, D],
            answer: value[answer],
        };

        console.log(`Question Form`, questionToCreate);
    }

    return (
        <Grid item xs={12} className={`questionFormItem`}>
          <DCard 
            expanded={false}
            expandCollapse={true}
            cardTitleLabelPadding={0} 
            title={`Create Question Form`} 
            cardTitleLabelBorderRadius={5}
            cardTitleBG={`var(--mainDark)`} 
            cardTitleLabelBG={`transparent`}
            className={`questionFormCard p0`} 
            cardTitleBorderColor={`transparent`}
            cardTitlePadding={`12px var(--space)`} 
        >
            <form id={`questionForm`} onSubmit={(e) => onQuestionFormSubmit(e)} className={`questionForm flex column sideSpace bottomSpace`}>
              <Grid className={`formFields`} container spacing={2}>
                {allTopics && allTopics.length > 0 ? (
                    <Grid xs={12} item>
                        <div className={`p10b`}>
                            <strong>Topics</strong>
                        </div>
                        <FormControl className={`selectField topicsField`} fullWidth>
                            <Select
                                className={`hoverAction`}
                                onChange={onTopicChange}
                                id={`diffSelect`}
                                value={topics}
                                multiple
                            >
                                {allTopics.map((topic: any, tidx: any) => (
                                    <MenuItem 
                                        key={tidx} 
                                        value={topic}
                                        className={`selectItem`}
                                        disabled={topics.length == 1 && topics.includes(topic)} 
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
                                    <CustomTextField id={choice} name={choice} defaultValue={choice} placeholder={`Choice`} type={`text`} className={`field`} variant={`outlined`} fullWidth />
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
                    <strong>Create Question</strong>
                  </Button>
                </Grid>
              </Grid>
            </form>
          </DCard>
        </Grid>
    )
}