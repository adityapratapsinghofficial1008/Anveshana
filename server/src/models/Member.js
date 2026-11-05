import mongoose from 'mongoose'
import { GENDERS } from '../../../shared/join.js'

const memberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 60 },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true, maxlength: 160 },
    age: { type: Number, required: true, min: 13, max: 99 },
    gender: { type: String, required: true, enum: GENDERS },
    occupation: { type: String, required: true, trim: true, maxlength: 80 },
    city: { type: String, required: true, trim: true, maxlength: 60 },
    curiosity: { type: String, required: true, trim: true, maxlength: 500 },
    building: { type: String, default: '', trim: true, maxlength: 500 },
    consent: { type: Boolean, required: true, validate: (value) => value === true },
    source: { type: String, default: 'website' },
  },
  { timestamps: true },
)

export const Member = mongoose.model('Member', memberSchema)
