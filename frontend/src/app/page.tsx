'use client';
import Navbar from '@/components/Navbar'
import { useEffect, useState } from "react";
import axiosInstance from '@/utils/axiosInstance';

interface ApiResponse {
  message: string
}

export default function Home() {
  const [data, setData] = useState<ApiResponse | null> (null);

  useEffect(() => {
    axiosInstance.get("http://127.0.0.1:8000/api/")
      .then(response => setData(response.data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);
  return (
    <div>
      <Navbar/>
         <h1>Fetching Data from Django</h1>
         <p>{data ? data.message : "Loading..."}</p>
    </div>
  );
}
