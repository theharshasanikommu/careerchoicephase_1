import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  avatar?: string;
  role: 'student' | 'instructor' | 'admin';
  bio?: string;
  location?: string;
  
  // OAuth
  googleId?: string;
  githubId?: string;
  
  // Gamification
  level: number;
  xp: number;
  streak: number;
  lastLoginDate?: Date;
  badges: string[];
  
  // Learning Stats
  coursesEnrolled: mongoose.Types.ObjectId[];
  coursesCompleted: mongoose.Types.ObjectId[];
  hoursLearned: number;
  
  // Social
  followers: mongoose.Types.ObjectId[];
  following: mongoose.Types.ObjectId[];
  
  // Settings
  emailVerified: boolean;
  notifications: {
    email: boolean;
    push: boolean;
    courseUpdates: boolean;
    achievements: boolean;
  };
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  
  // Methods
  comparePassword(candidatePassword: string): Promise<boolean>;
  addXP(amount: number): Promise<void>;
  updateStreak(): Promise<void>;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  avatar: {
    type: String,
    default: function(this: IUser) {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(this.name)}&background=3B82F6&color=fff&size=256`;
    }
  },
  role: {
    type: String,
    enum: ['student', 'instructor', 'admin'],
    default: 'student'
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot exceed 500 characters']
  },
  location: String,
  
  // OAuth
  googleId: String,
  githubId: String,
  
  // Gamification
  level: {
    type: Number,
    default: 1
  },
  xp: {
    type: Number,
    default: 0
  },
  streak: {
    type: Number,
    default: 0
  },
  lastLoginDate: Date,
  badges: [{
    type: String
  }],
  
  // Learning Stats
  coursesEnrolled: [{
    type: Schema.Types.ObjectId,
    ref: 'Course'
  }],
  coursesCompleted: [{
    type: Schema.Types.ObjectId,
    ref: 'Course'
  }],
  hoursLearned: {
    type: Number,
    default: 0
  },
  
  // Social
  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  
  // Settings
  emailVerified: {
    type: Boolean,
    default: false
  },
  notifications: {
    email: {
      type: Boolean,
      default: true
    },
    push: {
      type: Boolean,
      default: true
    },
    courseUpdates: {
      type: Boolean,
      default: true
    },
    achievements: {
      type: Boolean,
      default: true
    }
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password') || !this.password) {
    return next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

// Add XP and level up
userSchema.methods.addXP = async function(amount: number): Promise<void> {
  this.xp += amount;
  
  // Level up formula: level = floor(sqrt(xp / 100))
  const newLevel = Math.floor(Math.sqrt(this.xp / 100)) + 1;
  
  if (newLevel > this.level) {
    this.level = newLevel;
    // Award badge for leveling up
    if (!this.badges.includes(`level_${newLevel}`)) {
      this.badges.push(`level_${newLevel}`);
    }
  }
  
  await this.save();
};

// Update streak
userSchema.methods.updateStreak = async function(): Promise<void> {
  const now = new Date();
  const lastLogin = this.lastLoginDate;
  
  if (!lastLogin) {
    this.streak = 1;
  } else {
    const daysDiff = Math.floor((now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === 1) {
      this.streak += 1;
      
      // Award streak badges
      if (this.streak === 7 && !this.badges.includes('streak_7')) {
        this.badges.push('streak_7');
      }
      if (this.streak === 30 && !this.badges.includes('streak_30')) {
        this.badges.push('streak_30');
      }
    } else if (daysDiff > 1) {
      this.streak = 1;
    }
  }
  
  this.lastLoginDate = now;
  await this.save();
};

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ xp: -1 }); // For leaderboard
userSchema.index({ level: -1 });

export default mongoose.model<IUser>('User', userSchema);
