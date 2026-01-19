import dayjs from "dayjs";

export const formatChatTime = (value: Date | number | string) => {
    if (!value) return "";
  
    const date =
      value instanceof Date
        ? value
        : typeof value === "number"
        ? new Date(value)
        : new Date(value);
  
    return dayjs(date).format("DD MMM, hh:mma");
  };