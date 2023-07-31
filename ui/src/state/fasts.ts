import { useState, useEffect } from 'react';

type Fast = {
  id: number;
  start: string;
  end?: string;
  expectedDuration: number;
  actualDuration?: number;
};

function fakeFastResponse(): Promise<any> {
  const fasts: Fast[] = [
    {
      id: 1,
      start: '2022-08-01T12:00:00',
      end: '2022-08-02T12:00:00',
      expectedDuration: 24,
      actualDuration: 24,
    },
    {
      id: 2,
      start: '2022-08-03T12:00:00',
      end: '2022-08-03T12:00:00',
      expectedDuration: 24,
      actualDuration: 24,
    },
    {
      id: 3,
      start: '2023-07-30T12:00:00',
      expectedDuration: 24,
      actualDuration: 24,
    },
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ json: () => Promise.resolve(fasts) });
    }, 1000);
  });
}

export function useFasts(): { fasts: Fast[]; loading: boolean } {
  const [fasts, setFasts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFasts = async () => {
      const response = await fakeFastResponse();
      const fasts = await response.json();
      setFasts(fasts);
      setLoading(false);
    };

    fetchFasts();
  }, []);

  return { fasts, loading };
}

export function useCurrentFast(): Fast | undefined {
  const [currentFast, setCurrentFast] = useState<Fast>();

  useEffect(() => {
    const fetchCurrentFast = async () => {
      const response = await fakeFastResponse();
      const fasts = await response.json();
      const currentFast = fasts.find((fast: Fast) => !fast.end);
      setCurrentFast(currentFast);
    };

    fetchCurrentFast();
  }, []);

  return currentFast;
}
