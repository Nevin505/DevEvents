import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { Event } from "./event.model";

/**
 * Booking document TypeScript interface
 */
export interface BookingDocument extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Email validation regex
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const BookingSchema = new Schema<BookingDocument>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (value: string) => EMAIL_REGEX.test(value),
        message: "Invalid email format",
      },
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

/**
 * Pre-save hook:
 * - Ensure referenced Event exists
 */
BookingSchema.pre<BookingDocument>("save", async function (next) {
  const exists = await Event.exists({ _id: this.eventId });
  if (!exists) {
    throw new Error("Referenced event does not exist");
  }
  next();
});

export const Booking: Model<BookingDocument> =
  mongoose.models.Booking ||
  mongoose.model<BookingDocument>("Booking", BookingSchema);
