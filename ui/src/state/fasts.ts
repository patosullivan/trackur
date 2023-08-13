import api from '@/api';
import { v4 as uuidv4 } from 'uuid';
import useReactQueryScry from '@/logic/useReactQueryScry';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import useReactQuerySubscription from '@/logic/useReactQuerySubscription';

type FastMeta = {
  start: number;
  end?: number;
  expectedduration: number;
  actualduration?: number;
};

type Fast = {
  id: number;
  'fast-meta': FastMeta;
};

export function useFasts(): { fasts: Fast[]; loading: boolean } {
  // const { data, ...rest } = useReactQueryScry<{ time: number; fasts: [] }>({
  // queryKey: ['fasts', 'all'],
  // app: 'fasts',
  // path: '/entries/all',
  // });
  const { data, ...rest } = useReactQuerySubscription({
    queryKey: ['fasts', 'all'],
    app: 'fasts',
    scry: '/entries/all',
    path: '/updates',
  });

  console.log({ data });

  if (!data) {
    return { fasts: [], loading: true };
  }

  const { fasts } = data as { fasts: Fast[]; time: number };

  return { fasts, loading: rest.isLoading };
}

export function useCurrentFast(): Fast | undefined {
  const [currentFast, setCurrentFast] = useState<Fast>();
  const { fasts, loading } = useFasts();

  useEffect(() => {
    if (loading) {
      return;
    }
    const currentFast = fasts.find((fast: Fast) => !fast['fast-meta'].end);
    setCurrentFast(currentFast);
  }, [fasts, loading]);

  return currentFast;
}

export function useFast(id: number): Fast | undefined {
  const { fasts } = useFasts();

  return fasts.find((fast: Fast) => fast.id === id);
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
