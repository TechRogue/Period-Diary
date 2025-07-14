import { it, expect, vi, describe } from "vitest";
import i18n from "i18next";
import {
  addDays,
  parseISO,
  startOfDay,
  startOfToday,
  startOfTomorrow,
  startOfYesterday,
  subDays,
  format,
} from "date-fns";
import { Cycle } from "../data/ClassCycle";
import {
  getOvulationStatus,
  getPregnancyChance,
  getDayOfCycle,
  getAverageLengthOfCycle,
  getAverageLengthOfPeriod Diaryod,
  getDaysBeforePeriod Diaryod,
  getPhase,
  getNewCyclesHistory,
  getActiveDates,
  getPeriod DiaryodDates,
  getPeriod DiaryodDatesWithNewElement,
  getLastStartDate,
  getLengthOfLastPeriod Diaryod,
  getForecastPeriod DiaryodDates,
  getOvulationDates,
  getPeriod DiaryodDatesOfLastCycle,
} from "../state/CalculationLogics";

const maxDisplayedCycles = 6;

describe("getOvulationStatus", () => {
  it("cycles array is empty", () => {
    expect(getOvulationStatus([], maxDisplayedCycles)).toEqual("");
  });

  it("a few days before ovulation", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);

    const cycles: Cycle[] = [];
    let date = addDays(startOfToday(), 24);

    for (let i = 0; i < 6; ++i) {
      date = subDays(date, 28);
      cycles.push({
        cycleLength: 28,
        Period DiaryodLength: 6,
        startDate: date.toString(),
      });
    }
    cycles[0].cycleLength = 0;

    expect(getOvulationStatus(cycles, maxDisplayedCycles)).toEqual(
      `${i18n.t("in")} 9 ${i18n.t("Days", {
        postProcess: "interval",
        count: 9,
      })}`,
    );
  });

  it("ovulation is tomorrow", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementationOnce((key) => key);

    const cycles: Cycle[] = [];
    let date = addDays(startOfToday(), 16);

    for (let i = 0; i < 6; ++i) {
      date = subDays(date, 28);
      cycles.push({
        cycleLength: 28,
        Period DiaryodLength: 6,
        startDate: date.toString(),
      });
    }
    cycles[0].cycleLength = 0;

    expect(getOvulationStatus(cycles, maxDisplayedCycles)).toEqual("tomorrow");
  });

  it("ovulation is today", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementationOnce((key) => key);

    const cycles: Cycle[] = [];
    let date: Date = addDays(startOfToday(), 15);

    for (let i = 0; i < 6; ++i) {
      date = subDays(date, 28);
      cycles.push({
        cycleLength: 28,
        Period DiaryodLength: 6,
        startDate: date.toString(),
      });
    }
    cycles[0].cycleLength = 0;

    expect(getOvulationStatus(cycles, maxDisplayedCycles)).toEqual("today");
  });

  it("if ovulation is possible", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementationOnce((key) => key);

    const cycles: Cycle[] = [];
    let date = addDays(startOfToday(), 14);

    for (let i = 0; i < 6; ++i) {
      date = subDays(date, 28);
      cycles.push({
        cycleLength: 28,
        Period DiaryodLength: 6,
        startDate: date.toString(),
      });
    }
    cycles[0].cycleLength = 0;

    expect(getOvulationStatus(cycles, maxDisplayedCycles)).toEqual("possible");
  });

  it("ovulation is finished", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementationOnce((key) => key);

    const cycles: Cycle[] = [];
    let date = addDays(startOfToday(), 10);

    for (let i = 0; i < 6; ++i) {
      date = subDays(date, 28);
      cycles.push({
        cycleLength: 28,
        Period DiaryodLength: 6,
        startDate: date.toString(),
      });
    }
    cycles[0].cycleLength = 0;

    expect(getOvulationStatus(cycles, maxDisplayedCycles)).toEqual("finished");
  });
});

