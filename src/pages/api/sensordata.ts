import connectDB from "../../utils/db";
import SensorData from "../../../models/SensorData";

export default async function handler(req: any, res: any) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const sensorDatas = await SensorData.find({}).sort({ createdAt: -1 });
      res.status(200).json(sensorDatas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  } else if (req.method === "POST") {
    const { value } = req.body;

    try {
      const newData = new SensorData({ value: Number(value) });
      await newData.save();
      res.status(201).json(newData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
