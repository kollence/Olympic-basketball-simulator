import { useState, useEffect, useContext } from "react";
import { useTournamentData } from "../state/useTournamentData";
import {
  simulateGroupMatches,
  calculateGroupRankings,
} from "../functions/tournamentUtils";
import Card from "./Card";
import { useGlobal } from "../context/GlobalContext";

export default function GroupStage() {
  const { groups, loading } = useTournamentData();
  const [results, setResults] = useState({});
  // const [rankings, setRankings] = useRankings();
  const { rankings, setRankings } = useGlobal();
  // simulate button
  const handleSimulate = () => {
    // console.log(groups);

    const matchResults = simulateGroupMatches(groups);
    // console.log(matchResults);
    const groupRankings = calculateGroupRankings(matchResults);
    // console.log(groupRankings);

    setResults(matchResults);
    setRankings(groupRankings);
  };
  // simulate first time automatically
  useEffect(() => {
    handleSimulate();
  }, [groups]);
  
  return (
    <div className="group-stage step-cell border rounded-lg border-emerald-800 p-3">
      <h2 className="text-2xl font-semibold mb-4">Group Stage</h2>
      <button
        onClick={handleSimulate}
        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Simulate Group Phase
      </button>
      <div
        className="flex flex-wrap justify-center gap-4 mt-4 text-black"
        style={{ display: "flex", flexDirection: "row" }}
      >
        {Object.keys(results).map((group) => (
          <Card key={group}>
            <h3 className="text-xl font-semibold mb-2 text-black">
              Group {group}
            </h3>

            <table
              className="table table-striped table-bordered text-black"
              style={{ minWidth: "220px" }}
            >
              <tbody>
                {results[group].map((result, index) => (
                  <tr key={index}>
                    <td className="text-left">
                      {result.team1.ISOCode} - {result.team2.ISOCode}
                    </td>
                    <td></td>
                    <td className="text-right">
                      ({result.team1Score}: {result.team2Score})
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        ))}
      </div>

      <h2>Final Rankings in Groups</h2>
      {Object.keys(rankings).map((group) => (
        <div key={group} className="">
          <h3>Group {group}</h3>
          <table className="table-auto border-separate border-spacing-2 border border-slate-500 bg-gray-200 text-black w-full">
            <thead>
              <tr>
                <th className="text-left">Team</th>
                <th className="text-center">Wins</th>
                <th className="text-center">Losses</th>
                <th className="text-center">Points</th>
                <th className="text-center">Points Scored</th>
                <th className="text-center">Points Conceded</th>
                <th className="text-center">Point Difference</th>
              </tr>
            </thead>
            <tbody>
              {rankings[group].map((team, index) => (
                <tr key={index}>
                  <td className="text-left w-60">{team.team}</td>
                  <td className="text-center">{team.wins}</td>
                  <td className="text-center">{team.losses}</td>
                  <td className="text-center">{team.points}</td>
                  <td className="text-center">{team.pointsScored}</td>
                  <td className="text-center">{team.pointsConceded}</td>
                  <td className="text-center">{team.pointDifference}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
