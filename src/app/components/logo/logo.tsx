import Image from 'next/image';
import { brandName, icon } from '@/app/shared/library/common/constants';

export type LogoOptions = {
    src?: string;
    label?: string;
    fontSize?: number;
    className?: string;
    fontWeight?: number;
    logoIcon?: string | JSX.Element | any | undefined;
}

export default function Logo({
    fontSize = 24,
    fontWeight = 700,
    label = brandName,
    className = `logo`,
    logoIcon = undefined,
    src = `/images/logos/${icon}`,
}: LogoOptions) {
    return (
        <div className={`logoContainer ${className} flex alignCenter start gap10`} style={{ fontWeight }}>
            {logoIcon != undefined ? logoIcon : <Image src={src} alt={`Logo`} width={35} height={26} />}
            <strong style={{ fontSize }}>
                {label}
            </strong>
        </div>
    )
}