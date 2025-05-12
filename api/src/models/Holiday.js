import mongoose from 'mongoose';
const HolidaySchema = new mongoose.Schema({
    name: String,
    date: Date,
    description: String
  });
export default mongoose.model('Holidays', HolidaySchema);
