import { useTournamentData } from "../state/useTournamentData";

export default function BasketballTournament() {
  const { groups, loading } = useTournamentData();

  console.log(loading,groups );
  
  return (
    <div>
      Basketball tournament component
    </div>
  );
}
