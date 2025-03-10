
import mongoose, { Document, Schema } from 'mongoose';
import { IAchievement } from './Achievement';
import { IUser } from './User';

export interface IUserAchievement extends Document {
  userId: IUser['_id'];
  achievementId: IAchievement['_id'];
  progress: number;
  isCompleted: boolean;
  completedAt?: Date;
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const UserAchievementSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    achievementId: {
      type: Schema.Types.ObjectId,
      ref: 'Achievement',
      required: true,
    },
    progress: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      default: 0,
    },
    isCompleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    completedAt: {
      type: Date,
      default: null,
    },
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

// Compound indexes for efficient querying
UserAchievementSchema.index({ userId: 1, achievementId: 1 }, { unique: true });
UserAchievementSchema.index({ userId: 1, isCompleted: 1 });
UserAchievementSchema.index({ userId: 1, completedAt: -1 });

const UserAchievement = mongoose.model<IUserAchievement>('UserAchievement', UserAchievementSchema);

export default UserAchievement;
