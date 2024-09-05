'use client';

import { brandName, iconPNG } from '../../../../../server';
import { Helmet, HelmetProvider } from 'react-helmet-async';

type Props = {
  title?: string;
  description?: string;
  children: JSX.Element | JSX.Element[];
};

export default function PageContainer({ title, description, children }: Props | any) {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title} | {brandName} Official</title>
        <meta name={`description`} content={description} />
        <link rel={`icon`} href={`/images/logos/${iconPNG}`} type={`image/x-icon`} />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossOrigin="anonymous" />
      </Helmet>
      {children}
    </HelmetProvider>
  )
};