describe("getPregnancyChance", () => {
  it("cycles array is empty", () => {
    expect(getPregnancyChance([], maxDisplayedCycles)).toEqual("");
  });

  it("pregnancy chance is high", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);

    let date = addDays(startOfToday(), 15);
    const cycles: Cycle[] = [];

    for (let i = 0; i < 6; ++i) {
      date = subDays(date, 28);
      cycles.push({
        cycleLength: 28,
        Period DiaryodLength: 6,
        startDate: date.toString(),
      });
    }
    cycles[0].cycleLength = 0;

    expect(getPregnancyChance(cycles, maxDisplayedCycles)).toEqual("High");
  });

  it("pregnancy chance is low", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);
    let date = addDays(startOfToday(), 20);
    const cycles: Cycle[] = [];

    for (let i = 0; i < 6; ++i) {
      date = subDays(date, 28);
      cycles.push({
        cycleLength: 28,
        Period DiaryodLength: 6,
        startDate: date.toString(),
      });
    }
    cycles[0].cycleLength = 0;

    expect(getPregnancyChance(cycles, maxDisplayedCycles)).toEqual("Low");
  });
});

describe("getDayOfCycle", () => {
  it("cycles array is empty", () => {
    expect(getDayOfCycle([])).toEqual(0);
  });

  it("middle of the cycle", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);

    let date = addDays(startOfToday(), 15);

    const cycles: Cycle[] = [];

    for (let i = 0; i < 6; ++i) {
      date = subDays(date, 28);
      cycles.push({
        cycleLength: 28,
        Period DiaryodLength: 6,
        startDate: date.toString(),
      });
    }
    cycles[0].cycleLength = 0;

    expect(getDayOfCycle(cycles)).toEqual(14);
  });
});

describe("getAverageLengthOfCycle", () => {
  it("cycles array is empty", () => {
    expect(getAverageLengthOfCycle([], maxDisplayedCycles)).toEqual(0);
  });

  it("only one item in the cycles array", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);

    const cycles: Cycle[] = [
      {
        cycleLength: 28,
        Period DiaryodLength: 5,
        startDate: "2023-06-30",
      },
    ];
    expect(getAverageLengthOfCycle(cycles, maxDisplayedCycles)).toEqual(28);
  });

  it("more than one item in the cycles array", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);

    const cycles: Cycle[] = [
      {
        cycleLength: 0,
        Period DiaryodLength: 6,
        startDate: "2023-06-30",
      },
      {
        cycleLength: 29,
        Period DiaryodLength: 6,
        startDate: "2023-06-03",
      },
      {
        cycleLength: 27,
        Period DiaryodLength: 4,
        startDate: "2023-05-07",
      },
    ];
    expect(getAverageLengthOfCycle(cycles, maxDisplayedCycles)).toEqual(28);
  });
});

describe("getAverageLengthOfPeriod Diaryod", () => {
  it("cycles array is empty", () => {
    expect(getAverageLengthOfPeriod Diaryod([], maxDisplayedCycles)).toEqual(0);
  });

  it("only one item in the cycles array", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);

    const cycles: Cycle[] = [
      {
        cycleLength: 28,
        Period DiaryodLength: 5,
        startDate: "2023-06-30",
      },
    ];
    expect(getAverageLengthOfPeriod Diaryod(cycles, maxDisplayedCycles)).toEqual(5);
  });

  it("more than one item in the cycles array", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);

    const cycles: Cycle[] = [
      {
        cycleLength: 0,
        Period DiaryodLength: 6,
        startDate: "2023-06-30",
      },
      {
        cycleLength: 28,
        Period DiaryodLength: 6,
        startDate: "2023-06-03",
      },
      {
        cycleLength: 26,
        Period DiaryodLength: 4,
        startDate: "2023-05-07",
      },
    ];
    expect(getAverageLengthOfPeriod Diaryod(cycles, maxDisplayedCycles)).toEqual(5);
  });
});

