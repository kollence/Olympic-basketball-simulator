let exibitions = {};

fetch('/src/state/exibitions.json')
  .then((response) => response.json())
  .then((data) => {
    exibitions = data;
  })
  .catch((error) => console.error('Error loading exibitions.json:', error));

// BONUS METHOD
// Helper function to calculate form based on exhibition matches
const calculateTeamForm = (teamCode) => {
  const matches = exibitions[teamCode];
  if (!matches) return 0;

  let totalForm = 0;

  matches.forEach((match) => {
    const [teamScore, opponentScore] = match.Result.split('-').map(Number);
    const scoreDifference = teamScore - opponentScore;

    const opponent = match.Opponent;
    const opponentMatches = exibitions[opponent];
    let opponentStrength = 1;

    if (opponentMatches) {
      const opponentWins = opponentMatches.filter(
        (m) => Number(m.Result.split('-')[0]) > Number(m.Result.split('-')[1])
      ).length;
      opponentStrength = opponentWins / opponentMatches.length;
    }

    const matchForm = scoreDifference * opponentStrength;
    totalForm += matchForm;
  });

  return totalForm / matches.length;
};

export const simulateMatch = (team1, team2) => {
  const team1Form = calculateTeamForm(team1.ISOCode);
  const team2Form = calculateTeamForm(team2.ISOCode);

  const rankingDifference = team1.FIBARanking - team2.FIBARanking;
  const formDifference = team1Form - team2Form;

  const probability =
    1 / (1 + Math.exp(-(rankingDifference + formDifference) / 10));

  const team1Wins = Math.random() < probability;
  let team1Score = Math.floor(Math.random() * 40) + 80;
  let team2Score =
    team1Score -
    (team1Wins
      ? Math.floor(Math.random() * 10)
      : -Math.floor(Math.random() * 10));

  // Ensure that there is no draw
  while (team1Score === team2Score) {
    team1Score = Math.floor(Math.random() * 40) + 80;
    team2Score =
      team1Score -
      (team1Wins
        ? Math.floor(Math.random() * 10)
        : -Math.floor(Math.random() * 10));
  }

  return {
    winner: team1Wins ? team1 : team2,
    loser: team1Wins ? team2 : team1,
    team1Score: team1Wins ? team1Score : team2Score,
    team2Score: team1Wins ? team2Score : team1Score,
  };
};
export const simulateGroupMatches = (groups) => {
  const results = {};
  for (let group in groups) {
    results[group] = [];
    const teams = groups[group];
    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        const matchResult = simulateMatch(teams[i], teams[j]);
        results[group].push({
          team1: teams[i],
          team2: teams[j],
          ...matchResult,
        });
      }
    }
  }
  return results;
};

export const calculateGroupRankings = (results) => {
  const rankings = {};
  for (let group in results) {
    const groupResults = results[group];
    const teamStats = {};

    groupResults.forEach((match) => {
      const { winner, loser, team1Score, team2Score } = match;

      // Initialize team stats if not already done
      if (!teamStats[winner.Team]) {
        teamStats[winner.Team] = {
          wins: 0, losses: 0, points: 0, pointsScored: 0, pointsConceded: 0,
        };
      }
      if (!teamStats[loser.Team]) {
        teamStats[loser.Team] = {
          wins: 0, losses: 0, points: 0, pointsScored: 0, pointsConceded: 0,
        };
      }

      // Update stats for both teams
      teamStats[winner.Team].wins += 1;
      teamStats[winner.Team].points += 2;
      teamStats[winner.Team].pointsScored += team1Score;
      teamStats[winner.Team].pointsConceded += team2Score;

      teamStats[loser.Team].losses += 1;
      teamStats[loser.Team].points += 1;
      teamStats[loser.Team].pointsScored += team2Score;
      teamStats[loser.Team].pointsConceded += team1Score;
    });

    // Convert team stats to an array and sort by points, then point difference
    rankings[group] = Object.entries(teamStats)
      .map(([team, stats]) => ({
        team,
        ...stats,
        pointDifference: stats.pointsScored - stats.pointsConceded,
      }))
      .sort(
        (a, b) => b.points - a.points || b.pointDifference - a.pointDifference
      );
  }
  return rankings;
};

export const drawQuarterFinals = (hatD, hatE, hatF, hatG) => {
  const quarterFinalPairs = [];

  // Draw D vs G
  const dgMatchup = [
    hatD[Math.floor(Math.random() * hatD.length)],
    hatG[Math.floor(Math.random() * hatG.length)],
  ];
  quarterFinalPairs.push(dgMatchup);

  // Draw E vs F
  const efMatchup = [
    hatE[Math.floor(Math.random() * hatE.length)],
    hatF[Math.floor(Math.random() * hatF.length)],
  ];
  quarterFinalPairs.push(efMatchup);

  // Ensure no repeat matchups
  const remainingD = hatD.filter((team) => !dgMatchup.includes(team));
  const remainingG = hatG.filter((team) => !dgMatchup.includes(team));
  const remainingE = hatE.filter((team) => !efMatchup.includes(team));
  const remainingF = hatF.filter((team) => !efMatchup.includes(team));

  // Draw the second D vs G match
  quarterFinalPairs.push([remainingD[0], remainingG[0]]);

  // Draw the second E vs F match
  quarterFinalPairs.push([remainingE[0], remainingF[0]]);

  return quarterFinalPairs;
};

export const drawSemiFinals = (quarterFinalPairs) => {
  const semiFinalPairs = [];

  // Cross D&E pairs with F&G pairs
  semiFinalPairs.push([quarterFinalPairs[0], quarterFinalPairs[3]]);
  semiFinalPairs.push([quarterFinalPairs[1], quarterFinalPairs[2]]);

  return semiFinalPairs;
};
// Find team by name
export const findTeams = (data, teamNames) => {
  const foundTeams = [];

  for (const group of Object.values(data)) {
    for (const team of group) {
      if (teamNames.includes(team.Team)) {
        foundTeams.push(team);
      }
    }
  }

  return foundTeams;
}

export const simulateKnockoutStage = (pairs) => {
  const results = [];

  pairs.forEach(pair => {
    const matchResult = simulateMatch(pair[0], pair[1]);
    results.push(matchResult);
  });

  return results;
};

export const simulateTournament = (quarterFinalPairs) => {
  const quarterFinals = simulateKnockoutStage(quarterFinalPairs);

  // Determine semi-final pairs
  const semiFinalPairs = [
    [quarterFinals[0].winner, quarterFinals[1].winner],
    [quarterFinals[2].winner, quarterFinals[3].winner]
  ];

  const semiFinals = simulateKnockoutStage(semiFinalPairs);

  // Final and Third-Place Match
  const finalMatch = simulateMatch(semiFinals[0].winner, semiFinals[1].winner);
  const thirdPlaceMatch = simulateMatch(semiFinals[0].loser, semiFinals[1].loser);

  return {
    quarterFinals,
    semiFinals,
    finalMatch,
    thirdPlaceMatch,
  };
};

