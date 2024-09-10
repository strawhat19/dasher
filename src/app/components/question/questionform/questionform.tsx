'use client';
import './questionform.scss';

import Checkbox from '@mui/material/Checkbox';
import { ChangeEvent, useState } from 'react';
import { Check, CheckOutlined } from '@mui/icons-material';
import DCard from '@/app/(DashboardLayout)/components/shared/DCard';
import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

export default function QuestionForm(props: any) {
    let [answer, setAnswer] = useState<any>(`A`);
    let [difficulty, setDifficulty] = useState<any>(`Easy`);
    let [question, setQuestion] = useState<any>(`What is 2 + 2?`);
    let [choices, setChoices] = useState<string[]>([`A`, `B`, `C`, `D`]);
    let [topics, setTopics] = useState<string[]>([`Math`, `Arithmetic`, `Algebra`]);
    let [difficulties, setDifficulties] = useState<string[]>([`Easy`, `Medium`, `Hard`, `Extreme`]);
    let [allTopics, setAllTopics] = useState<string[]>([`Math`, `Arithmetic`, `Algebra`, `Geometry`]);

    const formDisabled = () => {
        return answer == `` || question == ``;
    }

    const onDifficultyChange = (event: SelectChangeEvent) => {
        setDifficulty(event.target.value as string);
    };

    const onQuestionField = (e?: any) => {
        let { value } = e?.target;
        setQuestion(value);
    }

    const onCheckboxSelect = (e: ChangeEvent<HTMLInputElement>, choice: any) => {
        let { checked } = e?.target;
        if (checked) {
            setAnswer(choice);
        } else {
            setAnswer(``);
        }
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
        <Grid item xs={12}>
          <DCard title={`Create Question Form`} stackPadding={0}>
            <form onSubmit={(e) => onQuestionFormSubmit(e)} className={`flex column`}>
              <Grid className={`formFields`} container spacing={2}>
                {allTopics && allTopics.length > 0 ? (
                    <Grid xs={12} item>
                        <div className={`p10b`}>
                            <strong>Topics</strong>
                        </div>
                        <FormControl className={`selectField topicsField`} fullWidth>
                            <Select
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
                  <Grid container spacing={3} alignItems={`flex-end`}>
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
                        <Grid key={cidx} xs={6} item>
                            <Grid container spacing={1} alignItems={`center`} direction={`row`}>
                                <Grid item xs={1} className={`text-center p0Important`}>
                                    {choice + `)`}
                                </Grid>
                                <Grid item xs={8} className={`p0Important`}>
                                    <CustomTextField id={choice} name={choice} defaultValue={choice} placeholder={`Choice`} type={`text`} className={`field`} variant={`outlined`} fullWidth />
                                </Grid>
                                <Grid item xs={3} className={`pt0Important`}>
                                    <Button 
                                        value={choice} 
                                        onClick={() => setAnswer(choice)}
                                        color={`success`}
                                        startIcon={<Check className={`startIcon`} />} 
                                        style={{ background: answer == choice ? `var(--mainDark)` : `var(--darkMain)` }}
                                        className={`mainButton choiceButton fieldHeight ${answer == choice ? `selected` : ``}`} 
                                    >
                                        <strong>Correct</strong>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    ))}
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Button disabled={formDisabled()} className={`w100 mainButton choiceButton mainDark`} type={`submit`}>
                    <strong>New Question</strong>
                  </Button>
                </Grid>
              </Grid>
            </form>
          </DCard>
        </Grid>
    )
}