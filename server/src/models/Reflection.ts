
import mongoose, { Schema, Document } from 'mongoose';

export interface IReflection extends Document {
  id: string;
  text: string;
  mood: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  userId?: string; // Will be used when we add authentication
}

const ReflectionSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  text: { type: String, required: true },
  mood: { type: String, required: true },
  date: { type: String, required: true },
  createdAt: { type: String, required: true },
  updatedAt: { type: String, required: true },
  userId: { type: String }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

export default mongoose.model<IReflection>('Reflection', ReflectionSchema);
