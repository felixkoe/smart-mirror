import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppearanceProvider } from 'react-native-appearance';
import MainNavigation from "./Components/Navigation/BottomTabNavigation";

/* This is where the magic happens lol */

export default function App() {
    const colorScheme = useColorScheme();
    return (
        <AppearanceProvider>
            <SafeAreaProvider>
                <MainNavigation/>
            </SafeAreaProvider>
        </AppearanceProvider>
    );
}

