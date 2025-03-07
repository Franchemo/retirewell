
import mongoose, { Document, Schema } from 'mongoose';

export interface IContent extends Document {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'audio' | 'video' | 'exercise';
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  progress: number;
  isBookmarked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ContentSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { 
      type: String, 
      required: true,
      enum: ['article', 'audio', 'video', 'exercise'] 
    },
    duration: { type: String, required: true },
    difficulty: { 
      type: String, 
      required: true,
      enum: ['Beginner', 'Intermediate', 'Advanced']
    },
    progress: { type: Number, default: 0 },
    isBookmarked: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model<IContent>('Content', ContentSchema);
