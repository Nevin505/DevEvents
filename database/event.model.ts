import mongoose, { Schema, Document, Model } from "mongoose";

/**
 * Event document TypeScript interface
 */
export interface EventDocument extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Generate URL-friendly slug from title
 */
const generateSlug = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/**
 * Normalize time to HH:mm format
 */
const normalizeTime = (time: string): string => {
  const date = new Date(`1970-01-01T${time}`);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid time format");
  }
  return date.toISOString().substring(11, 16);
};

const EventSchema = new Schema<EventDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    description: { type: String, required: true },
    overview: { type: String, required: true },
    image: { type: String, required: true },
    venue: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    mode: { type: String, required: true },
    audience: { type: String, required: true },
    agenda: {
      type: [String],
      required: true,
      validate: (v: string[]) => v.length > 0,
    },
    organizer: { type: String, required: true },
    tags: {
      type: [String],
      required: true,
      validate: (v: string[]) => v.length > 0,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

/**
 * Pre-save hook:
 * - Generate slug only if title changes
 * - Normalize date to ISO format
 * - Normalize time format
 */
EventSchema.pre<EventDocument>("save", async function () {
  if (this.isModified("title")) {
    this.slug = generateSlug(this.title);
  }

  if (this.isModified("date")) {
    const parsedDate = new Date(this.date);
    if (isNaN(parsedDate.getTime())) {
      throw new Error("Invalid date format");
    }
    this.date = parsedDate.toISOString();
  }

  if (this.isModified("time")) {
    this.time = normalizeTime(this.time);
  }
});

export const Event: Model<EventDocument> =
  mongoose.models.Event || mongoose.model<EventDocument>("Event", EventSchema);
