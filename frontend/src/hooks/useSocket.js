import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export const useSocket = (url = "http://localhost:3000") => {
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
