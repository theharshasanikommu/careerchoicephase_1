import mongoose, { Document, Schema } from 'mongoose';

export interface ICourseEnrollment extends Document {
  userId: mongoose.Types.ObjectId;
  courseId: string;
  courseName: string;
  courseCategory: string;
  coursePlatform: string;
  courseLink: string;
  enrolledAt: Date;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  lastAccessedAt: Date;
  status: 'enrolled' | 'in-progress' | 'completed';
  notes?: string;
}

const CourseEnrollmentSchema = new Schema<ICourseEnrollment>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    courseId: {
      type: String,
      required: true
    },
    courseName: {
      type: String,
      required: true
    },
    courseCategory: {
      type: String,
      required: true
    },
    coursePlatform: {
      type: String,
      required: true
    },
    courseLink: {
      type: String,
      required: true
    },
    enrolledAt: {
      type: Date,
      default: Date.now
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    completedLessons: {
      type: Number,
      default: 0
    },
    totalLessons: {
      type: Number,
      default: 0
    },
    lastAccessedAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['enrolled', 'in-progress', 'completed'],
      default: 'enrolled'
    },
    notes: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

// Compound index to prevent duplicate enrollments
CourseEnrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });

// Update status based on progress
CourseEnrollmentSchema.pre('save', function(next) {
  if (this.progress === 0) {
    this.status = 'enrolled';
  } else if (this.progress === 100) {
    this.status = 'completed';
  } else {
    this.status = 'in-progress';
  }
  next();
});

export default mongoose.model<ICourseEnrollment>('CourseEnrollment', CourseEnrollmentSchema);
