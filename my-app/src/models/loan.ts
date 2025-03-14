import mongoose from "mongoose";

const LoanSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  userId: { type: String, required: true },
  chamaaId: { type: String, required: true },
  status: { type: String, default: "pending" }, // pending, approved, repaid
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Loan || mongoose.model("Loan", LoanSchema);