describe("getDaysBeforePeriod Diaryod", () => {
  it("cycles array is empty", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);

    expect(getDaysBeforePeriod Diaryod([], maxDisplayedCycles)).toEqual({
      title: i18n.t("Period Diaryod in"),
      days: i18n.t("---"),
    });
  });

  it("Period Diaryod in the few days", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);

    let date = addDays(startOfToday(), 10);
    const cycles: Cycle[] = [];

    for (let i = 0; i < 6; ++i) {
      date = subDays(date, 28);
      cycles.push({
        cycleLength: 28,
        Period DiaryodLength: 6,
        startDate: date.toString(),
      });
    }
    cycles[0].cycleLength = 0;

    expect(getDaysBeforePeriod Diaryod(cycles, maxDisplayedCycles)).toEqual({
      title: i18n.t("Period Diaryod in"),
      days: `10 ${i18n.t("Days", {
        postProcess: "interval",
        count: 10,
      })}`,
    });
  });

  it("Period Diaryod in 1 Day", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);

    let date = startOfTomorrow();
    const cycles: Cycle[] = [];

    for (let i = 0; i < 6; ++i) {
      date = subDays(date, 28);
      cycles.push({
        cycleLength: 28,
        Period DiaryodLength: 6,
        startDate: date.toString(),
      });
    }
    cycles[0].cycleLength = 0;

    expect(getDaysBeforePeriod Diaryod(cycles, maxDisplayedCycles)).toEqual({
      title: i18n.t("Period Diaryod in"),
      days: `1 ${i18n.t("Days", {
        postProcess: "interval",
        count: 1,
      })}`,
    });
  });

  it("Period Diaryod is today", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);

    let date = startOfToday();

    const cycles: Cycle[] = [];

    for (let i = 0; i < 6; ++i) {
      date = subDays(date, 28);
      cycles.push({
        cycleLength: 28,
        Period DiaryodLength: 6,
        startDate: date.toString(),
      });
    }
    cycles[0].cycleLength = 0;

    expect(getDaysBeforePeriod Diaryod(cycles, maxDisplayedCycles)).toEqual({
      title: i18n.t("Period Diaryod"),
      days: i18n.t("today"),
    });
  });

  it("cycles length is one and Period Diaryod is today", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);

    const date = startOfToday();

    const cycles: Cycle[] = [
      {
        cycleLength: 28,
        Period DiaryodLength: 6,
        startDate: subDays(date, 28).toString(),
      },
    ];

    expect(getDaysBeforePeriod Diaryod(cycles, maxDisplayedCycles)).toEqual({
      title: i18n.t("Period Diaryod is"),
      days: i18n.t("possible today"),
    });
  });

  it("delay 1 day", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);

    let date = startOfYesterday();
    const cycles: Cycle[] = [];

    for (let i = 0; i < 6; ++i) {
      date = subDays(date, 28);
      cycles.push({
        cycleLength: 28,
        Period DiaryodLength: 6,
        startDate: date.toString(),
      });
    }
    cycles[0].cycleLength = 0;

    expect(getDaysBeforePeriod Diaryod(cycles, maxDisplayedCycles)).toEqual({
      title: i18n.t("Delay"),
      days: `1 ${i18n.t("Days", {
        postProcess: "interval",
        count: 1,
      })}`,
    });
  });

  it("delay a few days", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);

    let date = subDays(startOfToday(), 10);
    const cycles: Cycle[] = [];

    for (let i = 0; i < 6; ++i) {
      date = subDays(date, 28);
      cycles.push({
        cycleLength: 28,
        Period DiaryodLength: 6,
        startDate: date.toString(),
      });
    }
    cycles[0].cycleLength = 0;

    expect(getDaysBeforePeriod Diaryod(cycles, maxDisplayedCycles)).toEqual({
      title: i18n.t("Delay"),
      days: `10 ${i18n.t("Days", {
        postProcess: "interval",
        count: 10,
      })}`,
    });
  });

  it("cycles length is one and delay a few days", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);

    const date = subDays(startOfToday(), 10);
    const cycles: Cycle[] = [
      {
        cycleLength: 28,
        Period DiaryodLength: 6,
        startDate: subDays(date, 28).toString(),
      },
    ];

    expect(getDaysBeforePeriod Diaryod(cycles, maxDisplayedCycles)).toEqual({
      title: i18n.t("Period Diaryod is"),
      days: i18n.t("possible today"),
    });
  });

  it("today is one of the days of Period Diaryod", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);

    let date = addDays(startOfToday(), 25);
    const cycles: Cycle[] = [];

    for (let i = 0; i < 6; ++i) {
      date = subDays(date, 28);
      cycles.push({
        cycleLength: 28,
        Period DiaryodLength: 6,
        startDate: date.toString(),
      });
    }
    cycles[0].cycleLength = 0;

    expect(getDaysBeforePeriod Diaryod(cycles, maxDisplayedCycles)).toEqual({
      title: i18n.t("Period Diaryod"),
      days: i18n.t("day"),
    });
  });
});

