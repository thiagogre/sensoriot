import mongoose from "mongoose";

const sensorData = new mongoose.Schema(
  {
    value: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.SensorData ||
  mongoose.model("SensorData", sensorData);
