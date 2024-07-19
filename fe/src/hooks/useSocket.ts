import { useCallback, useEffect, useMemo, useState } from "react";
import { io, Socket } from "socket.io-client";

export const useSocket = (
  room: {
    lessonId?: number;
    userId?: number;
    roomType: string;
  },
  events?: Record<string, string>
) => {
  const [socket, setSocket] = useState<Socket>();
  const [isConnected, setConnected] = useState(false);
  const [socketResponse, setSocketResponse] = useState<Record<string, any>>();
  const memoizedRoom = useMemo(
    () => room,
    [room.lessonId, room.userId, room.roomType]
  );

  useEffect(() => {
    const s = io(process.env.EXPO_PUBLIC_SOCKER_URL!, {
      reconnection: false,
    });
    setSocket(s);
    s.on("connect", () => setConnected(true));
    if (events) {
      Object.keys(events).forEach((eventName) => {
        const channel = events[eventName];
        s.on(channel, (data) => {
          setSocketResponse((prevResponse) => ({
            ...prevResponse,
            [channel]: data,
          }));
        });
      });
    }
    return () => {
      s.disconnect();
    };
  }, [memoizedRoom]);

  return { isConnected, socketResponse, socket };
};
