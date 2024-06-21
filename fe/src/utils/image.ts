const baseImageUrl = "http://192.168.1.9:8080/uploads/image/lessons/";
const baseVideoUrl = "http://192.168.1.9:8080/uploads/video/lessons/";

export const formatImageUrl = (path?: string): string => {
  return `${baseImageUrl}${path}`;
};

export const formatVideoUrl = (path?: string): string => {
  return `${baseVideoUrl}${path}`;
};
