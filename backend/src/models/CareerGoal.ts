import mongoose, { Document, Schema } from 'mongoose';

interface IMilestone {
  title: string;
  description: string;
  completed: boolean;
  completedAt?: Date;
}

export interface ICareerGoal extends Document {
  userId: mongoose.Types.ObjectId;
  goalTitle: string;
  targetRole: string;
  description: string;
  targetDate: Date;
  currentSkills: string[];
  requiredSkills: string[];
  milestones: IMilestone[];
  status: 'active' | 'completed' | 'abandoned';
  progress: number;
  createdAt: Date;
  completedAt?: Date;
}

const MilestoneSchema = new Schema<IMilestone>({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Date
  }
}, { _id: true });

const CareerGoalSchema = new Schema<ICareerGoal>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    goalTitle: {
      type: String,
      required: true
    },
    targetRole: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    targetDate: {
      type: Date,
      required: true
    },
    currentSkills: {
      type: [String],
      default: []
    },
    requiredSkills: {
      type: [String],
      default: []
    },
    milestones: {
      type: [MilestoneSchema],
      default: []
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'abandoned'],
      default: 'active'
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    completedAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

// Calculate progress based on completed milestones
CareerGoalSchema.pre('save', function(next) {
  if (this.milestones.length > 0) {
    const completedCount = this.milestones.filter(m => m.completed).length;
    this.progress = Math.round((completedCount / this.milestones.length) * 100);
  }
  
  if (this.progress === 100 && this.status === 'active') {
    this.status = 'completed';
    this.completedAt = new Date();
  }
  
  next();
});

export default mongoose.model<ICareerGoal>('CareerGoal', CareerGoalSchema);
