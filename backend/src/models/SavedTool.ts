import mongoose, { Document, Schema } from 'mongoose';

export interface ISavedTool extends Document {
  userId: mongoose.Types.ObjectId;
  toolName: string;
  toolDescription: string;
  toolLink: string;
  category: string;
  tags: string[];
  savedAt: Date;
  notes?: string;
  isFavorite: boolean;
}

const SavedToolSchema = new Schema<ISavedTool>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    toolName: {
      type: String,
      required: true
    },
    toolDescription: {
      type: String,
      required: true
    },
    toolLink: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    tags: {
      type: [String],
      default: []
    },
    savedAt: {
      type: Date,
      default: Date.now
    },
    notes: {
      type: String
    },
    isFavorite: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Compound index to prevent duplicate saves
SavedToolSchema.index({ userId: 1, toolName: 1 }, { unique: true });

export default mongoose.model<ISavedTool>('SavedTool', SavedToolSchema);
