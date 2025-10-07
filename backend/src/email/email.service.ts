import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: Transporter;

  constructor() {
    // Para desarrollo - usar Ethereal (email de prueba)
    if (process.env.NODE_ENV === 'development' && !process.env.SMTP_USER) {
      this.setupEtherealTransporter();
    } else {
      // Configuración real de SMTP
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false, // true para 465, false para otros puertos
        auth: {
          user: process.env.SMTP_USER || 'tu-email@gmail.com',
          pass: process.env.SMTP_PASS || 'tu-password-de-aplicacion',
        },
      });
    }
  }

  private async setupEtherealTransporter() {
    // Crear cuenta de prueba en Ethereal
    const testAccount = await nodemailer.createTestAccount();

    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    console.log('📧 Usando Ethereal para emails de prueba');
    console.log('🔗 Ve a https://ethereal.email para ver los emails enviados');
  }

  async sendWelcomeEmail(userEmail: string, userName: string) {
    const mailOptions = {
      from: process.env.SMTP_FROM || 'noreply@kanban-app.com',
      to: userEmail,
      subject: '¡Bienvenido al Tablero Kanban Colaborativo! 🎉',
      html: this.getWelcomeEmailTemplate(userName),
    };

    try {
      const result = await this.transporter.sendMail(mailOptions);
      console.log('Email de bienvenida enviado:', result.messageId);

      // Si es Ethereal, mostrar el enlace de preview
      if (process.env.NODE_ENV === 'development' && !process.env.SMTP_USER) {
        console.log('🔗 Preview URL:', nodemailer.getTestMessageUrl(result));
      }

      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('Error enviando email:', error);
      return { success: false, error: error.message };
    }
  }

  async sendTaskExportEmail(
    userEmail: string,
    userName: string,
    exportData: any,
    csvBuffer: Buffer,
  ) {
    const mailOptions = {
      from: process.env.SMTP_FROM || 'noreply@kanban-app.com',
      to: userEmail,
      subject: '📊 Exportación de Tareas - Tablero Kanban',
      html: this.getExportEmailTemplate(userName, exportData),
      attachments: [
        {
          filename: `kanban-tareas-${new Date().toISOString().split('T')[0]}.csv`,
          content: csvBuffer,
          contentType: 'text/csv',
        },
      ],
    };

    try {
      const result = await this.transporter.sendMail(mailOptions);
      console.log('Email de exportación con CSV enviado:', result.messageId);

      // Si es Ethereal, mostrar el enlace de preview
      if (process.env.NODE_ENV === 'development' && !process.env.SMTP_USER) {
        console.log('🔗 Preview URL:', nodemailer.getTestMessageUrl(result));
      }

      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('Error enviando email de exportación:', error);
      return { success: false, error: error.message };
    }
  }

  private getWelcomeEmailTemplate(userName: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Bienvenido al Tablero Kanban</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
          .feature { background: white; margin: 15px 0; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .button { background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 ¡Bienvenido al Tablero Kanban Colaborativo!</h1>
            <p>Hola ${userName}, tu cuenta ha sido creada exitosamente</p>
          </div>
          
          <div class="content">
            <h2>🚀 Características principales:</h2>
            
            <div class="feature">
              <h3>📋 Gestión de Tareas</h3>
              <p>Crea, organiza y mueve tareas entre columnas con drag & drop intuitivo</p>
            </div>
            
            <div class="feature">
              <h3>👥 Colaboración en Tiempo Real</h3>
              <p>Trabaja junto a tu equipo con sincronización automática de cambios</p>
            </div>
            
            <div class="feature">
              <h3>📊 Exportación de Datos</h3>
              <p>Exporta tu tablero a CSV para análisis y reportes</p>
            </div>
            
            <div class="feature">
              <h3>🔔 Notificaciones</h3>
              <p>Recibe actualizaciones por email sobre cambios importantes</p>
            </div>
            
            <div style="text-align: center;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}" class="button">
                🎯 Comenzar a usar el tablero
              </a>
            </div>
            
            <div class="footer">
              <p>Este email fue enviado automáticamente al registrarte en el Tablero Kanban Colaborativo.</p>
              <p>Si no solicitaste esta cuenta, puedes ignorar este mensaje.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private getExportEmailTemplate(userName: string, exportData: any): string {
    const taskCount = exportData.tasks ? exportData.tasks.length : 0;
    const columns = exportData.columns || ['Por hacer', 'En progreso', 'Hecho'];

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Exportación de Tareas</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
          .stats { background: white; margin: 15px 0; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .column { display: inline-block; background: #e9ecef; padding: 8px 16px; margin: 5px; border-radius: 20px; font-size: 14px; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📊 Exportación de Tareas Completada</h1>
            <p>Hola ${userName}, aquí tienes el resumen de tu tablero</p>
          </div>
          
          <div class="content">
            <div class="stats">
              <h3>📈 Estadísticas del Tablero</h3>
              <p><strong>Total de tareas:</strong> ${taskCount}</p>
              <p><strong>Columnas:</strong> ${columns.map((col) => `<span class="column">${col}</span>`).join('')}</p>
              <p><strong>Fecha de exportación:</strong> ${new Date().toLocaleDateString('es-ES')}</p>
              <p><strong>📎 Archivo CSV adjunto:</strong> kanban-tareas-${new Date().toISOString().split('T')[0]}.csv</p>
            </div>
            
            <div class="stats">
              <h3>📋 Resumen por Columnas</h3>
              ${columns
                .map((column) => {
                  const columnTasks = exportData.tasks
                    ? exportData.tasks.filter((task) => task.columna === column)
                    : [];
                  return `<p><strong>${column}:</strong> ${columnTasks.length} tareas</p>`;
                })
                .join('')}
            </div>
            
            <div class="stats">
              <h3>💡 Próximos Pasos</h3>
              <ul>
                <li>Revisa las tareas pendientes en "Por hacer"</li>
                <li>Mueve las tareas en progreso según su estado</li>
                <li>Marca como completadas las tareas finalizadas</li>
                <li>Colabora con tu equipo en tiempo real</li>
              </ul>
            </div>
            
            <div class="footer">
              <p>Este email contiene el resumen de tu tablero Kanban.</p>
              <p>Para acceder al tablero completo, visita: <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}">Tablero Kanban</a></p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}