const phases = {
  non: {
    title: "",
    description: "",
    symptoms: [""],
  },
  menstrual: {
    title: "Menstrual phase",
    description: "This cycle is accompanied by low hormone levels.",
    symptoms: [
      "lack of energy and strength",
      "pain",
      "weakness and irritability",
      "increased appetite",
    ],
  },
  follicular: {
    title: "Follicular phase",
    description:
      "The level of estrogen in this phase rises and reaches a maximum level.",
    symptoms: [
      "strength and vigor appear",
      "endurance increases",
      "new ideas and plans appear",
      "libido increases",
    ],
  },
  ovulation: {
    title: "Ovulation phase",
    description:
      "Once estrogen levels peak, they trigger the release of two important ovulation hormones, follicle-stimulating hormone and luteinizing hormone.",
    symptoms: [
      "increased sexual desire",
      "optimistic mood",
      "mild fever",
      "lower abdominal pain",
      "chest discomfort and bloating",
      "characteristic secretions",
    ],
  },
  luteal: {
    title: "Luteal phase",
    description:
      "Levels of the hormones estrogen and progesterone first rise and then drop sharply just before a Period Diaryod. Progesterone reaches its peak in the luteal phase.",
    symptoms: [
      "breast tenderness",
      "puffiness",
      "acne and skin rashes",
      "increased appetite",
      "diarrhea or constipation",
      "irritability and depressed mood",
    ],
  },
};

describe("getPhase", () => {
  it("cycles array is empty", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);
    expect(getPhase([], maxDisplayedCycles)).toEqual(phases.non);
  });

  it("cycle phase is menstrual", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);

    let date = addDays(startOfToday(), 26);
    const cycles: Cycle[] = [];

    for (let i = 0; i < 6; ++i) {
      date = subDays(date, 28);
      cycles.push({
        cycleLength: 28,
        Period DiaryodLength: 6,
        startDate: date.toString(),
      });
    }
    cycles[0].cycleLength = 0;

    expect(getPhase(cycles, maxDisplayedCycles)).toEqual(phases.menstrual);
  });

  it("cycle phase is follicular", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);

    let date = addDays(startOfToday(), 20);
    const cycles: Cycle[] = [];

    for (let i = 0; i < 6; ++i) {
      date = subDays(date, 28);
      cycles.push({
        cycleLength: 28,
        Period DiaryodLength: 6,
        startDate: date.toString(),
      });
    }
    cycles[0].cycleLength = 0;

    expect(getPhase(cycles, maxDisplayedCycles)).toEqual(phases.follicular);
  });

  it("cycle phase is ovulation", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);

    let date = addDays(startOfToday(), 14);
    const cycles: Cycle[] = [];

    for (let i = 0; i < 6; ++i) {
      date = subDays(date, 28);
      cycles.push({
        cycleLength: 28,
        Period DiaryodLength: 6,
        startDate: date.toString(),
      });
    }
    cycles[0].cycleLength = 0;

    expect(getPhase(cycles, maxDisplayedCycles)).toEqual(phases.ovulation);
  });

  it("cycle phase is luteal", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);

    let date = addDays(startOfToday(), 5);
    const cycles: Cycle[] = [];

    for (let i = 0; i < 6; ++i) {
      date = subDays(date, 28);
      cycles.push({
        cycleLength: 28,
        Period DiaryodLength: 6,
        startDate: date.toString(),
      });
    }
    cycles[0].cycleLength = 0;

    expect(getPhase(cycles, maxDisplayedCycles)).toEqual(phases.luteal);
  });
});

