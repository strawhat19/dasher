import React, { useState } from 'react';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { Card, CardContent, Typography, Stack, Box, Button } from '@mui/material';

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
  style,
  height,
  action,
  footer,
  subtitle,
  children,
  minHeight,
  container,
  background,
  middlecontent,
  id = undefined,
  expanded = true,
  stackColor = ``,
  stackPadding = 0,
  className = `dCard`,
  expandCollapse = false,
  stackBG = `transparent`,
  stackJustify = `space-between`,
  cardContentClass = `cardContentClass`,
}: Props | any) => {
  let [isExpanded, setIsExpanded] = useState<any>(expanded);
  return (
    <Card 
      id={id} 
      elevation={9} 
      style={style}
      variant={undefined}
      className={`card ${className} ${(style && style.background || background) ? `hasBackground` : ``} ${isExpanded ? `expanded` : `collapsed`}`} 
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
            justifyContent={stackJustify}
            style={{ 
              padding: stackPadding, 
              background: stackBG, 
              color: stackColor != `` ? stackColor : undefined
            }}
            className={`cardTitleRow titleStack`}
          >
            <Box className={`cardTitleBox`}>
              {title ? <Typography style={{ color: stackColor != `` ? stackColor : undefined, borderBottom: `1px solid ${stackColor != `` ? stackColor : undefined}` }} className={`cardTitle`} variant={`h5`}>{title}</Typography> : ``}
              {subtitle ? (
                <Typography style={{ color: stackColor != `` ? stackColor : undefined, borderBottom: `1px solid ${stackColor != `` ? stackColor : undefined}` }} variant={`subtitle2`} color={`textSecondary`}>
                  {subtitle}
                </Typography>
              ) : (
                ``
              )}
            </Box>
            {expandCollapse ? (
              <Button style={{ background: `var(--mainDark)` }} onClick={() => setIsExpanded(!isExpanded)} className={`expandCollapse hoverAction fit h100 mainButton expandCollapse`}>
                {isExpanded ? <IconChevronDown /> : <IconChevronUp />}
              </Button>
            ) : action}
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