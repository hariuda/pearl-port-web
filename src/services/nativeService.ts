import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';

export async function initializeNativeApp(isDark: boolean = true): Promise<void> {
  if (!Capacitor.isNativePlatform()) {
    return;
  }

  try {
    // 1. Configure Status Bar to match dark/light theme
    if (isDark) {
      await StatusBar.setStyle({ style: Style.Dark });
      if (Capacitor.getPlatform() === 'android') {
        await StatusBar.setBackgroundColor({ color: '#0B0F19' });
      }
    } else {
      await StatusBar.setStyle({ style: Style.Light });
      if (Capacitor.getPlatform() === 'android') {
        await StatusBar.setBackgroundColor({ color: '#20104E' });
      }
    }

    // 2. Hide Splash Screen immediately once UI is mounted
    await SplashScreen.hide({
      fadeOutDuration: 0
    });
  } catch (error) {
    console.warn('Native plugin initialization note:', error);
  }
}