describe("getNewCyclesHistory", () => {
  it("Period DiaryodDays array is empty", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);
    expect(getNewCyclesHistory([])).toEqual([]);
  });

  it("Period DiaryodDays array has a clear ranges", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);

    const Period DiaryodDays = [
      "2023-08-04",
      "2023-08-05",
      "2023-08-06",
      "2023-08-07",
      "2023-08-08",
      "2023-08-09",
      "2023-07-07",
      "2023-07-08",
      "2023-07-09",
      "2023-07-10",
      "2023-07-11",
      "2023-07-12",
      "2023-06-09",
      "2023-06-10",
      "2023-06-11",
      "2023-06-12",
      "2023-06-13",
      "2023-06-14",
    ];
    expect(getNewCyclesHistory(Period DiaryodDays)).toEqual([
      { cycleLength: 0, Period DiaryodLength: 6, startDate: "2023-08-04" },
      { cycleLength: 28, Period DiaryodLength: 6, startDate: "2023-07-07" },
      { cycleLength: 28, Period DiaryodLength: 6, startDate: "2023-06-09" },
    ]);
  });

  it("Period DiaryodDays array has not a clear ranges", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);

    const Period DiaryodDays = [
      "2023-08-04",
      "2023-08-06",
      "2023-08-08",
      "2023-08-09",
      "2023-07-07",
      "2023-07-09",
      "2023-07-11",
      "2023-07-12",
      "2023-06-09",
      "2023-06-10",
      "2023-06-12",
      "2023-06-14",
    ];
    expect(getNewCyclesHistory(Period DiaryodDays)).toEqual([
      { cycleLength: 0, Period DiaryodLength: 6, startDate: "2023-08-04" },
      { cycleLength: 28, Period DiaryodLength: 6, startDate: "2023-07-07" },
      { cycleLength: 28, Period DiaryodLength: 6, startDate: "2023-06-09" },
    ]);
  });
});

describe("getPeriod DiaryodDays", () => {
  it("cycles array is empty", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);
    expect(getPeriod DiaryodDates([], maxDisplayedCycles)).toEqual([]);
  });

  it("cycles array has a few items", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);

    const cycles: Cycle[] = [
      {
        cycleLength: 0,
        Period DiaryodLength: 6,
        startDate: "2023-08-05",
      },
      {
        cycleLength: 28,
        Period DiaryodLength: 6,
        startDate: "2023-07-08",
      },
      {
        cycleLength: 26,
        Period DiaryodLength: 4,
        startDate: "2023-06-10",
      },
    ];

    const Period DiaryodDays = [
      "2023-08-05",
      "2023-08-06",
      "2023-08-07",
      "2023-08-08",
      "2023-08-09",
      "2023-08-10",
      "2023-07-08",
      "2023-07-09",
      "2023-07-10",
      "2023-07-11",
      "2023-07-12",
      "2023-07-13",
      "2023-06-10",
      "2023-06-11",
      "2023-06-12",
      "2023-06-13",
    ];

    expect(getPeriod DiaryodDates(cycles, maxDisplayedCycles)).toEqual(Period DiaryodDays);
  });
});

