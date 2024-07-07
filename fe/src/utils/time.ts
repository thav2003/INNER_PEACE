export const formatDuration = (minutes?: number): string => {
  if (!minutes) return "Không có thời gian";
  if (minutes >= 1440) {
    // nếu lớn hơn hoặc bằng 1 ngày
    const days = Math.floor(minutes / 1440);
    const remainingMinutes = minutes % 1440;
    const hours = Math.floor(remainingMinutes / 60);
    const remainingHours = remainingMinutes % 60;
    return `${days} ngày ${hours} giờ ${remainingHours} phút`;
  } else if (minutes >= 60) {
    // nếu lớn hơn hoặc bằng 1 giờ
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} giờ ${remainingMinutes} phút`;
  } else {
    // nếu nhỏ hơn 1 giờ
    return `${minutes} phút`;
  }
};
export const formatToVietnamDate = (date?: Date) => {
  if (!date) return `yyyy-mm-dd`;
  const vietnamTimeOffset = 7 * 60; // GMT+7 in minutes
  const localDate = new Date(date.getTime() + vietnamTimeOffset * 60000);
  const year = localDate.getUTCFullYear();
  const month = String(localDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(localDate.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
