import { useState } from "react";
import {
  IonLabel,
  IonButton,
  IonIcon,
  IonModal,
  IonCard,
  IonCardContent,
  IonList,
  IonRadioGroup,
  IonRadio,
  IonItem,
} from "@ionic/react";
import { globeOutline } from "ionicons/icons";
import { useTranslation } from "react-i18next";
import { enGB, ru } from "date-fns/locale";
import setDefaultOptions from "date-fns/setDefaultOptions";
import "./MultiLanguageModal.css";

const MultiLanguage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { t, i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng).catch((err) => console.error(err));
  };

  if (t("local") === "en-GB") {
    setDefaultOptions({ locale: enGB });
  } else if (t("local") === "ru") {
    setDefaultOptions({ locale: ru });
  }

  return (
    <>
      <IonButton
        slot="end"
        fill="clear"
        onClick={() => setIsOpen(true)}
      >
        <IonIcon
          color="light"
          icon={globeOutline}
        />
      </IonButton>
      <IonModal
        isOpen={isOpen}
        id="settings-modal"
        backdropDismiss={false}
      >
        <IonCard color="light">
          <IonCardContent class="align-center">
            <IonList>
              <IonRadioGroup value={i18n.language}>
                <IonItem>
                  <IonLabel>english</IonLabel>
                  <IonRadio
                    color="basic"
                    slot="end"
                    value="en"
                    onClick={() => {
                      changeLanguage("en");
                    }}
                  ></IonRadio>
                </IonItem>

                <IonItem>
                  <IonLabel>русский</IonLabel>
                  <IonRadio
                    color="basic"
                    slot="end"
                    value="ru"
                    onClick={() => {
                      changeLanguage("ru");
                    }}
                  ></IonRadio>
                </IonItem>
              </IonRadioGroup>
            </IonList>
            <IonButton
              color="basic"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Ok
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonModal>
    </>
  );
};

export default MultiLanguage;
