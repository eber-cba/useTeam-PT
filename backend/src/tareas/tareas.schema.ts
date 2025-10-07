import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Tarea extends Document {
  @Prop({ required: true })
  titulo: string;

  @Prop()
  descripcion: string;

  @Prop({ default: false })
  completada: boolean;

  @Prop({ default: 'Por hacer' })
  columna: string;

  @Prop({ default: () => new Date() })
  fechaCreacion: Date;
}

export const TareaSchema = SchemaFactory.createForClass(Tarea);
