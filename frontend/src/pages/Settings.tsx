import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText, IonToggle } from "@ionic/react";
import { useEffect, useState } from "react";
import type { ToggleCustomEvent } from "@ionic/react";
import Header from "../components/Header";

const Settings: React.FC = () => {
  const [paletteToggle, setPaletteToggle] = useState(false);
  const toggleChange = (ev: ToggleCustomEvent) => {
    toggleDarkPalette(ev.detail.checked);
  };

  // Add or remove the "ion-palette-dark" class on the html element
  const toggleDarkPalette = (shouldAdd: boolean) => {
    document.documentElement.classList.toggle("ion-palette-dark", shouldAdd);
  };

  // Check/uncheck the toggle and update the palette based on isDark
  const initializeDarkPalette = (isDark: boolean) => {
    setPaletteToggle(isDark);
    toggleDarkPalette(isDark);
  };

  useEffect(() => {
    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    // Initialize the dark palette based on the initial
    // value of the prefers-color-scheme media query
    initializeDarkPalette(prefersDark.matches);

    const setDarkPaletteFromMediaQuery = (mediaQuery: MediaQueryListEvent) => {
      initializeDarkPalette(mediaQuery.matches);
    };

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener("change", setDarkPaletteFromMediaQuery);

    return () => {
      prefersDark.removeEventListener("change", setDarkPaletteFromMediaQuery);
    };
  }, []);

  return (
    <IonPage>
      <Header title='Settings' />

      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>Settings</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonText>Settings</IonText>
        <IonToggle
          checked={paletteToggle}
          onIonChange={toggleChange}
          justify='space-between'
        >
          Dark Mode
        </IonToggle>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
