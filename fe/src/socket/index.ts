import { io } from "socket.io-client";
const socket = io(process.env.EXPO_PUBLIC_SOCKER_URL!, { autoConnect: false });

export default socket;
