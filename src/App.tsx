import { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import TabHome from "./pages/TabHome";
import TabDetails from "./pages/TabDetails";
import "./App.css";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import { storage } from "./data/Storage";

import type { Cycle } from "./data/ClassCycle";
import { CyclesContext } from "./state/Context";

setupIonicReact();

const App: React.FC = () => {
  const [cycles, setCycles] = useState<Cycle[]>([]);

  async function updateCycles(newCycles: Cycle[]) {
    const maxOfCycles = 7;
    if (newCycles.length > maxOfCycles) {
      newCycles.splice(maxOfCycles);
    }
    setCycles(newCycles);
    await storage.set.cycles(newCycles);
  }

  useEffect(() => {
    storage.get
      .cycles()
      .then(setCycles)
      .catch((err) =>
        console.error(`Can't get cycles ${(err as Error).message}`),
      );
  }, []);

  return (
    <CyclesContext.Provider value={{ cycles, updateCycles }}>
      <IonApp>
        <IonReactRouter>
          <IonHeader class="ion-no-border">
            <IonToolbar color="basic">
              <IonTitle color="light">Hello!</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonContent>
            <IonTabs>
              <IonRouterOutlet>
                <Route
                  exact
                  path="/home"
                >
                  <TabHome />
                </Route>

                <Route
                  exact
                  path="/details"
                >
                  <TabDetails />
                </Route>

                <Route
                  exact
                  path="/"
                >
                  <Redirect to="/home" />
                </Route>

                <Route
                  exact
                  path="/peri/"
                >
                  <Redirect to="/home" />
                </Route>
              </IonRouterOutlet>

              <IonTabBar
                slot="top"
                color="basic"
              >
                <IonTabButton
                  tab="home"
                  href="/home"
                >
                  <IonLabel>Home</IonLabel>
                </IonTabButton>
                <IonTabButton
                  tab="details"
                  href="/details"
                >
                  <IonLabel>Details</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </IonContent>
        </IonReactRouter>
      </IonApp>
    </CyclesContext.Provider>
  );
};

export default App;
