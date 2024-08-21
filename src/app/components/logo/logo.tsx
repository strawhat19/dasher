import Image from 'next/image';
import { icon } from '../../../../server';

export default function Logo({src = `/images/logos/${icon}`, className = `logo`}: any) {
    return (
        <div className={`logoContainer ${className} flex alignCenter start gap10`}>
            <Image src={src} alt={`Logo`} width={35} height={26} />
            <strong>Modernize</strong>
        </div>
    )
}