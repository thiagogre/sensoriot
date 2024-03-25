"use client";

import { format } from "date-fns";
import React, { useState, useEffect } from "react";

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative flex place-items-center">
        <table>
          <thead>
            <tr>
              <th>Valor</th>
              <th>Data de coleta</th>
            </tr>
          </thead>
          <tbody>
            {sensorData.map((data: any) => (
              <tr key={data._id}>
                <td>{data.value}</td>
                <td>
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
