import Image from 'next/image';
import { brandName, icon } from '../../../../server';

export default function Logo({
    fontSize = 24,
    fontWeight = 700,
    label = brandName,
    className = `logo`,
    src = `/images/logos/${icon}`,
}: any) {
    return (
        <div className={`logoContainer ${className} flex alignCenter start gap10`} style={{ fontWeight }}>
            <Image src={src} alt={`Logo`} width={35} height={26} />
            <strong style={{ fontSize }}>
                {label}
            </strong>
        </div>
    )
}