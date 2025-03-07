
import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for a health topic
export interface IHealthTopic extends Document {
  keyword: string;
  content: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema for health topics
const HealthTopicSchema: Schema = new Schema(
  {
    keyword: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true
    },
    content: {
      type: String,
      required: true
    },
    category: {
      type: String,
      enum: ['sleep', 'nutrition', 'exercise', 'stress', 'general'],
      default: 'general'
    }
  },
  { timestamps: true }
);

// Create and export the model
export default mongoose.model<IHealthTopic>('HealthTopic', HealthTopicSchema);
