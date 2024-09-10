import React, { useState } from 'react';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { Card, CardContent, Typography, Stack, Box, Button } from '@mui/material';

type CardOptions = {
  style?: any;
  title?: string;
  subtitle?: string;
  expanded?: boolean;
  container?: string;
  className?: string;
  background?: string;
  cardTitleBG?: string;
  footer?: JSX.Element;
  stackJustify?: string;
  children?: JSX.Element;
  id?: string | undefined;
  cardTitleColor?: string;
  expandCollapse?: boolean;
  cardContentClass?: string;
  cardTitleLabelBG?: string; 
  action?: JSX.Element | any;
  component?: React.ElementType;
  cardTitleBorderColor?: string;
  height?: string | number | any;
  minHeight?: string | number | any;
  expandCollapseButtonColor?: string;
  middlecontent?: string | JSX.Element;
  cardTitlePadding?: string | number | any;
  cardTitleLabelPadding?: string | number | any;
  cardTitleLabelBorderRadius?: string | number | any; 
};

export default function DCard({
  id,
  title,
  style,
  height,
  action,
  footer,
  subtitle,
  children,
  minHeight,
  background,
  middlecontent,
  expanded = true,
  cardTitleColor = ``,
  className = `dCard`,
  cardTitlePadding = 0,
  expandCollapse = false,
  cardTitleBG = `transparent`,
  component: Component = Card,
  stackJustify = `space-between`,
  cardTitleLabelBorderRadius = 0,
  cardTitleLabelBG = `transparent`,
  cardTitleLabelPadding = `0 0 5px 0`,
  cardTitleBorderColor = `var(--main)`,
  cardContentClass = `cardContentClass`,
  container = `.MuiGrid-root .MuiGrid-item`,
  expandCollapseButtonColor = `transparent`,
}: CardOptions) {
  let [isExpanded, setIsExpanded] = useState<any>(expanded);
  return (
    <Card 
      elevation={9} 
      style={style}
      variant={undefined}
      id={id ? id.toString() : undefined} 
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
            className={`cardTitleRow titleStack`}
            style={{ 
              background: cardTitleBG, 
              padding: cardTitlePadding,
            }}
          >
            <Box className={`cardTitleBox`}>
              {title ? (
                <Typography 
                  variant={`h5`}
                  className={`cardTitle`} 
                  style={{ 
                    background: cardTitleLabelBG, 
                    padding: cardTitleLabelPadding,
                    borderColor: cardTitleBorderColor,
                    borderRadius: cardTitleLabelBorderRadius,
                    color: cardTitleColor != `` ? cardTitleColor : undefined, 
                    borderBottom: `1px solid ${cardTitleColor != `` ? cardTitleColor : undefined}` 
                  }} 
                >
                    {title}
                </Typography>
              ) : ``}
              {subtitle ? (
                <Typography style={{ color: cardTitleColor != `` ? cardTitleColor : undefined, borderBottom: `1px solid ${cardTitleColor != `` ? cardTitleColor : undefined}` }} variant={`subtitle2`} color={`textSecondary`}>
                  {subtitle}
                </Typography>
              ) : (
                ``
              )}
            </Box>
            {expandCollapse ? (
              <Button style={{ background: expandCollapseButtonColor }} onClick={() => setIsExpanded(!isExpanded)} className={`expandCollapse hoverAction fit h100 mainButton expandCollapse`}>
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