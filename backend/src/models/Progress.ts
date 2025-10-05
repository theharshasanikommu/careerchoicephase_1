import mongoose, { Document, Schema } from 'mongoose';

export interface IProgress extends Document {
  user: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  
  // Progress tracking
  completedLessons: number[];
  currentLesson: number;
  progressPercentage: number;
  
  // Time tracking
  timeSpent: number; // in minutes
  lastAccessedAt: Date;
  
  // Quiz scores
  quizScores: {
    quizId: mongoose.Types.ObjectId;
    score: number;
    attempts: number;
    completedAt: Date;
  }[];
  
  // Notes
  notes: {
    lessonId: number;
    content: string;
    timestamp: number; // video timestamp
    createdAt: Date;
  }[];
  
  // Bookmarks
  bookmarks: {
    lessonId: number;
    timestamp: number;
    title: string;
  }[];
  
  // Completion
  isCompleted: boolean;
  completedAt?: Date;
  certificateIssued: boolean;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

const progressSchema = new Schema<IProgress>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  
  // Progress tracking
  completedLessons: [{
    type: Number
  }],
  currentLesson: {
    type: Number,
    default: 0
  },
  progressPercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  
  // Time tracking
  timeSpent: {
    type: Number,
    default: 0
  },
  lastAccessedAt: {
    type: Date,
    default: Date.now
  },
  
  // Quiz scores
  quizScores: [{
    quizId: {
      type: Schema.Types.ObjectId,
      ref: 'Quiz'
    },
    score: Number,
    attempts: {
      type: Number,
      default: 1
    },
    completedAt: Date
  }],
  
  // Notes
  notes: [{
    lessonId: Number,
    content: String,
    timestamp: Number,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Bookmarks
  bookmarks: [{
    lessonId: Number,
    timestamp: Number,
    title: String
  }],
  
  // Completion
  isCompleted: {
    type: Boolean,
    default: false
  },
  completedAt: Date,
  certificateIssued: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Compound index for user-course combination
progressSchema.index({ user: 1, course: 1 }, { unique: true });

export default mongoose.model<IProgress>('Progress', progressSchema);
