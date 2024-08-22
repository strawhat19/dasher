import { Card } from '@mui/material';
import { Copyright } from '@mui/icons-material';
import { brandName, year } from '../../../../../server';

export default function Footer() {
    return (
        <Card sx={{ background: `var(--fontColor)` }} className={`footerContainer footerCard`}>
            <footer className={`footer flex w100 p30 spaceBetween`}>
                <div className={`leftSide`}>
                    {brandName}
                </div>
                <div className={`rightSide`}>
                    <div className={`copyright flex gap5`}>
                        Copyright <Copyright style={{ fontSize: 18 }} /> {year}
                    </div>
                </div>
            </footer>
        </Card>
    )
}