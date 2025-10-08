import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const API_URL = import.meta.env.VITE_API_URL;

export const useSocket = (url = API_URL) => {
  const socketRef = useRef(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Crear conexión WebSocket
    socketRef.current = io(url, {
      transports: ["websocket", "polling"],
      autoConnect: true,
    });

    setSocket(socketRef.current);

    // Eventos de conexión
    socketRef.current.on("connect", () => {
      // LOGS NUEVOS PARA DEPURACIÓN
      console.log("[SOCKET] Conectado/desconectado", { connected: socketRef.current.connected });
      // Unirse automáticamente al tablero Kanban
      socketRef.current.emit("join-kanban");
    });

    socketRef.current.on("disconnect", () => {
      // LOGS NUEVOS PARA DEPURACIÓN
      console.log("[SOCKET] Conectado/desconectado", { connected: socketRef.current.connected });
    });

    socketRef.current.on("connected", (data) => {
      // Evento 'connected' recibido
    });

    socketRef.current.on("joined-kanban", (data) => {
      // Evento 'joined-kanban' recibido
    });

    // Limpiar conexión al desmontar
    return () => {
      if (socketRef.current) {
        socketRef.current.emit("leave-kanban");
        socketRef.current.disconnect();
      }
      setSocket(null);
    };
  }, [url]);

  return socket;
};
