import mongoose, { Document, Schema } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  description: string;
  instructor: mongoose.Types.ObjectId;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  thumbnail: string;
  
  // Content
  lessons: {
    title: string;
    description: string;
    videoUrl?: string;
    duration: number;
    resources: string[];
    quiz?: mongoose.Types.ObjectId;
    order: number;
  }[];
  
  // Enrollment
  studentsEnrolled: mongoose.Types.ObjectId[];
  maxStudents?: number;
  
  // Pricing
  price: number;
  isPremium: boolean;
  
  // Stats
  rating: number;
  reviews: {
    user: mongoose.Types.ObjectId;
    rating: number;
    comment: string;
    createdAt: Date;
  }[];
  
  // Gamification
  xpReward: number;
  certificateTemplate?: string;
  
  // Status
  isPublished: boolean;
  publishedAt?: Date;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

const courseSchema = new Schema<ICourse>({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Course description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  instructor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Programming', 'Data Science', 'Design', 'Business', 'Marketing', 'Other']
  },
  level: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced']
  },
  duration: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    default: 'https://via.placeholder.com/400x250/3B82F6/FFFFFF?text=Course'
  },
  
  // Content
  lessons: [{
    title: {
      type: String,
      required: true
    },
    description: String,
    videoUrl: String,
    duration: {
      type: Number,
      required: true
    },
    resources: [String],
    quiz: {
      type: Schema.Types.ObjectId,
      ref: 'Quiz'
    },
    order: {
      type: Number,
      required: true
    }
  }],
  
  // Enrollment
  studentsEnrolled: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  maxStudents: Number,
  
  // Pricing
  price: {
    type: Number,
    default: 0
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  
  // Stats
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Gamification
  xpReward: {
    type: Number,
    default: 100
  },
  certificateTemplate: String,
  
  // Status
  isPublished: {
    type: Boolean,
    default: false
  },
  publishedAt: Date
}, {
  timestamps: true
});

// Calculate average rating
courseSchema.methods.calculateRating = function() {
  if (this.reviews.length === 0) {
    this.rating = 0;
    return;
  }
  
  const sum = this.reviews.reduce((acc: number, review: any) => acc + review.rating, 0);
  this.rating = Math.round((sum / this.reviews.length) * 10) / 10;
};

// Indexes
courseSchema.index({ title: 'text', description: 'text' });
courseSchema.index({ category: 1 });
courseSchema.index({ level: 1 });
courseSchema.index({ rating: -1 });
courseSchema.index({ studentsEnrolled: 1 });

export default mongoose.model<ICourse>('Course', courseSchema);
