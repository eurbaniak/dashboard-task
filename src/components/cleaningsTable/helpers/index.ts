import dayjs from "dayjs";

export const executionDateFormat = (date: string, duration: number) => {
  const cleaningDate = dayjs(date);
  const cleaningFinishTime = cleaningDate.add(duration, "hour");

  const formattedCleaningDate = cleaningDate.format("ddd, MMM D, HH:mm");
  const formattedCleaningFinishDate = cleaningFinishTime.format("HH:mm");

  return `${formattedCleaningDate} - ${formattedCleaningFinishDate}`;
};

export const contractPeriodicityFormat = (periodicity: number) => {
  const periodicityMap: Record<number, string> = {
    7: "Weekly",
    14: "Every Two Weeks",
    21: "Every Three Weeks",
    30: "Monthly",
  };

  if (periodicity > 30) {
    const months = Math.floor(periodicity / 28);
    const days = periodicity % 28;
    return `Every ${months} Month${months > 1 ? "s" : ""} and ${days} Day${
      days > 1 ? "s" : ""
    }`;
  }

  const daysText = periodicity === 1 ? "Day" : "Days";
  return periodicityMap[periodicity] || `Every ${periodicity} ${daysText}`;
};

export const cleaningTypeFormatter = (type: string) => {
  return type
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/(?:^|\s)\S/g, (match) => match.toUpperCase());
};
