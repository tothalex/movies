import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

import { User } from '~modules/users/users.schema'

@Schema({ timestamps: true })
export class Movies extends Document {
  @Prop({ ref: User.name, type: Types.ObjectId })
  user: Types.ObjectId

  @Prop()
  title: string

  @Prop()
  released: Date

  @Prop()
  genre: string

  @Prop()
  director: string

  @Prop()
  createdAt: string

  @Prop()
  updatedAt: string
}

export const MoviesSchema = SchemaFactory.createForClass(Movies)
