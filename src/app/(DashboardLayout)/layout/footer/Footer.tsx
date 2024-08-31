import { Card } from '@mui/material';
import { year } from '../../../../../server';
import Logo from '@/app/components/logo/logo';
import { Copyright } from '@mui/icons-material';

export default function Footer() {
    return (
        <div className={`footerComponent`}>
            <Card sx={{ background: `var(--fontColor)` }} className={`footerContainer footerCard`}>
                <footer className={`footer flex w100 p30 spaceBetween`}>
                    <div className={`leftSide`}>
                        <Logo className={`footerLogo p0`} />
                    </div>
                    <div className={`rightSide`}>
                        <div className={`copyright flex gap5`}>
                            Copyright <Copyright style={{ fontSize: 18, color: `var(--iconRight)` }} /> {year}
                        </div>
                    </div>
                </footer>
            </Card>
        </div>
    )
}