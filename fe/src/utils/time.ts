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
