const baseUrl = "http://192.168.1.9:8080/uploads/image/lessons/";

export const formatImageUrl = (path?: string): string => {
  return `${baseUrl}${path}`;
};
