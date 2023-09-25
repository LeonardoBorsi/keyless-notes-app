import { format } from "date-fns";

export const getCurrentDatetime = () => {
  const currentDatetime = new Date();
  return format(currentDatetime, 'yyyy-MM-dd HH:mm:ss');
}