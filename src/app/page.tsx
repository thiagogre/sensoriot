"use client";

import { format } from "date-fns";
import React, { useState, useEffect } from "react";

import ChartComponent from "@/components/Chart";

export default function Home() {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/sensordata");
      const data = await res.json();
      setSensorData(data);
    };

    fetchData();

    const interval = setInterval(fetchData, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="px-4" style={{ width: "90%" }}>
        <ChartComponent data={sensorData} />
      </div>
      <div className="w-full px-4 mt-4 overflow-x-auto flex justify-center">
        <table>
          <thead>
            <tr>
              <th className="py-2 px-4 text-center">Valor</th>
              <th className="py-2 px-4 text-center">Data de coleta</th>
            </tr>
          </thead>
          <tbody>
            {sensorData.map((data: any) => (
              <tr key={data._id}>
                <td className="py-2 px-4 text-center">{data.value}</td>
                <td className="py-2 px-4 text-center">
                  {format(new Date(data.createdAt), "dd/MM/yyyy HH:mm:ss")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
