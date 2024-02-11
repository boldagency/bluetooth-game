"use client"
import { useState } from "react";
import GameCounter from "@/components/GameComponents/GameCounter/GameCounter";
import GameEnd from "@/components/GameComponents/GameEnd/GameEnd";
import GameBodyNew from "@/components/GameComponents/GameBodyNew/GameBodyNew";

export default function Home() {
  const [showGameEnd, setShowGameEnd] = useState(false);
  const [winner, setWinner] = useState(0)


  return (
    <>
      <GameCounter showGameEnd={showGameEnd} setShowGameEnd={setShowGameEnd} setWinner={setWinner} />
      <GameBodyNew user={2} setWinner={setWinner} />
      {showGameEnd && <GameEnd user={2} winner={winner} />}
    </ >
  );
}
