import { useDeleteWeightMutation, Weight } from '@/state/weights';
import { format } from 'date-fns-tz';
import DestructiveButton from '@/components/DestructiveButton';
import SecondaryButton from '@/components/SecondaryButton';
import classNames from 'classnames';
import { useState } from 'react';
import Dialog from '@/components/Dialog';
import EditWeight from '@/components/EditWeight';

interface PreviousWeightProps {
  item: Weight;
  i: number;
}

export default function PreviousWeight({ item: weight, i }: PreviousWeightProps) {
  const [editWeight, setEditWeight] = useState<Weight | undefined>(undefined);
  const { mutate: deleteWeightMutation, isLoading: deleteWeightIsLoading } =
    useDeleteWeightMutation();
  return (
    <div
      key={weight.id}
      className={classNames('flex flex-col space-y-2', {
        'border-t border-gray-300 pt-2 dark:border-gray-700': i > 0,
      })}
    >
      <div className="flex items-center space-x-2">
        <span className="font-bold">Date:</span>
        <span>{format(new Date(weight['weight-meta'].date), 'Pp')}</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="font-bold">Weight:</span>
        <span>{weight['weight-meta'].weight}</span>
      </div>
      <div className="flex space-x-2">
        <DestructiveButton
          isLoading={deleteWeightIsLoading}
          onClick={() => deleteWeightMutation({ id: weight.id })}
        >
          Delete
        </DestructiveButton>
        <SecondaryButton onClick={() => setEditWeight(weight)}>
          Edit
        </SecondaryButton>
      </div>
      <Dialog
        open={!!editWeight}
        onOpenChange={() => setEditWeight(undefined)}
        aria-labelledby="form-dialog-title"
      >
        <EditWeight editWeight={editWeight} setEditWeight={setEditWeight} />
      </Dialog>
    </div>
  );
}
