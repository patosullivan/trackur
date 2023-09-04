import api from '@/api';
import { v4 as uuidv4 } from 'uuid';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import useReactQuerySubscription from '@/logic/useReactQuerySubscription';

type FastMeta = {
  start: number;
  end?: number;
  expectedduration: number;
  actualduration?: number;
};

export type Fast = {
  id: number;
  'fast-meta': FastMeta;
};

export function useFasts(): { fasts: Fast[]; loading: boolean } {
  const { data, ...rest } = useReactQuerySubscription({
    queryKey: ['fasts', 'all'],
    app: 'fasts',
    scry: '/entries/all',
    path: '/updates',
  });

  if (!data) {
    return { fasts: [], loading: true };
  }

  const { fasts } = data as { fasts: Fast[]; time: number };

  return { fasts, loading: rest.isLoading };
}

export function useCurrentFast(): {
  currentFast: Fast | undefined;
  currentDurationHours: number;
  currentDurationMinutes: number;
  currentDurationSeconds: number;
  percentageComplete: number;
} {
  const [currentFast, setCurrentFast] = useState<Fast>();
  const [currentDuration, setCurrentDuration] = useState(0);
  const currentDurationHours = Math.floor(currentDuration);
  const currentDurationMinutes = Math.floor(
    (currentDuration - currentDurationHours) * 60
  );

  const currentDurationSeconds = Math.floor(
    currentDuration * 3600 -
      currentDurationHours * 3600 -
      currentDurationMinutes * 60
  );
  const percentageComplete = currentFast
    ? Math.floor(
        (currentDuration / currentFast['fast-meta'].expectedduration) * 100
      )
    : 0;

  const { fasts, loading } = useFasts();

  useEffect(() => {
    if (loading) {
      return;
    }
    const currentFast = fasts.find((fast: Fast) => !fast['fast-meta'].end);
    setCurrentFast(currentFast);
  }, [fasts, loading]);

  useEffect(() => {
    if (currentFast) {
      const updateDuration = () => {
        const start = new Date(currentFast['fast-meta'].start);
        const diff = Date.now() - start.getTime();
        const diffInHours = diff / 1000 / 60 / 60;
        setCurrentDuration(diffInHours);
      };

      updateDuration();

      const intervalId = setInterval(updateDuration, 1000);

      return () => clearInterval(intervalId);
    }
  }, [currentFast]);

  return {
    currentFast,
    currentDurationHours,
    currentDurationMinutes,
    currentDurationSeconds,
    percentageComplete,
  };
}

export function useFast(id: number): Fast | undefined {
  const { fasts } = useFasts();

  return fasts.find((fast: Fast) => fast.id === id);
}

export function useLastFast(): {
  lastFast: Fast | undefined;
  timeSinceLastFastHours: number;
  timeSinceLastFastMinutes: number;
  timeSinceLastFastSeconds: number;
} {
  const { fasts } = useFasts();
  const [lastFast, setLastFast] = useState<Fast>();
  const [timeSinceLastFast, setTimeSinceLastFast] = useState(0);
  const timeSinceLastFastHours = Math.floor(timeSinceLastFast);
  const timeSinceLastFastMinutes = Math.floor(
    (timeSinceLastFast - timeSinceLastFastHours) * 60
  );
  const timeSinceLastFastSeconds = Math.floor(
    timeSinceLastFast * 3600 -
      timeSinceLastFastHours * 3600 -
      timeSinceLastFastMinutes * 60
  );

  useEffect(() => {
    if (fasts.length > 0) {
      setLastFast(fasts[fasts.length - 1]);
    }
  }, [fasts]);

  useEffect(() => {
    if (lastFast && lastFast['fast-meta'].end !== undefined) {
      const updateDuration = () => {
        // const end = new Date();
        const diff = Date.now() - lastFast['fast-meta'].end!!;
        const diffInHours = diff / 1000 / 60 / 60;
        setTimeSinceLastFast(diffInHours);
      };

      updateDuration();

      const intervalId = setInterval(updateDuration, 1000);

      return () => clearInterval(intervalId);
    }
  }, [lastFast]);

  return {
    lastFast,
    timeSinceLastFastHours,
    timeSinceLastFastMinutes,
    timeSinceLastFastSeconds,
  };
}

export function useAddFastMutation() {
  const queryClient = useQueryClient();
  const mutationFn = (variables: { start: number; expectedDuration: number }) =>
    api.poke({
      app: 'fasts',
      mark: 'fasts-action',
      json: {
        add: {
          id: uuidv4(),
          'fast-meta': {
            start: variables.start,
            expectedduration: variables.expectedDuration,
            actualduration: null,
            end: null,
          },
        },
      },
    });

  return useMutation(mutationFn, {
    onSuccess: () => {
      queryClient.invalidateQueries(['fasts', 'all']);
    },
  });
}

export function useEndFastMutation() {
  const queryClient = useQueryClient();
  const fasts = useFasts();
  const mutationFn = (variables: { id: number; end: number }) => {
    const fast = fasts.fasts.find((fast: Fast) => fast.id === variables.id);

    if (!fast) {
      throw new Error('No fast found');
    }

    return api.poke({
      app: 'fasts',
      mark: 'fasts-action',
      json: {
        edit: {
          id: variables.id,
          'fast-meta': {
            ...fast['fast-meta'],
            end: variables.end,
          },
        },
      },
    });
  };

  return useMutation(mutationFn, {
    onSuccess: () => {
      queryClient.invalidateQueries(['fasts', 'all']);
    },
  });
}

export function useEditFastMutation() {
  const fasts = useFasts();
  const queryClient = useQueryClient();
  const mutationFn = (variables: {
    id: number;
    start: number;
    end: number;
  }) => {
    const fast = fasts.fasts.find((fast: Fast) => fast.id === variables.id);

    if (!fast) {
      throw new Error('No fast found');
    }

    return api.poke({
      app: 'fasts',
      mark: 'fasts-action',
      json: {
        edit: {
          id: variables.id,
          'fast-meta': {
            ...fast['fast-meta'],
            start: variables.start,
            end: variables.end,
          },
        },
      },
    });
  };

  return useMutation(mutationFn, {
    onSuccess: () => {
      queryClient.invalidateQueries(['fasts', 'all']);
    },
  });
}

export function useDeleteFastMutation() {
  const queryClient = useQueryClient();
  const mutationFn = (variables: { id: number }) =>
    api.poke({
      app: 'fasts',
      mark: 'fasts-action',
      json: {
        delete: {
          id: variables.id,
        },
      },
    });

  return useMutation(mutationFn, {
    onSuccess: () => {
      queryClient.invalidateQueries(['fasts', 'all']);
    },
  });
}
