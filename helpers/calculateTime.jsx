import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const calculateTime = (created_at) => {
  const date1 = dayjs();
  const date2 = dayjs(created_at);
  const diffInDays = date1.diff(date2, "day");

  if (diffInDays > 6) {
    return date2.format("DD/MM/YYYY");
  } else {
    return date1.to(date2);
  }
};

export default calculateTime;
