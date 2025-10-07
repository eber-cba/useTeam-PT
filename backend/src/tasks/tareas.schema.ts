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

  @Prop({ type: Object })
  createdBy: any;

  @Prop({ type: Object })
  lastEditedBy: any;

  @Prop({ type: Date })
  lastEditedAt: Date;
}

export const TareaSchema = SchemaFactory.createForClass(Tarea);
