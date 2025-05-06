import mongoose from 'mongoose';

const DoctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: Number, required: true },
    hospital: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    price: { type: Number, required: true}
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Doctor || mongoose.model('Doctor', DoctorSchema);
