"use client"
import { useState } from "react";
import GameCounter from "@/components/GameComponents/GameCounter/GameCounter";
import GameEnd from "@/components/GameComponents/GameEnd/GameEnd";
import GameBodyNew from "@/components/GameComponents/GameBodyNew/GameBodyNew";

export default function Home() {
  const [showGameEnd, setShowGameEnd] = useState(false);


  return (
    <>
      <GameCounter setShowGameEnd={setShowGameEnd} />
      <GameBodyNew setWinner={setWinner} user={2} />
      {showGameEnd && <GameEnd user={2} winner={winner} showGameEnd={showGameEnd} />}
    </ >
  );
}
