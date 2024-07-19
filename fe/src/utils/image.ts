const baseImageUrl = `${process.env
  .EXPO_PUBLIC_API_URL!}/uploads/image/lessons/`;
const baseVideoUrl = `${process.env
  .EXPO_PUBLIC_API_URL!}/uploads/video/lessons/`;

export const formatImageUrl = (path?: string): string => {
  // console.log(`${baseImageUrl}${path}`);
  return `${baseImageUrl}${path}`;
};

export const formatVideoUrl = (path?: string): string => {
  // console.log(`${baseVideoUrl}${path}`);
  return `${baseVideoUrl}${path}`;
};
