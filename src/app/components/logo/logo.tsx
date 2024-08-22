import Image from 'next/image';
import { brandName, icon } from '../../../../server';

export default function Logo({src = `/images/logos/${icon}`, className = `logo`}: any) {
    return (
        <div className={`logoContainer ${className} flex alignCenter start gap10`}>
            <Image src={src} alt={`Logo`} width={35} height={26} />
            <strong>{brandName}</strong>
        </div>
    )
}