import React from 'react';
import dynamic from "next/dynamic";
import { useTheme } from '@mui/material/styles';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SalesOverview = () => {
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;

    const optionscolumnchart: any = {
        chart: {
            type: 'bar',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: true,
            },
            height: 370,
        },
        colors: [primary, secondary],
        plotOptions: {
            bar: {
                horizontal: false,
                barHeight: '60%',
                columnWidth: '42%',
                borderRadius: [6],
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all',
            },
        },

        stroke: {
            show: true,
            width: 5,
            lineCap: "butt",
            colors: ["transparent"],
          },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        grid: {
            borderColor: 'rgba(0,0,0,0.1)',
            strokeDashArray: 3,
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },
        yaxis: {
            tickAmount: 4,
        },
        xaxis: {
            categories: ['16/08', '17/08', '18/08', '19/08', '20/08', '21/08', '22/08', '23/08'],
            axisBorder: {
                show: false,
            },
        },
        tooltip: {
            theme: 'dark',
            fillSeriesColor: false,
        },
    };
    
    const seriescolumnchart: any = [
        {
            name: 'Eanings this month',
            data: [355, 390, 300, 350, 390, 180, 355, 390],
        },
        {
            name: 'Expense this month',
            data: [280, 250, 325, 215, 250, 310, 280, 250],
        },
    ];

    return (
        <DashboardCard title={`Sales Overview`}>
            <Chart
                type={`bar`}
                height={370} 
                width={`100%`}
                id={`salesOverviewChart`}
                series={seriescolumnchart}
                options={optionscolumnchart}
                className={`salesOverviewChart`}
            />
        </DashboardCard>
    );
};

export default SalesOverview;