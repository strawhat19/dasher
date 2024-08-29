import Image from "next/image";
import { icon } from "../../../../server";

export default function Icon({
    width = 35,
    height = 26,
    useSVG = false,
    className = `brandIcon`,
    src = `/images/logos/${icon}`,
    iconLeftColor = `var(--iconLeft)`,
    iconRightColor = `var(--iconRight)`,
}: any) {
    return <>
        {useSVG ? (
            <svg className={`logo logoIcon ${className}`} fill={`none`} width={width} height={height} viewBox={`0 0 ${width} ${height}`} xmlns={`http://www.w3.org/2000/svg`}>
                <g clipPath={`url(#clip0_103_2)`}>
                    <path fill={iconLeftColor} d={`M20.7292 26C23.5718 26 25.9249 23.7425 25.3989 21.0288C25.0691 19.3274 24.5699 17.6594 23.9065 16.0502C22.6061 12.8958 20.7001 10.0295 18.2973 7.61523C15.8944 5.20091 13.0418 3.28576 9.90241 1.97914C8.35247 1.33407 6.7476 0.843552 5.11092 0.51221C2.32806 -0.0511681 0 2.23859 0 5.00001V21C0 23.7614 2.30442 26 5.14706 26H20.7292Z`} />
                    <g style={{ mixBlendMode: `multiply` }}>
                        <path fill={iconRightColor} d={`M14.1043 26C11.2617 26 8.90853 23.7425 9.43463 21.0288C9.76447 19.3274 10.2636 17.6594 10.9269 16.0502C12.2274 12.8958 14.1334 10.0295 16.5362 7.61523C18.9391 5.20091 21.7917 3.28576 24.9311 1.97914C26.481 1.33407 28.0859 0.843552 29.7226 0.51221C32.5055 -0.0511681 34.8335 2.23859 34.8335 5.00001V21C34.8335 23.7614 32.529 26 29.6864 26H14.1043Z`} />
                    </g>
                </g>
            </svg>
        ) : <Image src={src} alt={`Logo`} width={35} height={26} />}
    </>
}