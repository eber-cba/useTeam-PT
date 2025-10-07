import React, { createContext, useState, useEffect } from "react";

export const KanbanContext = createContext();

export const KanbanProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [columns] = useState(["Por hacer", "En progreso", "Hecho"]);

  useEffect(() => {
    fetch("http://localhost:3000/api/tareas")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  }, []);

  const moveTask = (taskId, newColumna) => {
    setTasks((prev) =>
      prev.map((t) => (t._id === taskId ? { ...t, columna: newColumna } : t))
    );
  };

  return (
    <KanbanContext.Provider value={{ tasks, setTasks, columns, moveTask }}>
      {children}
    </KanbanContext.Provider>
  );
};

export const useKanban = () => {
  const context = React.useContext(KanbanContext);
  if (!context) {
    throw new Error("useKanban debe ser usado dentro de un KanbanProvider");
  }
  return context;
};
