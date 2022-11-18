import React, { useState, useRef } from 'react';
import {
    IonButton,
    IonContent,
    IonItem,
    IonList,
    IonLabel,
    IonModal,
    IonInput,
    IonDatetime,
    IonCol,
    IonImg,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonIcon,
    IonButtons,
} from '@ionic/react';
import './WelcomeModal.css';

import { set } from '../data/Storage';

import { calendarClear } from 'ionicons/icons';

interface PropsWelcomeModal {
    isOpen: boolean;
    setIsOpen: (newIsOpen: boolean) => void;
}

const Welcome = (props: PropsWelcomeModal) => {
    const modal = useRef<HTMLIonModalElement>(null);
    const input = useRef<HTMLIonInputElement>(null);
    const datetime = useRef<null | HTMLIonDatetimeElement>(null);

    const now = new Date().toISOString().slice(0, 10);
    const [date, setDate] = useState(now);

    const confirmDate = () => {
        datetime.current?.confirm();
        modal.current?.dismiss(input.current?.value, 'confirm');
    }

    return (
        <IonModal isOpen={props.isOpen}>
            <IonHeader class="ion-no-border">
                <IonToolbar color="light">
                    <IonTitle color="dark-basic">Hello!</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen color="basic">
                <div id="welcome-rectangle">
                    <IonList class="transparent-list">
                        <IonCol>
                            <IonLabel
                                style={{ fontWeight: "bold" }}
                                color="dark-basic"
                            >
                                Please enter your details so that you can already make a forecast.
                            </IonLabel>
                        </IonCol>
                        <IonItem color="light">
                            <IonLabel>Cycle length</IonLabel>
                            <IonInput
                                type="number"
                                placeholder="none"
                                min="14"
                                max="99"
                                onIonChange={(e) => console.log(e.detail.value!)}
                            >
                            </IonInput>
                        </IonItem>
                        <IonItem color="light">
                            <IonLabel>Period length</IonLabel>
                            <IonInput
                                type="number"
                                placeholder="none"
                                min="1"
                                max="9"
                                onIonChange={(e) => console.log(e.detail.value!)}
                            >
                            </IonInput>
                        </IonItem>
                        <IonItem lines="none" color="light" id="choose-date">
                            <IonLabel>Start of last period</IonLabel>
                            <IonIcon slot="end" color="dark" size="small" icon={calendarClear}></IonIcon>
                            <p>{date}</p>
                            <IonModal
                                id="choose-date-modal"
                                ref={modal}
                                trigger="choose-date"
                            >
                                <IonDatetime
                                    ref={datetime}
                                    color="basic"
                                    presentation="date"
                                    id="datetime"
                                    locale="en-US"
                                    onIonChange={(e) => {
                                        if (e.detail.value) {
                                            setDate(e.detail.value.toString().slice(0, 10));
                                            console.log(e.detail.value.toString().slice(0, 10));
                                        }
                                    }}
                                >
                                    <IonButtons slot="buttons">
                                        <IonButton color="basic" onClick={confirmDate}>Confirm</IonButton>
                                    </IonButtons>
                                </IonDatetime>
                            </IonModal>
                        </IonItem>
                    </IonList>
                </div>
                <div id="welcome-rectangle-bottom"></div>
                <IonList class="transparent-list">
                    <IonCol>
                        <IonLabel color="dark-basic">
                            <h2 style={{ fontWeight: "bold" }}>
                                But also you can just continue by clicking on the button.
                            </h2>
                        </IonLabel>
                    </IonCol>
                    <IonCol>
                        <IonImg class="img-welcome" src='../../assets/white-uterus.svg' />
                    </IonCol>
                    <IonCol>
                        <IonButton
                            class="continue-button"
                            onClick={() => {
                                props.setIsOpen(false);
                                set("welcome", true);
                            }}
                        >
                            Continue
                        </IonButton>
                    </IonCol>
                </IonList>
            </IonContent>
        </IonModal>
    );
}

export default Welcome;
