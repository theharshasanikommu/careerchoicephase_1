import mongoose, { Document, Schema } from 'mongoose';

export interface ILearningStats extends Document {
  userId: mongoose.Types.ObjectId;
  totalCoursesEnrolled: number;
  coursesInProgress: number;
  coursesCompleted: number;
  totalLearningHours: number;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: Date;
  totalAIToolsSaved: number;
  activeGoals: number;
  completedGoals: number;
}

const LearningStatsSchema = new Schema<ILearningStats>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true
    },
    totalCoursesEnrolled: {
      type: Number,
      default: 0
    },
    coursesInProgress: {
      type: Number,
      default: 0
    },
    coursesCompleted: {
      type: Number,
      default: 0
    },
    totalLearningHours: {
      type: Number,
      default: 0
    },
    currentStreak: {
      type: Number,
      default: 0
    },
    longestStreak: {
      type: Number,
      default: 0
    },
    lastActivityDate: {
      type: Date,
      default: Date.now
    },
    totalAIToolsSaved: {
      type: Number,
      default: 0
    },
    activeGoals: {
      type: Number,
      default: 0
    },
    completedGoals: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

// Method to update streak
LearningStatsSchema.methods.updateStreak = function() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const lastActivity = new Date(this.lastActivityDate);
  lastActivity.setHours(0, 0, 0, 0);
  
  const daysDiff = Math.floor((today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysDiff === 0) {
    // Same day, no change
    return;
  } else if (daysDiff === 1) {
    // Consecutive day
    this.currentStreak += 1;
    if (this.currentStreak > this.longestStreak) {
      this.longestStreak = this.currentStreak;
    }
  } else {
    // Streak broken
    this.currentStreak = 1;
  }
  
  this.lastActivityDate = new Date();
};

export default mongoose.model<ILearningStats>('LearningStats', LearningStatsSchema);
