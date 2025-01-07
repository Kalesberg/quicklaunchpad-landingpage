const days = 3600 * 24;

export const convertDateTime = (dateTimeString: string, onlyDate = false) => {
    if (!dateTimeString) return "";
  
    const formattedDate = new Date(dateTimeString);
    // Format for date: 02 Dec 2024
    const date = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(formattedDate);
  
    // Format for time: 6:00 AM
    const time = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(formattedDate);
    if (onlyDate) {
      return date;
    }
    return date + " " + time;
};
  
export const getReminderTimeStampString = (dateStr: string, big = false) => {
    const date = new Date(dateStr);
    const reminderTimeStamp = Math.floor((date.getTime() - Date.now()) / 1000);
    if (reminderTimeStamp <= 0) {
      return `00:00:00:00`;
    }
    const day = Math.floor(reminderTimeStamp / days);
    const reminderDaySeconds = reminderTimeStamp % days;
    const hours = Math.floor(reminderDaySeconds / 3600);
  
    const reminderhoursSec = reminderDaySeconds % 3600;
    const minutes = Math.floor(reminderhoursSec / 60);
    const seconds = reminderhoursSec % 60;
  
    return (
      getZeroTimeString(+day) +
      (big ? ' : ' : ':') +
      getZeroTimeString(+hours) +
      (big ? ' : ' : ':') +
      getZeroTimeString(+minutes) +
      (big ? ' : ' : ':') +
      getZeroTimeString(seconds)
    );
};

export const getReminderDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const reminderTimeStamp = Math.floor((date.getTime() - Date.now()) / 1000);
    if (reminderTimeStamp <= 0) {
      return '';
    }
    const day = Math.floor(reminderTimeStamp / days);  
    return day.toString();
};

  
const getZeroTimeString = (time: number) => {
    return time < 10 ? `0${time}` : time;
};
  

  
  