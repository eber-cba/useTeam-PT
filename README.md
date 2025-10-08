# 🚀 Kanban Colaborativo en Tiempo Real

Aplicación tipo **Trello** que permite la gestión de tareas mediante un tablero **Kanban**, con soporte para **colaboración en tiempo real**, columnas personalizables y tarjetas movibles con **drag & drop**.

👉 **Ver la aplicación online:** [use-team-pt.vercel.app](https://use-team-pt.vercel.app)

---

## ✨ Características principales

- ✅ Gestión de tareas en un tablero Kanban.
- ✅ Arrastrar y soltar (drag & drop) de tarjetas entre columnas.
- ✅ Colaboración en tiempo real vía WebSockets.
- ✅ Backend con **NestJS** y **MongoDB** para persistencia de datos.
- ✅ Integración con **n8n** para exportación automatizada del backlog vía email en formato CSV.

---

## 🛠️ Tecnologías utilizadas

### Frontend

- React.js
- @dnd-kit para drag & drop
- WebSockets para sincronización en tiempo real

### Backend

- NestJS
- MongoDB con Mongoose
- Socket.io
- n8n para automatización de flujos

### Infraestructura

- Deploy del **frontend** en [Vercel](https://vercel.com)
- Deploy del **backend** en [Render](https://render.com)
- Base de datos en [MongoDB Atlas](https://www.mongodb.com/atlas)

---

## ⚙️ Instalación y ejecución local

### 1. Clonar el repositorio

```bash
git clone https://github.com/eber-cba/useTeam-PT.git
cd useTeam-PT
```
