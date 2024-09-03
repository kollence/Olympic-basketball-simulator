import { useState, useEffect } from "react";
import {
  drawQuarterFinals,
  drawSemiFinals,
} from "../functions/tournamentUtils";
import Card from "./Card";
import { useGlobal } from "../context/GlobalContext";

const DrawStage = () => {
  const [quarterFinals, setQuarterFinals] = useState([]);
  const { rankings, setQuarterFinal: setQuartFinalsContext } = useGlobal();
  const [semiFinals, setSemiFinals] = useState([]);

  function handleHats() {
    if (Object.keys(rankings).length > 0) {
      // Flatten the rankings into a single array
      const allRankings = Object.values(rankings).flat();

      // Sort the teams based on their points, then by point difference
      allRankings.sort(
        (a, b) => b.points - a.points || b.pointDifference - a.pointDifference
      );

      // Organize teams into hats based on their rankings
      const hatD = allRankings.slice(0, 2);
      const hatE = allRankings.slice(2, 4);
      const hatF = allRankings.slice(4, 6);
      const hatG = allRankings.slice(6, 8);
      // const hats = { D: hatD, E: hatE, F: hatF, G: hatG };

      // Randomly match teams while ensuring no repeat matches
      // const quarterFinalPairs = drawQuarterFinals(hats.D, hats.E, hats.F, hats.G);
      const quarterFinalPairs = drawQuarterFinals(hatD, hatE, hatF, hatG);
      const hats = {
        D: quarterFinalPairs[0],
        E: quarterFinalPairs[1],
        F: quarterFinalPairs[2],
        G: quarterFinalPairs[3],
      };

      setQuartFinalsContext(quarterFinalPairs);
      // setQuarterFinals(quarterFinalPairs);
      setQuarterFinals(hats);

      // Create semi-final matchups
      const semiFinalPairs = drawSemiFinals(quarterFinalPairs);
      setSemiFinals(semiFinalPairs);
    }
  }
  // When rankings change, update the quarterFinals and semiFinals state
  useEffect(() => {
    handleHats();
  }, [rankings]);
  // console.log(quarterFinals);

  return (
    <div className="group-stage step-cell border rounded-lg  border-emerald-800 p-3">
      <div className="flex flex-wrap justify-center gap-4 mt-4  w-full">
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {Object.keys(rankings).map((group) => (
            <Card key={group}>
              <h3 className="text-black">Group {group}</h3>
              <table className="table-auto border-separate border-spacing-2 border border-slate-500 bg-gray-200 text-black">
                <thead>
                  <tr>
                    <th className="text-left">Team</th>
                    <th className="text-center">Wins</th>
                    <th className="text-center">Losses</th>
                    <th className="text-center">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {rankings[group].map((team, index) => (
                    <tr key={index}>
                      <td className="text-left w-60">{team.team}</td>
                      <td className="text-center">{team.wins}</td>
                      <td className="text-center">{team.losses}</td>
                      <td className="text-center">{team.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          ))}
        </div>
      </div>
      <div>
        Organize Teams into Hats
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <button
            onClick={handleHats}
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Draw Quarter-Finals
          </button>
        </div>
        <div style={{ justifyContent: "center", rowGap: "1rem" }}>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <h2>Hats</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <h1>Quarter-Final Draw:</h1>
          </div>

          <div className="">
            <div className="flex flex-wrap justify-center gap-4 mt-4 text-black">
              {Object.keys(quarterFinals).map((hatKey) => (
                <Card key={hatKey}>
                  <h2>Hat: {hatKey}</h2>
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th className="text-left">Team</th>
                        <th className="text-right">Wins</th>
                        <th className="text-right">Losses</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quarterFinals[hatKey].map((team, index) => (
                        <tr key={index}>
                          <td className="text-left">{team.team}</td>
                          <td className="text-right">{team.wins}</td>
                          <td className="text-right">{team.losses}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Card>
              ))}
            </div>
          </div>

          <h2>Semi-Final Draw</h2>
          <div>
            {semiFinals.map((match, index) => (
              <p className="border-cyan-200 border-b bordered-lg p-2" key={index}>
                Winner of: {match[0][0].team} vs {match[0][1].team}
                plays Winner of: {match[1][0].team} vs {match[1][1].team}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawStage;
