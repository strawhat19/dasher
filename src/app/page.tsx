'use client';

import { useContext } from 'react';
import { Share } from '@mui/icons-material';
import { SharedDatabase } from './shared/shared';
import { Grid, Box, Button } from '@mui/material';
import DCard from './(DashboardLayout)/components/shared/DCard';
import Blog from '@/app/(DashboardLayout)/components/dashboard/Blog';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import SalesOverview from '@/app/(DashboardLayout)/components/dashboard/SalesOverview';
import YearlyBreakup from '@/app/(DashboardLayout)/components/dashboard/YearlyBreakup';
import MonthlyEarnings from '@/app/(DashboardLayout)/components/dashboard/MonthlyEarnings';
import RecentTransactions from '@/app/(DashboardLayout)/components/dashboard/RecentTransactions';
import ProductPerformance from '@/app/(DashboardLayout)/components/dashboard/ProductPerformance';

// Extend MediaTrackConstraintSet to recognize 'torch'
// interface MediaTrackConstraintSet {
//   torch?: boolean;
// }

// // Declare ImageCapture globally for TypeScript
// declare var ImageCapture: {
//   new(track: MediaStreamTrack): typeof ImageCapture;
// };  

export default function Dashboard() {
  let { cards } = useContext<any>(SharedDatabase);
  // const [isCharging, setIsCharging] = useState<boolean | null>(null);
  // const [batteryLevel, setBatteryLevel] = useState<number | null>(null);

  const openShare = () => {
    if (navigator.share) {
      navigator.share({
        url: `https://dasher-six.vercel.app/`,
        title: `Check out this Next JS PWA`,
        text: `This is a cool web app that behaves like a native app!`,
      })
      .then(() => console.log(`Share successful!`))
      .catch((error) => console.log(`Error sharing:`, error));
    } else {
      console.log(`Web Share API not supported.`);
    }
  }

  // const showBatteryStatus = () => {
  //   if (navigator.getBattery) {
  //     navigator.getBattery().then((battery) => {
  //       setBatteryLevel(battery.level * 100); // Convert to percentage
  //       setIsCharging(battery.charging);
  //       console.log(`Battery level: ${battery.level * 100}%`);
  //       console.log(`Is charging: ${battery.charging}`);
  //     }).catch((error) => {
  //       console.error('Error getting battery status:', error);
  //     });
  //   } else {
  //     console.log('Battery API not supported');
  //   }
  // };  

  // const toggleFlashlight = () => {
  //   navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
  //     .then((stream) => {
  //       const track = stream.getVideoTracks()[0];
  
  //       // ImageCapture is used to control the camera's torch (flashlight)
  //       const imageCapture = new ImageCapture(track);
  
  //       imageCapture.getPhotoCapabilities().then((capabilities: any) => {
  //         if (capabilities.fillLightMode.includes('torch')) {
  //           track.applyConstraints({
  //             advanced: [{ torch: true }]
  //           }).then(() => {
  //             console.log('Torch turned on');
  //           }).catch((error) => {
  //             console.log('Error turning on torch:', error);
  //           });
  //         } else {
  //           console.log('Torch not supported on this device');
  //         }
  //       });
  //     })
  //   .catch((error) => {
  //     console.error('Error accessing flashlight:', error);
  //   });
  // };

  const vibrateDevice = () => {
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200]); // Vibrate 200ms, pause 100ms, vibrate 200ms
    } else {
      console.log('Vibration API not supported');
    }
  };

  const openCamera = () => {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.accept = 'image/*'; // To capture images
    inputElement.capture = 'environment'; // 'user' for front camera, 'environment' for back camera
    inputElement.style.display = 'none'; // Hide the input element

    inputElement.addEventListener('change', (event: any) => {
      const file = event.target.files[0];
      if (file) {
        console.log('Image captured:', file); // You can handle the captured image here
      }
    });

    // Append the input element to the body and trigger the click
    document.body.appendChild(inputElement);
    inputElement.click();

    // Remove the input element from the DOM after use
    document.body.removeChild(inputElement);
  }

  return (
    <PageContainer title={`Dashboard`} description={`Dashboard Page`}>
      <Box>
        <Grid container spacing={3}>
          {cards && cards.length > 0 ? (
            cards.map((c: any, cidx: any) => (
              <Grid key={cidx} item xs={12}>
                <DCard 
                  title={`${cidx + 1}. ${c.name}`} 
                  action={
                    c.name == `Camera` ? <Button style={{ color: `var(--fontColor)` }} onClick={() => openCamera()}>Open Camera</Button> 
                  : 
                    c.name == `Camera2` ? <input type="file" accept="image/*" capture="environment" /> 
                  : 
                    c.name == `Vibrate` ? <Button style={{ color: `var(--fontColor)` }} onClick={() => vibrateDevice()}>Vibrate</Button> 
                  : 
                    c.name == `Share` ? <Button startIcon={<Share />} style={{ color: `var(--fontColor)` }} onClick={() => openShare()}>Share</Button> 
                  :  <></>} 
                />
              </Grid>
            ))
          ) : <></>}
          <Grid item xs={12} lg={8}>
            <SalesOverview />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ProductPerformance />
          </Grid>
          <Grid item xs={12}>
            <Blog />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}