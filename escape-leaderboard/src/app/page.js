"use client"
import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  // const 

  const [data, setData] = useState([]);
  const fetchData = async() =>{
    const d = await getData();
    setData(d);
  }
  useEffect( () => {
    fetchData();

    return () => {}
  }, [])

  return (
    <main className={styles.main}>
      <h1>LEADERBOARD</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.mobile}</td>
              {/* <td>{item.totalScore}</td> */}
              <td>{item.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
async function getData() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  return await fetch("https://us-central1-bluetooth-race.cloudfunctions.net/app/leaderboard", requestOptions)
    .then((response) => response.json())
    .then((result) => {

      return result;
    })
    .catch((error) => { console.error(error) });

}

