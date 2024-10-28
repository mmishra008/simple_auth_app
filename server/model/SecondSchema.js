import mongoose from 'mongoose';

const DemoModel = new mongoose.Schema({
  name: { type: String },
});

export default mongoose.model('DemoSchema', DemoModel);
