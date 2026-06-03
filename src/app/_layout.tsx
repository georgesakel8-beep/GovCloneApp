import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import React from 'react';
import { useColorScheme } from 'react-native';
// Εισάγουμε το Slot από το expo-router
import { Slot } from 'expo-router';

import { AnimatedSplashOverlay } from '@/components/animated-icon';

export default function TabLayout() {
    const colorScheme = useColorScheme();
    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <AnimatedSplashOverlay />
            {/* Αντικαθιστούμε το <AppTabs /> με το <Slot /> */}
            <Slot />
        </ThemeProvider>
    );
}