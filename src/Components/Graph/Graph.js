import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";

const Graph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/graph")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Pie
        data={{
          labels: ["DM", "Adventurers", "In person", "Online"],
          datasets: [
            {
              data: data,
              backgroundColor: ["rgba(0,0,255,0.637", "rgba(255, 0, 0, 0.637", "rgba(0, 255, 0, 0.637)", "rgb(70, 158, 70, 0.637)"],
            },
          ],
        }}
      />
    </div>
  );
};
export default Graph;
