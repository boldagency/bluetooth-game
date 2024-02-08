"use client"
import { useState } from "react";
import GameCounter from "@/components/GameComponents/GameCounter/GameCounter";
import GameEnd from "@/components/GameComponents/GameEnd/GameEnd";
import GameBody from "@/components/GameComponents/GameBody/GameBody";
import GameSpeedometer from "@/components/GameComponents/GameSpeedometer/GameSpeedometer";
import GameBodyNew from "@/components/GameComponents/GameBodyNew/GameBodyNew";

export default function Home() {
  const [showGameEnd, setShowGameEnd] = useState(false);

 
  return (
    <>
      <GameCounter setShowGameEnd={setShowGameEnd} />
      {/* <GameBody /> */}
      <GameBodyNew />
      {/* <GameSpeedometer /> */}
      {showGameEnd && <GameEnd showGameEnd={showGameEnd} />}
    </ >
  );
}
