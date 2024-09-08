import React from 'react';
import { Card, CardContent, Typography, Stack, Box } from '@mui/material';

type Props = {
  title?: string;
  subtitle?: string;
  footer?: JSX.Element;
  children?: JSX.Element;
  action?: JSX.Element | any;
  middlecontent?: string | JSX.Element;
};

const DCard = ({
  title,
  height,
  action,
  footer,
  subtitle,
  children,
  minHeight,
  container,
  middlecontent,
  id = undefined,
  className = `dCard`,
  cardContentClass = `cardContentClass`,
}: Props | any) => {
  return (
    <Card 
      id={id} 
      elevation={9} 
      variant={undefined}
      className={`card ${className}`} 
      sx={{ 
        padding: 0, 
        ...(height && height != undefined && height > 0 ? { height: height } : {}), 
        ...(minHeight && minHeight != undefined && minHeight > 0 ? { minHeight: minHeight } : {}) 
      }}
    >
      <CardContent className={`cardContent ${cardContentClass}`} sx={{ p: `30px` }}>
        {title ? (
          <Stack
            spacing={2}
            direction={`row`}
            mb={children ? 3 : 0}
            alignItems={`center`}
            justifyContent={`space-between`}
          >
            <Box>
              {title ? <Typography className={`cardTitle`} variant={`h5`}>{title}</Typography> : ``}
              {subtitle ? (
                <Typography variant={`subtitle2`} color={`textSecondary`}>
                  {subtitle}
                </Typography>
              ) : (
                ``
              )}
            </Box>
            {action}
          </Stack>
        ) : null}
        {children}
      </CardContent>
      {middlecontent}
      {footer}
    </Card>
  );
};

export default DCard;