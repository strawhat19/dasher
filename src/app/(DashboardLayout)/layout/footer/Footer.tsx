import { year } from '../../../../../server';
import Logo from '@/app/components/logo/logo';
import { Copyright } from '@mui/icons-material';
import DashboardCard from '../../components/shared/DashboardCard';

export default function Footer() {
    return (
        <footer className={`footer borderRadius w100 sideSpace bottomSpace`}>
            <DashboardCard className={`footerCard`}>
                <div className={`footerContent flex w100 spaceBetween`}>
                    <div className={`leftSide`}>
                        <Logo className={`footerLogo p0`} />
                    </div>
                    <div className={`rightSide`}>
                        <div className={`copyright fontColor flex gap5`}>
                            Copyright <Copyright style={{ fontSize: 18, color: `var(--iconRight)` }} /> {year}
                        </div>
                    </div>
                </div>
            </DashboardCard>
        </footer>
    )
}