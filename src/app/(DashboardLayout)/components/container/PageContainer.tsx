'use client';

import { createContext, useContext, useState } from 'react';
import { brandName, icon } from '../../../../../server';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { GlobalDataContext } from '@/app/layout';

type Props = {
  title?: string;
  description?: string;
  children: JSX.Element | JSX.Element[];
};

const PageContainer = ({ title, description, children }: Props) => {
  let { darkMode } = useContext<any>(GlobalDataContext);
  return (
    <HelmetProvider>
      <div className={`pageContainer ${darkMode ? `dark` : `light`}`}>
        <Helmet>
          <title>{title} | {brandName} Official</title>
          <meta name={`description`} content={description} />
          <link rel={`icon`} href={`/images/logos/${icon}`} type={`image/x-icon`} />
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossOrigin="anonymous" />
        </Helmet>
        {children}
      </div>
    </HelmetProvider>
  )
};

export default PageContainer;