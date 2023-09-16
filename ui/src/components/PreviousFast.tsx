import React, { useState } from 'react';
import classNames from 'classnames';
import { intervalToDuration } from 'date-fns';
import { format } from 'date-fns-tz';
import { Fast, useDeleteFastMutation } from '@/state/fasts';
import DestructiveButton from '@/components/DestructiveButton';
import SecondaryButton from '@/components/SecondaryButton';
import Dialog from '@/components/Dialog';
import EditFast from '@/components/EditFast';

interface PreviousFastProps {
  fast: Fast;
  i: number;
}

export default function PreviousFast({ fast, i }: PreviousFastProps) {
  const [editFast, setEditFast] = useState<Fast | undefined>();
  const { mutate: deleteFastMutation, isLoading: deleteFastIsLoading } =
    useDeleteFastMutation();

  const duration = fast['fast-meta'].end
    ? intervalToDuration({
        start: new Date(fast['fast-meta'].start),
        end: new Date(fast['fast-meta'].end),
      })
    : null;

  return (
    <div
      key={fast.id}
      className={classNames('flex flex-col space-y-2', {
        'border-t border-gray-300 pt-2 dark:border-gray-700': i > 0,
      })}
    >
      <div className="flex items-center space-x-2">
        <span className="font-bold">Start:</span>
        <span>{format(new Date(fast['fast-meta'].start), 'Pp')}</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="font-bold">Expected Duration:</span>
        <span>{fast['fast-meta'].expectedduration}</span>
      </div>
      {fast['fast-meta'].end && duration && (
        <>
          <span className="font-bold">End:</span>
          <span>{format(new Date(fast['fast-meta'].end), 'Pp')}</span>

          <span className="font-bold">Actual Duration:</span>
          <span>
            {!!duration.days && duration.days > 0 && `${duration.days} days, `}
            {!!duration.hours &&
              duration.hours > 0 &&
              `${duration.hours} hours, `}
            {!!duration.minutes &&
              duration.minutes > 0 &&
              `${duration.minutes} minutes`}
          </span>
          <div className="flex space-x-2">
            <DestructiveButton
              onClick={() => deleteFastMutation({ id: fast.id })}
              isLoading={deleteFastIsLoading}
            >
              Delete
            </DestructiveButton>
            <SecondaryButton onClick={() => setEditFast(fast)}>
              Edit
            </SecondaryButton>
          </div>
        </>
      )}
      <Dialog
        open={!!editFast}
        onOpenChange={() => setEditFast(undefined)}
        aria-labelledby="form-dialog-title"
      >
        <EditFast editFast={editFast} setEditFast={setEditFast} />
      </Dialog>
    </div>
  );
}
