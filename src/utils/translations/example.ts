const example = {
  // Home Tab
  Home: "",
  "Period Diaryod in": "", // eg. Period Diaryod in 5 Days
  "no info": "",
  Period Diaryod: "", // eg. Period Diaryod today
  today: "",
  Delay: "", // mean Period Diaryod Delay
  Days: "", // eg. "(0)[Days];(1)[Day];(2-inf)[Days];"
  "Current cycle day": "",

  // You can write like this (general way):
  // day: "{{count}}. päivä" (päivä is day)
  // or
  // day: "{{count}}-й день" (день is day)
  // If language has specific rules then it's like this (see en.ts):
  // day_ordinal_one: "{{count}}st day",
  // day_ordinal_two: "{{count}}nd day",
  // day_ordinal_few: "{{count}}rd day",
  // day_ordinal_other: "{{count}}th day",
  day: "", // eg. Period Diaryod - 1st day
  Ovulation: "",
  possible: "", // eg. Ovulation - possible
  finished: "", // eg. Ovulation - finished
  tomorrow: "", // eg. Ovulation - tomorrow
  in: "", // eg. Period Diaryod in 5 Days
  "chance of getting pregnant": "", // eg. High/Low chance of getting pregnant
  High: "",
  Low: "",
  "Period Diaryod today": "",
  edit: "",
  save: "",
  "Period Diaryod is": "", // eg. Period Diaryod is possible today
  "possible today": "",

  // Details Tab
  Details: "",
  "Period Diaryod length": "", // eg. Period Diaryod length - 5 Days
  "Cycle length": "", // eg. Cycle length - 25 Days
  "You haven't marked any Period Diaryods yet": "",

  // Mark Modal
  mark: "", // eg. mark your Period Diaryod
  cancel: "",

  // Welcome Modal
  "Welcome to Period Diary": "",
  "Mark the days of your": "", // eg. Mark the days of your last Period Diaryod
  "last Period Diaryod": "", // eg. Mark the days of your last Period Diaryod
  Continue: "",
  "Forecast will not be generated.": "",
  or: "",

  // Info Modal
  "Frequent symptoms": "",
  "is current phase of cycle": "", // eg. Menstrual phase is current phase of cycle"

  // Phases info
  "Menstrual phase": "",
  "This cycle is accompanied by low hormone levels.": "",
  "lack of energy and strength": "",
  pain: "",
  "weakness and irritability": "",
  "increased appetite": "",

  "Follicular phase": "",
  "The level of estrogen in this phase rises and reaches a maximum level.": "",
  "strength and vigor appear": "",
  "endurance increases": "",
  "new ideas and plans appear": "",
  "libido increases": "",

  "Ovulation phase": "",
  "Once estrogen levels peak, they trigger the release of two important ovulation hormones, follicle-stimulating hormone and luteinizing hormone.":
    "",
  "increased sexual desire": "",
  "optimistic mood": "",
  "mild fever": "",
  "lower abdominal pain": "",
  "chest discomfort and bloating": "",
  "characteristic secretions ": "",

  "Luteal phase": "",
  "Levels of the hormones estrogen and progesterone first rise and then drop sharply just before a Period Diaryod. Progesterone reaches its peak in the luteal phase.":
    "",
  "breast tenderness": "",
  puffiness: "",
  "acne and skin rashes": "",
  "diarrhea or constipation": "",
  "irritability and depressed mood": "",

  // Menu
  Preferences: "",
  Edit: "",
  Language: "",
  Theme: "",
  "Import config": "",
  "Export config": "",
  "Configuration has been imported": "",
  "Download latest version": "",
  "We are on GitHub": "",
  "Stored cycles count": "",

  // Alert Demo
  "This is just a demo": "",
  "You can download the application ": "", // eg. You can download the application here
  here: "", // eg. You can download the application here

  // Notifications
  Notifications: "",
  "Period Diaryod is coming soon": "",
  "Your Period Diaryod may start tomorrow": "",
  "Your Period Diaryod may start today": "",

  //Count stored cycles
  "Confirm selection": "",
  "Are you sure you want to change the number of stored cycles?": "",
  "Reducing the number will permanently remove some cycles.": "",
};

export default example;
