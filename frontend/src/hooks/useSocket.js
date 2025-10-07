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
      console.log("Conectado al servidor WebSocket");
      // Unirse automáticamente al tablero Kanban
      socketRef.current.emit("join-kanban");
    });

    socketRef.current.on("disconnect", () => {
      console.log("Desconectado del servidor WebSocket");
    });

    socketRef.current.on("connected", (data) => {
      console.log("Mensaje del servidor:", data.message);
    });

    socketRef.current.on("joined-kanban", (data) => {
      console.log("Unido al tablero Kanban:", data.message);
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