describe("getLastPeriod DiaryodDays", () => {
  it("cycles array is empty", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);
    expect(getPeriod DiaryodDatesOfLastCycle([])).toEqual([]);
  });

  it("cycles array has a few items", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);

    const cycles: Cycle[] = [
      {
        cycleLength: 0,
        Period DiaryodLength: 6,
        startDate: "2023-08-05",
      },
      {
        cycleLength: 28,
        Period DiaryodLength: 6,
        startDate: "2023-07-08",
      },
      {
        cycleLength: 26,
        Period DiaryodLength: 4,
        startDate: "2023-06-10",
      },
    ];

    const lastPeriod DiaryodDays = [
      "2023-08-05",
      "2023-08-06",
      "2023-08-07",
      "2023-08-08",
      "2023-08-09",
      "2023-08-10",
    ];

    expect(getPeriod DiaryodDatesOfLastCycle(cycles)).toEqual(lastPeriod DiaryodDays);
  });
});

describe("getActiveDates", () => {
  it("cycles array is empty", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);

    expect(getActiveDates(startOfToday(), [])).toEqual(true);
  });

  it("now is menstrual phase items and checking 2th day of Period Diaryod", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);

    let date = addDays(startOfToday(), 26);
    const cycles: Cycle[] = [];

    for (let i = 0; i < 6; ++i) {
      date = subDays(date, 28);
      cycles.push({
        cycleLength: 28,
        Period DiaryodLength: 6,
        startDate: date.toString(),
      });
    }
    cycles[0].cycleLength = 0;

    const dateCheck = addDays(startOfDay(new Date(cycles[0].startDate)), 1);
    expect(getActiveDates(dateCheck, cycles)).toEqual(true);
  });

  it("now is menstrual phase items and checking 8th day of cycle", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);

    let date = addDays(startOfToday(), 26);
    const cycles: Cycle[] = [];

    for (let i = 0; i < 6; ++i) {
      date = subDays(date, 28);
      cycles.push({
        cycleLength: 28,
        Period DiaryodLength: 6,
        startDate: date.toString(),
      });
    }
    cycles[0].cycleLength = 0;

    const dateCheck = addDays(startOfDay(new Date(cycles[0].startDate)), 7);
    expect(getActiveDates(dateCheck, cycles)).toEqual(false);
  });

  it("now is follicular phase items and checking not day of cycle less than now", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);

    let date = addDays(startOfToday(), 20);
    const cycles: Cycle[] = [];

    for (let i = 0; i < 6; ++i) {
      date = subDays(date, 28);
      cycles.push({
        cycleLength: 28,
        Period DiaryodLength: 6,
        startDate: date.toString(),
      });
    }
    cycles[0].cycleLength = 0;

    const dateCheck = addDays(startOfDay(new Date(cycles[0].startDate)), 7);
    expect(getActiveDates(dateCheck, cycles)).toEqual(true);
  });

  it("now is follicular phase items and checking not day of cycle more than now", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);

    let date = addDays(startOfToday(), 20);
    const cycles: Cycle[] = [];

    for (let i = 0; i < 6; ++i) {
      date = subDays(date, 28);
      cycles.push({
        cycleLength: 28,
        Period DiaryodLength: 6,
        startDate: date.toString(),
      });
    }
    cycles[0].cycleLength = 0;

    const dateCheck = addDays(startOfDay(new Date(cycles[0].startDate)), 15);
    expect(getActiveDates(dateCheck, cycles)).toEqual(false);
  });

  it("delay a few days and check date is less then the current date", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);

    let date = subDays(startOfToday(), 5);
    const cycles: Cycle[] = [];

    for (let i = 0; i < 6; ++i) {
      date = subDays(date, 28);
      cycles.push({
        cycleLength: 28,
        Period DiaryodLength: 6,
        startDate: date.toString(),
      });
    }
    cycles[0].cycleLength = 0;

    const dateCheck = addDays(startOfDay(new Date(cycles[0].startDate)), 10);
    expect(getActiveDates(dateCheck, cycles)).toEqual(true);
  });

  it("delay a few days and check date is more then the current date", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);

    let date = subDays(startOfToday(), 5);
    const cycles: Cycle[] = [];

    for (let i = 0; i < 6; ++i) {
      date = subDays(date, 28);
      cycles.push({
        cycleLength: 28,
        Period DiaryodLength: 6,
        startDate: date.toString(),
      });
    }
    cycles[0].cycleLength = 0;

    const dateCheck = addDays(startOfDay(new Date(cycles[0].startDate)), 40);
    expect(getActiveDates(dateCheck, cycles)).toEqual(false);
  });
});

