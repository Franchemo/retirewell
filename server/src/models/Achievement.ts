
import mongoose, { Document, Schema } from 'mongoose';

export interface IAchievement extends Document {
  title: string;
  description: string;
  icon: string;
  category: string;
  criteria: {
    type: string;
    threshold: number;
    target?: string;
    frequency?: string;
    duration?: number;
  };
  isHidden: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AchievementSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Consistency', 'Mindfulness', 'Exercise', 'Reflection', 'Social', 'General'],
      index: true,
    },
    criteria: {
      type: {
        type: String,
        required: true,
        enum: ['streak', 'count', 'milestone', 'combo'],
      },
      threshold: {
        type: Number,
        required: true,
        min: 1,
      },
      target: {
        type: String,
        required: false,
      },
      frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly'],
        required: false,
      },
      duration: {
        type: Number,
        required: false,
      },
    },
    isHidden: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for efficient querying
AchievementSchema.index({ category: 1 });
AchievementSchema.index({ 'criteria.type': 1 });
AchievementSchema.index({ isHidden: 1 });

const Achievement = mongoose.model<IAchievement>('Achievement', AchievementSchema);

export default Achievement;
