import Link from 'next/link';
import Image from 'next/image';
import { styled } from '@mui/material';
import { logo } from '../../../../../../server';

const LinkStyled = styled(Link)(() => ({
  height: `70px`,
  width: `180px`,
  display: `block`,
  overflow: `hidden`,
}));

const Logo = () => {
  return (
    <LinkStyled href={`/`}>
      <Image src={`/images/logos/${logo}`} alt={`logo`} height={70} width={174} priority />
    </LinkStyled>
  );
};

export default Logo;
  