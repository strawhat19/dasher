import './question.scss';

import { Button, Grid } from '@mui/material';
import DCard from '@/app/(DashboardLayout)/components/shared/DCard';

type QuestionProperties = {
    idx?: any;
    answer?: any;
    title?: string;
    bgColor?: string;
    question?: string;
    topics?: string[];
    fontColor?: string;
    difficulty?: string;
    buttonJustify?: string;
    choices?: string[] | number[];
}

export default function Question({
    idx = 1,
    answer = 4,
    title = `Q1.`,
    difficulty = `easy`,
    choices = [3, 5, 4, 22],
    question = `What is 2 + 2?`,
    buttonJustify = `flex-start`,
    bgColor = `var(--${difficulty}${idx})`,
    topics = [`Math, Arithmetic, Algebra`],
    fontColor = `var(--darkMain) !important`,
}: QuestionProperties) {
    let buttonStyle = { 
        color: fontColor, 
        background: bgColor, 
        justifyContent: buttonJustify,
    };

    const validateChoice = (choice: any) => {
        console.log(choice == answer ? `Correct` : `Wrong`, `You clicked`, choice, `Answer was`, answer);
    }

    return (
        <DCard 
            title={title} 
            stackBG={bgColor}
            stackColor={fontColor}
            stackJustify={buttonJustify} 
            className={`questionCard p0`}
            action={(
              <div className={`questionAndTopics flex spaceBetween`}>
                <strong>{question}</strong>
                {topics.map((topic: any, tidx: any) => (
                    <strong key={tidx}>
                        <i>
                            {topic}
                        </i>
                    </strong>
                ))}
              </div>
            )}
          >
           <div className={`simpleFlex px5 column gapSpace`}>
            <Grid className={`choices sideSpace bottomSpace`} container spacing={3}>
              {choices.map((choice: any, cidx: any) => {
                let letters = [`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`];
                let letter = letters[cidx];
                return (
                    <Grid key={cidx} item xs={6}>
                        <Button onClick={() => validateChoice(choice)} defaultValue={choice} className={`questionButton choice w100 mainButton`} style={buttonStyle}>
                            <strong>{`${letter})`} {choice}</strong>
                        </Button>
                    </Grid>
                )
              })}
            </Grid>
           </div>
        </DCard>
    )
}