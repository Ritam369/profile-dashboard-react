import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String, default: null },
  phone: { type: String, default: '' },
  bio: { type: String, default: '' },
  location: { type: String, default: '' },
  joinDate: { type: Date, default: Date.now },
  pdfs: [{
    filename: { type: String, required: true },
    data: { type: Buffer },
    contentType: { type: String, default: 'application/pdf' },
    generatedAt: { type: Date, default: Date.now }
  }]
});

export default mongoose.model('User', userSchema);
