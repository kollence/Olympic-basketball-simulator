import { useState } from "react";
import { useGlobal } from "../context/GlobalContext";
import Card from "./Card";
import {
  simulateKnockoutStage,
  simulateMatch,
} from "../functions/tournamentUtils";
import { useTournamentData } from "../state/useTournamentData";

export default function EliminationPhase() {
  const { quarterFinal: quarterFinalPairs } = useGlobal();
  const [quarterFinalResults, setQuarterFinalResults] = useState(null);
  const [semiFinalResults, setSemiFinalResults] = useState(null);
  const [finalResult, setFinalResult] = useState(null);
  const [thirdPlaceResult, setThirdPlaceResult] = useState(null);

  // Step 1: Simulate Quarter-Finals
  const handleSimulateQuarterFinals = () => {
    const results = simulateKnockoutStage(quarterFinalPairs);
    setQuarterFinalResults(results);
  };

  // Step 2: Simulate Semi-Finals
  const handleSimulateSemiFinals = () => {
    if (!quarterFinalResults) return;

    const semiFinalPairs = [
      [quarterFinalResults[0].winner, quarterFinalResults[1].winner],
      [quarterFinalResults[2].winner, quarterFinalResults[3].winner],
    ];

    const results = simulateKnockoutStage(semiFinalPairs);
    setSemiFinalResults(results);
  };

  // Step 3: Simulate Finals and Third-Place Match
  const handleSimulateFinalAndThirdPlace = () => {
    if (!semiFinalResults) return;

    const finalMatch = simulateMatch(
      semiFinalResults[0].winner,
      semiFinalResults[1].winner
    );
    const thirdPlaceMatch = simulateMatch(
      semiFinalResults[0].loser,
      semiFinalResults[1].loser
    );

    setFinalResult(finalMatch);
    setThirdPlaceResult(thirdPlaceMatch);
  };

  return (
    <div className="text-center border border-gray-200 rounded-lg  border-emerald-800 p-4">
      <h3 className="text-3xl font-bold tracking-tight text-white-900">
        Elimination Phase
      </h3>
      {/* Step 1: Quarter-Finals */}
      <button
        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        onClick={handleSimulateQuarterFinals}
        hidden={quarterFinalResults !== null}
      >
        Simulate Quarter-Finals
      </button>
      {quarterFinalResults && (
        <div className="border-b border-gray-200 mb-3">
          <h3 className="text-2xl font-bold tracking-tight text-cyan-200 mt-3">
            Quarter-Finals Results:
          </h3>
          <div className="flex flex-wrap justify-center gap-4 mb-3">
            {quarterFinalResults.map((match, index) => (
              <Card key={index}>
                <table
                  className="table table-striped table-bordered text-cyan-900"
                  style={{ minWidth: "220px" }}
                >
                  <tbody>
                    <tr>
                      <td className="text-left">
                        {match.winner.team} - {match.loser.team}
                      </td>
                      <td></td>
                      <td className="text-right">
                        ({match.team1Score}: {match.team2Score})
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Semi-Finals */}
      <button
        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        onClick={handleSimulateSemiFinals}
        hidden={!quarterFinalResults || semiFinalResults !== null}
      >
        Simulate Semi-Finals
      </button>
      {semiFinalResults && (
        <div className="border-b border-gray-200 mb-3">
          <h3 className="text-2xl font-bold tracking-tight text-cyan-200 mt-3">
            Semi-Finals Results:
          </h3>
          <div className="flex flex-wrap justify-center gap-4 mb-3">
            {semiFinalResults.map((match, index) => (
              <Card key={index}>
                <table
                  className="table table-striped table-bordered text-cyan-900"
                  style={{ minWidth: "220px" }}
                >
                  <tbody>
                    <tr>
                      <td className="text-left">
                        {match.winner.team} - {match.loser.team}
                      </td>
                      <td></td>
                      <td className="text-right">
                        ({match.team1Score}: {match.team2Score})
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Finals and Third-Place Match */}
      <button
        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        onClick={handleSimulateFinalAndThirdPlace}
        hidden={!semiFinalResults || finalResult !== null}
      >
        Simulate Finals & Third-Place Match
      </button>
      {thirdPlaceResult && (
        <div className="border-b border-gray-200 mb-3">
          <h3 className="text-2xl font-bold tracking-tight text-cyan-200 mt-3">
            Third-Place Match Result:
          </h3>
          <div className="flex flex-wrap justify-center gap-4 mb-3">
            <Card>
              <table
                className="table table-striped table-bordered text-cyan-900"
                style={{ minWidth: "220px" }}
              >
                <tbody>
                  <tr>
                    <td className="text-left">
                      {thirdPlaceResult.winner.team} -{" "}
                      {thirdPlaceResult.loser.team}
                    </td>
                    <td></td>
                    <td className="text-right">
                      ({thirdPlaceResult.team1Score}:{" "}
                      {thirdPlaceResult.team2Score})
                    </td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </div>
        </div>
      )}
      {finalResult && (
        <div className="mb-3">
          <h3 className="text-2xl font-bold tracking-tight text-cyan-200 mt-3">
            Final Match Result:
          </h3>

          <div className="flex flex-wrap justify-center gap-4 mb-3">
            <Card>
              <table
                className="table table-striped table-bordered text-cyan-900"
                style={{ minWidth: "220px" }}
              >
                <tbody>
                  <tr>
                    <td className="text-left">
                      {finalResult.winner.team} - {finalResult.loser.team}
                    </td>
                    <td></td>
                    <td className="text-right">
                      ({finalResult.team1Score}: {finalResult.team2Score})
                    </td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </div>
        </div>
      )}

      {finalResult && thirdPlaceResult && (
        <div className="mb-3">
          <h3 className="text-2xl font-bold tracking-tight text-cyan-200 mt-3">
            Final Match Result:
          </h3>

          <div className="flex flex-wrap justify-center gap-4 mb-3">
            <Card>
              <table
                className="table table-striped table-bordered text-cyan-900"
                style={{ minWidth: "220px" }}
              >
                <tbody>
                  <tr>
                    <td className="text-left">
                      <span>1st Place: </span>
                    </td>
                    <td className="text-right">
                      <span>{finalResult.winner.team}</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-left">
                      <span>2nd Place:</span>
                    </td>
                    <td className="text-right">
                      <span> {finalResult.loser.team}</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-left">
                      <span>3rd Place:</span>
                    </td>
                    <td className="text-right">
                      <span> {thirdPlaceResult.winner.team}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
