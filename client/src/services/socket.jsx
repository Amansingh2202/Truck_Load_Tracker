import { io } from "socket.io-client";


export const initSocket = async () => {
    return io(import.meta.env.VITE_BACKEND_URL, {
      transports: ["websocket"],
      reconnectionAttempts: 5, 
      timeout: 5000,
    });
  };