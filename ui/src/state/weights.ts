import api from '@/api';
import { v4 as uuidv4 } from 'uuid';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import useReactQuerySubscription from '@/logic/useReactQuerySubscription';

type WeightMeta = {
  date: number;
  weight: number;
};

export type Weight = {
  id: number;
  'weight-meta': WeightMeta;
};

export function useWeights(): { weights: Weight[]; loading: boolean } {
  const { data, ...rest } = useReactQuerySubscription({
    queryKey: ['weights', 'all'],
    app: 'weights',
    scry: '/entries/all',
    path: '/updates',
  });

  if (!data) {
    return { weights: [], loading: true };
  }

  const { weights } = data as { weights: Weight[]; time: number };

  return { weights, loading: rest.isLoading };
}

export function useWeight(id: number): Weight | undefined {
  const { weights } = useWeights();

  return weights.find((weight: Weight) => weight.id === id);
}

export function useAddWeightMutation() {
  const queryClient = useQueryClient();
  const mutationFn = (variables: { date: number; weight: number }) =>
    api.poke({
      app: 'weights',
      mark: 'weights-action',
      json: {
        add: {
          id: uuidv4(),
          'weight-meta': {
            date: variables.date,
            weight: variables.weight,
          },
        },
      },
    });

  return useMutation(mutationFn, {
    onSuccess: () => {
      queryClient.invalidateQueries(['weights', 'all']);
    },
  });
}

export function useEditWeightMutation() {
  const weights = useWeights();
  const queryClient = useQueryClient();
  const mutationFn = (variables: {
    id: number;
    date: number;
    weight: number;
  }) => {
    const weight = weights.weights.find((weight: Weight) => weight.id === variables.id);

    if (!weight) {
      throw new Error('No weight found');
    }

    return api.poke({
      app: 'weights',
      mark: 'weights-action',
      json: {
        edit: {
          id: variables.id,
          'weight-meta': {
            ...weight['weight-meta'],
            date: variables.date,
            weight: variables.weight,
          },
        },
      },
    });
  };

  return useMutation(mutationFn, {
    onSuccess: () => {
      queryClient.invalidateQueries(['weights', 'all']);
    },
  });
}

export function useDeleteWeightMutation() {
  const queryClient = useQueryClient();
  const mutationFn = (variables: { id: number }) =>
    api.poke({
      app: 'weights',
      mark: 'weights-action',
      json: {
        delete: {
          id: variables.id,
        },
      },
    });

  return useMutation(mutationFn, {
    onSuccess: () => {
      queryClient.invalidateQueries(['weights', 'all']);
    },
  });
}
