import { useState, useEffect } from 'react';

// Custom hook to load groups.json
export const useTournamentData = () => {
  const [groups, setGroups] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load groups.json
    fetch('/src/state/groups.json')
      .then((response) => response.json())
      .then((data) => setGroups(data))
      .catch((error) => console.error('Error loading groups.json:', error))
      .finally(() => setLoading(false));
  }, []);

  return { groups, loading };
};