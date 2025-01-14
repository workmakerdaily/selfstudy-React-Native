import React, { useEffect, useState } from "react";
import { StatusBar, Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { ThemeProvider } from 'styled-components/native';
import { theme } from "./theme";
import Navigation from "./navigations";
import { images } from "./utils/images";
import { ProgressProvider, UserProvider } from './contexts';

const cacheImages = images => {
    return images.map(image => {
        if (typeof image === 'string') {
            return Image.prefetch(image);
        } else {
            return Asset.fromModule(image).downloadAsync();
        }
    });
};

const cacheFonts = fonts => {
    return fonts.map(font => Font.loadAsync(font));
};

const App = () => {

    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const prepareResources = async () => {
            try {
                await SplashScreen.preventAutoHideAsync();

                const imageAssets = cacheImages([
                    require("../assets/splash-icon.png"),
                    ...Object.values(images),
                ]);
                const fontAssets = cacheFonts([]);

                await Promise.all([...imageAssets, ...fontAssets]);
            } catch (e) {
                console.error(e);
            } finally {
                setIsReady(true);
                await SplashScreen.hideAsync();
            }
        };

        prepareResources();
    }, []);

    if (!isReady) {
        return null;
    }

    return (
        <ThemeProvider theme={theme}>
            <UserProvider>
                <ProgressProvider>
                    <StatusBar barStyle="dark-content" />
                    <Navigation />
                </ProgressProvider>
            </UserProvider>
        </ThemeProvider>
    );
};

export default App;