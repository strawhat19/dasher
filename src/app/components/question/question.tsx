import './question.scss';

import { Button, Grid } from '@mui/material';
import { letters } from '@/app/shared/library/common/constants';
import DCard from '@/app/(DashboardLayout)/components/shared/DCard';
import { Difficulties, Topics } from '@/app/shared/library/common/enums';

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

type QuestionCardOptions = {
    title?: string;
    bgColor?: string;
    fontColor?: string;
    buttonJustify?: string;
    question: QuestionClass;
}

export default function Question({
    question,
    title = `Q1.`,
    buttonJustify = `flex-start`,
    bgColor = `var(--${question.difficulty})`,
    fontColor = `var(--fontColor) !important`,
}: QuestionCardOptions) {

    let buttonStyle = { 
        color: fontColor, 
        background: bgColor, 
        justifyContent: buttonJustify,
    };

    const validateChoice = (choice: any) => {
        console.log(choice == question.answer ? `Correct` : `Wrong`, `You clicked`, choice, `Answer was`, question.answer);
    }

    return (
        <DCard 
            title={title} 
            cardTitleBG={bgColor}
            cardTitleLabelPadding={0}
            cardTitleColor={fontColor}
            stackJustify={buttonJustify} 
            className={`questionCard p0`}
            cardTitlePadding={`12px var(--space)`}
            cardTitleBorderColor={`transparent !important`}
            action={(
              <div className={`questionAndTopics flex spaceBetween`}>
                <strong>{question.question}</strong>
                {question.topics.map((topic: any, tidx: any) => (
                    <strong key={tidx}>
                        <i>{topic}</i>
                    </strong>
                ))}
              </div>
            )}
          >
           <div className={`simpleFlex px5 column gapSpace`}>
            <Grid className={`choices sideSpace bottomSpace`} container spacing={3}>
              {question.choices.map((choice: any, cidx: any) => {
                return (
                    <Grid key={cidx} item xs={6}>
                        <Button onClick={() => validateChoice(choice)} defaultValue={choice} className={`questionButton choice w100 mainButton`} style={buttonStyle}>
                            <strong>{`${letters[cidx]})`} {choice}</strong>
                        </Button>
                    </Grid>
                )
              })}
            </Grid>
           </div>
        </DCard>
    )
}