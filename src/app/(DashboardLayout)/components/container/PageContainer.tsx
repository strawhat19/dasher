import { brandName, icon } from '../../../../../server';
import { Helmet, HelmetProvider } from 'react-helmet-async';

type Props = {
  title?: string;
  description?: string;
  children: JSX.Element | JSX.Element[];
};

const PageContainer = ({ title, description, children }: Props) => (
  <HelmetProvider>
    <div>
      <Helmet>
        <title>{title} | {brandName} Official</title>
        <meta name={`description`} content={description} />
        <link rel={`icon`} href={`/images/logos/${icon}`} type={`image/x-icon`} />
      </Helmet>
      {children}
    </div>
  </HelmetProvider>
);

export default PageContainer;