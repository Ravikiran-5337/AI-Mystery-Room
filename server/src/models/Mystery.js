import mongoose from 'mongoose';

const mysterySchema = new mongoose.Schema({
  title: { type: String, required: true },
  scenario: { type: String, required: true },
  introduction: { type: String, required: true },
  location: String,
  incidentTime: String,
  suspects: { type: [mongoose.Schema.Types.Mixed], required: true },
  evidence: { type: [mongoose.Schema.Types.Mixed], required: true },
  timeline: { type: [mongoose.Schema.Types.Mixed], required: true },
  culpritId: { type: String, required: true, select: false },
  solutionExplanation: { type: String, required: true, select: false },
  solutionEvidenceIds: { type: [String], select: false },
  createdAt: { type: Date, default: Date.now }
}, { minimize: false });

export default mongoose.models.Mystery || mongoose.model('Mystery', mysterySchema);
