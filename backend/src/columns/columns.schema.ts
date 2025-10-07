import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Column extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  order?: number;
}

export const ColumnSchema = SchemaFactory.createForClass(Column);
