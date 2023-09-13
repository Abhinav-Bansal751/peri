import { useContext } from "react";
import { IonContent, IonModal, IonButton, IonCol } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { useTranslation } from "react-i18next";

import "swiper/css";
import "swiper/css/pagination";

import "./InfoModal.css";

import { CyclesContext } from "../state/Context";
import {
  getAverageLengthOfCycle,
  getDayOfCycle,
  getPhase,
  getOvulationStatus,
  getPregnancyChance,
} from "../state/CalculationLogics";

interface PropsInfoModal {
  isOpen: boolean;
  setIsOpen: (newIsOpen: boolean) => void;
}

const InfoModal = (props: PropsInfoModal) => {
  const { t } = useTranslation();
  const cycles = useContext(CyclesContext).cycles;

  const lengthOfCycle = getAverageLengthOfCycle(cycles);
  const currentDay = getDayOfCycle(cycles);
  const ovulationStatus = getOvulationStatus(cycles);
  const pregnancyChance = getPregnancyChance(cycles);

  const phase = getPhase(cycles);

  return (
    <IonModal
      id="info-modal"
      backdropDismiss={false}
      isOpen={props.isOpen}
    >
      <Swiper
        pagination={{
          type: "fraction",
        }}
        modules={[Pagination]}
      >
        <SwiperSlide key={1}>
          <IonContent
            className="ion-padding"
            color="background"
          >
            <p
              style={{
                fontWeight: "bold",
                fontSize: "25px",
                color: "var(--ion-color-dark-basic)",
                marginBottom: "30px",
                marginTop: "60px",
              }}
            >
              Day {currentDay}/{lengthOfCycle}
            </p>
            <ul>
              <li
                style={{
                  fontSize: "16px",
                  color: "var(--ion-color-dark)",
                  marginBottom: "20px",
                }}
              >
                <span
                  style={{
                    color: "var(--ion-color-dark-basic)",
                    fontWeight: "bold",
                  }}
                >
                  {phase.title}
                </span>
                <span> is current phase of cycle</span>
              </li>
              <li
                style={{
                  fontSize: "16px",
                  color: "var(--ion-color-dark)",
                  marginBottom: "20px",
                }}
              >
                <span>{t("Ovulation")}</span>
                <span
                  style={{
                    color: "var(--ion-color-dark-basic)",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  {ovulationStatus}
                </span>
              </li>
              <li
                style={{
                  fontSize: "16px",
                  color: "var(--ion-color-dark)",
                  marginBottom: "20px",
                }}
              >
                <span
                  style={{
                    color: "var(--ion-color-dark-basic)",
                    fontWeight: "bold",
                  }}
                >
                  {pregnancyChance}
                </span>
                <span> {t("chance of getting pregnant")}</span>
              </li>
            </ul>
          </IonContent>
        </SwiperSlide>
        <SwiperSlide key={2}>
          <IonContent
            className="ion-padding"
            color="background"
          >
            <p
              style={{
                fontWeight: "bold",
                fontSize: "25px",
                color: "var(--ion-color-dark-basic)",
                marginBottom: "30px",
                marginTop: "60px",
              }}
            >
              Day {currentDay}/{lengthOfCycle}
            </p>
            <dl>
              <dd
                style={{
                  fontSize: "16px",
                  color: "var(--ion-color-dark)",
                  marginBottom: "20px",
                }}
              >
                <span>{phase.description.startDescription} </span>
                <span
                  style={{
                    color: "var(--ion-color-dark-basic)",
                    fontWeight: "bold",
                  }}
                >
                  {phase.description.hormone}
                </span>
                <span> {phase.description.endDescription}</span>
              </dd>
            </dl>
          </IonContent>
        </SwiperSlide>
        <SwiperSlide key={3}>
          <IonContent
            className="ion-padding"
            color="background"
          >
            <p
              style={{
                fontWeight: "bold",
                fontSize: "25px",
                color: "var(--ion-color-dark-basic)",
                marginBottom: "30px",
                marginTop: "60px",
              }}
            >
              {t("Frequent symptoms")}
            </p>
            <ul>
              {phase.symptoms.map((item, idx) => (
                <li
                  style={{
                    fontSize: "16px",
                    color: "var(--ion-color-dark)",
                    marginBottom: "20px",
                  }}
                  key={idx}
                >
                  {item}
                </li>
              ))}
            </ul>
            <IonCol style={{ marginTop: "50px" }}>
              <IonButton
                class="ok"
                color="dark-basic"
                onClick={() => props.setIsOpen(false)}
              >
                OK
              </IonButton>
            </IonCol>
          </IonContent>
        </SwiperSlide>
      </Swiper>
    </IonModal>
  );
};

export default InfoModal;