describe("getPastFuturePeriod DiaryodDays", () => {
  it("cycles array is empty", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);

    const Period DiaryodDates: string[] = [];
    const nowDate = startOfToday();
    for (let day = 0; day < 5; day++) {
      const Period DiaryodDay = addDays(nowDate, day);
      Period DiaryodDates.push(Period DiaryodDay.toString());
    }
    expect(getPeriod DiaryodDatesWithNewElement([], maxDisplayedCycles)).toEqual(
      Period DiaryodDates,
    );
  });

  it("cycles array has a few items", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);

    let date = addDays(startOfToday(), 10);
    const cycles: Cycle[] = [];

    for (let i = 0; i < 6; ++i) {
      date = subDays(date, 28);
      cycles.push({
        cycleLength: 28,
        Period DiaryodLength: 5,
        startDate: date.toString(),
      });
    }
    cycles[0].cycleLength = 0;

    const Period DiaryodDates = getPeriod DiaryodDates(cycles, maxDisplayedCycles).map(
      (isoDateString) => {
        return parseISO(isoDateString).toString();
      },
    );
    const nowDate = startOfToday();
    for (let day = 0; day < 5; day++) {
      const Period DiaryodDay = addDays(nowDate, day);
      Period DiaryodDates.push(Period DiaryodDay.toString());
    }

    expect(getPeriod DiaryodDatesWithNewElement(cycles, maxDisplayedCycles)).toEqual(
      Period DiaryodDates,
    );
  });

  it("delay a few days", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);

    let date = subDays(startOfToday(), 5);
    const cycles: Cycle[] = [];

    for (let i = 0; i < 6; ++i) {
      date = subDays(date, 28);
      cycles.push({
        cycleLength: 28,
        Period DiaryodLength: 5,
        startDate: date.toString(),
      });
    }
    cycles[0].cycleLength = 0;

    const Period DiaryodDates = getPeriod DiaryodDates(cycles, maxDisplayedCycles).map(
      (isoDateString) => {
        return parseISO(isoDateString).toString();
      },
    );
    const nowDate = startOfToday();

    for (let day = 0; day < 5; day++) {
      const Period DiaryodDay = addDays(nowDate, day);
      Period DiaryodDates.push(Period DiaryodDay.toString());
    }

    expect(getPeriod DiaryodDatesWithNewElement(cycles, maxDisplayedCycles)).toEqual(
      Period DiaryodDates,
    );
  });
});

describe("getLastStartDate", () => {
  it("cycles array is empty", () => {
    expect(getLastStartDate([])).toEqual("");
  });

  it("cycles array has a few items", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);

    let date = addDays(startOfToday(), 15);
    const cycles: Cycle[] = [];

    for (let i = 0; i < 6; ++i) {
      date = subDays(date, 28);
      cycles.push({
        cycleLength: 28,
        Period DiaryodLength: 6,
        startDate: date.toString(),
      });
    }
    cycles[0].cycleLength = 0;

    expect(getLastStartDate(cycles)).toEqual(cycles[0].startDate);
  });
});

describe("getLengthOfLastPeriod Diaryod", () => {
  it("cycles array is empty", () => {
    expect(getLengthOfLastPeriod Diaryod([])).toEqual(0);
  });

  it("cycles array has a few items", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);

    let date = addDays(startOfToday(), 15);
    const cycles: Cycle[] = [];

    for (let i = 0; i < 6; ++i) {
      date = subDays(date, 28);
      cycles.push({
        cycleLength: 28,
        Period DiaryodLength: 6,
        startDate: date.toString(),
      });
    }
    cycles[0].cycleLength = 0;

    expect(getLengthOfLastPeriod Diaryod(cycles)).toEqual(cycles[0].Period DiaryodLength);
  });
});

