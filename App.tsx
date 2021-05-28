import React, { useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import * as Notifications from 'expo-notifications';

import Routes from './src/routes/index';
import { PlantProps } from './src/libs/storage';

import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost';

export default function App() {
  const [ fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  useEffect(() => {
    //Apresenta as notificações recebidas na hora 
    const subscription = Notifications.addNotificationReceivedListener(
      async notifications => {
        const data = notifications.request.content.data.plant as PlantProps;
        console.log(data);
      });

      return () => subscription.remove();

  //   async function notifications(){
  //     //Cancela todas as notificações
  //     await Notifications.cancelAllScheduledNotificationsAsync();

  //     //Mostar todas as notificações
  //     const data = await Notifications.getAllScheduledNotificationsAsync();
  //     console.log("-------------- Notificações Agendadas --------------")
  //     console.log(data);
  //   }

  //   notifications();
   })
  if(!fontsLoaded)
    return <AppLoading/>
  
    return (
        <Routes/>
    ) 
  }
  
