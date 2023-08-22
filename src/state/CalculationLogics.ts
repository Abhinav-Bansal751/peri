import i18n from "i18next";
import { Cycle } from "../data/ClassCycle";

const millisecondsInDay = 24 * 60 * 60 * 1000;

export function getOvulationStatus(cycleLength: number, dayOfCycle: number) {
  if (!cycleLength || !dayOfCycle) {
    return "";
  }

  const lutealPhaseLength = 14;
  const ovulationDay = cycleLength - lutealPhaseLength;
  const diffDay = ovulationDay - dayOfCycle;
  if (diffDay < -2) {
    return i18n.t("finished");
  }
  if (diffDay < 0) {
    return i18n.t("possible");
  }
  if (diffDay === 0) {
    return i18n.t("today");
  }
  if (diffDay === 1) {
    return i18n.t("tomorrow");
  }
  return `${i18n.t("in")} ${diffDay} ${i18n.t("Days_interval", {
    postProcess: "interval",
    count: diffDay,
  })}`;
}

export function getPregnancyChance(cycleLength: number, dayOfCycle: number) {
  if (!cycleLength || !dayOfCycle) {
    return "";
  }

  const lutealPhaseLength = 14;
  const ovulationDay = cycleLength - lutealPhaseLength;
  const diffDay = ovulationDay - dayOfCycle;

  if (diffDay >= -2 && diffDay <= 4) {
    return i18n.t("high");
  }
  return i18n.t("low");
}

export function getDaysBeforePeriod(cycleLength: number, startDate: string) {
  if (!startDate || !cycleLength) {
    return {
      title: i18n.t("Period in"),
      days: i18n.t("no info"),
    };
  }

  const dateOfFinish = new Date(startDate);
  dateOfFinish.setDate(dateOfFinish.getDate() + cycleLength);
  dateOfFinish.setHours(0, 0, 0, 0);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const dayBefore = Math.round(
    (Number(dateOfFinish) - Number(now)) / millisecondsInDay,
  );

  if (dayBefore > 0) {
    return {
      title: i18n.t("Period in"),
      days: `${dayBefore} ${i18n.t("Days_interval", {
        postProcess: "interval",
        count: dayBefore,
      })}`,
    };
  }
  if (dayBefore === 0) {
    return {
      title: i18n.t("Period"),
      days: i18n.t("today"),
    };
  }
  return {
    title: i18n.t("Delay"),
    days: `${Math.abs(dayBefore)} ${i18n.t("Days_interval", {
      postProcess: "interval",
      count: Math.abs(dayBefore),
    })}`,
  };
}

export function getDayOfCycle(startDate: string) {
  if (!startDate) {
    return "";
  }

  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const diff =
    Math.ceil((currentDate.getTime() - start.getTime()) / millisecondsInDay) +
    1;

  return diff.toString();
}

export function getPhase(
  lengthOfCycle: number,
  lengthOfPeriod: number,
  currentDay: number,
) {
  const lutealPhaseLength = 14;
  const ovulationOnError = 3;

  const phases = {
    non: {
      title: i18n.t("The menstrual cycle can be divided into 4 phases."),
      description: i18n.t(
        "When information about your cycle appears, it will be reported which phase you are in.",
      ),
      symptoms: [
        i18n.t(
          "This section will indicate the symptoms characteristic of this cycle.",
        ),
      ],
    },
    menstrual: {
      title: i18n.t("Menstrual phase"),
      description: i18n.t("This cycle is accompanied by low hormone levels."),
      symptoms: [
        i18n.t("lack of energy and strength"),
        i18n.t("pain"),
        i18n.t("weakness and irritability"),
        i18n.t("increased appetite"),
      ],
    },
    follicular: {
      title: i18n.t("Follicular phase"),
      description: i18n.t(
        "The level of estrogen in this phase rises and reaches a maximum level.",
      ),
      symptoms: [
        i18n.t("strength and vigor appear"),
        i18n.t("endurance increases"),
        i18n.t("new ideas and plans appear"),
        i18n.t("libido increases"),
      ],
    },
    ovulation: {
      title: i18n.t("Ovulation phase"),
      description: i18n.t(
        "Once estrogen levels peak, they trigger the release of two important ovulation hormones, follicle-stimulating hormone and luteinizing hormone.",
      ),
      symptoms: [
        i18n.t("increased sexual desire"),
        i18n.t("optimistic mood"),
        i18n.t("mild fever"),
        i18n.t("lower abdominal pain"),
        i18n.t("chest discomfort and bloating"),
        i18n.t("characteristic secretions"),
      ],
    },
    luteal: {
      title: i18n.t("Luteal phase"),
      description: i18n.t(
        "Levels of the hormones estrogen and progesterone first rise and then drop sharply just before a period. Progesterone reaches its peak in the luteal phase.",
      ),
      symptoms: [
        i18n.t("breast tenderness"),
        i18n.t("puffiness"),
        i18n.t("acne and skin rashes"),
        i18n.t("increased appetite"),
        i18n.t("diarrhea or constipation"),
        i18n.t("irritability and depressed mood"),
      ],
    },
  };

  if (!lengthOfCycle || !currentDay || !lengthOfPeriod) {
    return phases.non;
  }

  const ovulationDay = lengthOfCycle - lutealPhaseLength;

  if (currentDay <= lengthOfPeriod) {
    return phases.menstrual;
  }
  if (currentDay <= ovulationDay - ovulationOnError) {
    return phases.follicular;
  }
  if (currentDay <= ovulationDay) {
    return phases.ovulation;
  }
  return phases.luteal;
}

export function getAverageLengthOfCycle(cycles: Cycle[]) {
  if (cycles.length === 0) {
    return 0;
  }

  if (cycles.length === 1) {
    return cycles[0].cycleLength;
  }

  const sum = cycles.reduce((prev, current, idx) => {
    if (idx > 0) {
      return prev + current.cycleLength;
    }
    return 0;
  }, 0);

  return Math.round(sum / (cycles.length - 1));
}

export function getAverageLengthOfPeriod(cycles: Cycle[]) {
  if (cycles.length === 0) {
    return 0;
  }

  if (cycles.length === 1) {
    return cycles[0].periodLength;
  }

  const sum = cycles.reduce((prev, current, idx) => {
    if (idx > 0) {
      return prev + current.periodLength;
    }
    return 0;
  }, 0);

  return Math.round(sum / (cycles.length - 1));
}

export function getNewCyclesHistory(periodDays: string[]) {
  periodDays.sort();
  const newCycles: Cycle[] = [
    {
      cycleLength: 28,
      periodLength: 1,
      startDate: periodDays[0],
    },
  ];
  for (let i = 1; i < periodDays.length; i++) {
    const date = new Date(periodDays[i]);
    const prevDate = new Date(periodDays[i - 1]);
    const diffInDays = Math.abs(
      (date.getTime() - prevDate.getTime()) / millisecondsInDay,
    );

    if (diffInDays < 2) {
      newCycles[0].periodLength++;
    } else {
      newCycles[0].cycleLength = diffInDays + newCycles[0].periodLength - 1;
      newCycles.unshift({
        cycleLength: 0,
        periodLength: 1,
        startDate: periodDays[i],
      });
    }
  }

  return newCycles;
}
