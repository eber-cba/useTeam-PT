# Instrucciones para configurar y ejecutar el flujo N8N

## Requisitos
- Docker y Docker Compose instalados
- Archivo `workflow.json` exportado desde N8N

## Pasos

1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPO>
   cd useTeam-PT
   ```

2. Levanta los servicios con Docker Compose:
   ```bash
   docker-compose up -d
   ```

3. Accede a N8N en tu navegador:
   - URL: [http://localhost:5678](http://localhost:5678)

4. Importa el flujo:
   - Ve a N8N, selecciona "Importar flujo" y carga el archivo `n8n/workflow.json`.

5. Configura credenciales y variables si el flujo lo requiere.

6. Para detener los servicios:
   ```bash
   docker-compose down
   ```

## Notas
- Los datos de N8N y MongoDB se guardan en volúmenes locales para persistencia.
- Puedes modificar los puertos en el archivo `docker-compose.yml` si lo necesitas.