describe("getForecastPeriod DiaryodDates", () => {
  it("cycles array is empty", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);
    expect(getForecastPeriod DiaryodDates([], maxDisplayedCycles)).toEqual([]);
  });

  it("cycles array has a few items", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);

    const cycles: Cycle[] = [];
    let date = addDays(startOfToday(), 20);

    for (let i = 0; i < 6; ++i) {
      date = subDays(date, 28);
      cycles.push({
        cycleLength: 28,
        Period DiaryodLength: 6,
        startDate: date.toString(),
      });
    }
    cycles[0].cycleLength = 0;

    const forecastDays = [];
    let nextCycleStart = addDays(startOfDay(new Date(cycles[0].startDate)), 28);
    for (let i = 0; i < 6; ++i) {
      forecastDays.push(format(addDays(nextCycleStart, i), "yyyy-MM-dd"));
    }

    const cycleCount = 6;
    for (let i = 0; i < cycleCount; ++i) {
      nextCycleStart = addDays(nextCycleStart, 28);
      for (let j = 0; j < 6; ++j) {
        forecastDays.push(format(addDays(nextCycleStart, j), "yyyy-MM-dd"));
      }
    }

    expect(getForecastPeriod DiaryodDates(cycles, maxDisplayedCycles)).toEqual(
      forecastDays,
    );
  });
});

describe("getOvulationDates", () => {
  it("cycles array is empty", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);
    expect(getOvulationDates([], maxDisplayedCycles)).toEqual([]);
  });

  it("cycles array has 1 item", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);

    const cycles: Cycle[] = [];
    let date = addDays(startOfToday(), 20);

    date = subDays(date, 28);
    cycles.push({
      cycleLength: 0,
      Period DiaryodLength: 6,
      startDate: date.toString(),
    });

    expect(getOvulationDates(cycles, maxDisplayedCycles)).toEqual([]);
  });

  it("cycles array has a 6 items", () => {
    // @ts-expect-error mocked `t` method
    vi.spyOn(i18n, "t").mockImplementation((key) => key);

    const cycles: Cycle[] = [];
    let date = addDays(startOfToday(), 20);

    for (let i = 0; i < 6; ++i) {
      date = subDays(date, 28);
      cycles.push({
        cycleLength: 28,
        Period DiaryodLength: 6,
        startDate: date.toString(),
      });
    }
    cycles[0].cycleLength = 0;

    const ovulationDays = [];
    for (const cycle of cycles) {
      const startOfCycle = startOfDay(new Date(cycle.startDate));
      let finishOfCycle;
      if (cycle.cycleLength === 0) {
        finishOfCycle = addDays(startOfCycle, 28 - 16);
      } else {
        finishOfCycle = addDays(startOfCycle, cycle.cycleLength - 16);
      }

      for (let i = 0; i < 4; ++i) {
        const newDate = addDays(finishOfCycle, i);
        ovulationDays.push(format(newDate, "yyyy-MM-dd"));
      }
    }

    let nextCycleStart = addDays(startOfDay(new Date(cycles[0].startDate)), 28);
    for (let i = 0; i < 4; ++i) {
      ovulationDays.push(
        format(addDays(nextCycleStart, 28 - 16 + i), "yyyy-MM-dd"),
      );
    }
    for (let i = 0; i < 5; ++i) {
      nextCycleStart = addDays(nextCycleStart, 28);
      for (let i = 0; i < 4; ++i) {
        ovulationDays.push(
          format(addDays(nextCycleStart, 28 - 16 + i), "yyyy-MM-dd"),
        );
      }
    }

    expect(getOvulationDates(cycles, maxDisplayedCycles)).toEqual(
      ovulationDays,
    );
  });
});
