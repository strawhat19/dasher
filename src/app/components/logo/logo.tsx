import Icon from './icon';
import { brandName } from '../../../../server';

export default function Logo({
    fontSize = 24,
    icon = <Icon />,
    fontWeight = 700,
    label = brandName,
    className = `logo`,
}: any) {
    return (
        <div className={`logoContainer ${className} flex alignCenter start gap10`} style={{ fontWeight }}>
            {icon}
            <strong style={{ fontSize }}>
                {label}
            </strong>
        </div>
    )
}