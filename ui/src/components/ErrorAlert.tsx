import cn from 'classnames';
// import { usePike } from '@/state/kiln';
// import useVereState from '@/state/vere';
// import { useCharge } from '@/state/docket';
// import { isTalk } from '@/logic/utils';
import Dialog, { DialogClose } from './Dialog';

interface ErrorAlertProps {
  error: Error;
  resetErrorBoundary: () => void;
  className?: string;
}

// function SubmitIssue({ error }: { error: Error }) {
// const title = error.message;
// const { location } = window;
// const { vereVersion, loaded } = useVereState();
// const pike = usePike(isTalk ? 'talk' : 'groups');
// const charge = useCharge(isTalk ? 'talk' : 'groups');
// const body = `
// App: ${isTalk ? 'Talk' : 'Groups'}%0A
// Version: ${charge?.version}%0A
// Vere Version: ${loaded ? vereVersion : ''}%0A
// Hash: ${pike?.hash}%0A
// Synced From: ${pike?.sync?.ship}%0A
// Location: ${location.pathname}%0A%0A
// \`\`\`%0A${error.stack?.replaceAll('\n', '%0A')}%0A\`\`\``;

// return (
// <a
// className="button"
// href={`https://github.com/tloncorp/homestead/issues/new?assignees=&labels=bug&template=bug_report.md&title=${title}&body=${body}`}
// target="_blank"
// rel="noreferrer"
// >
// Submit Issue
// </a>
// );
// }

export default function ErrorAlert({
  error,
  resetErrorBoundary,
  className,
}: ErrorAlertProps) {
  return (
    <Dialog
      defaultOpen
      modal
      onOpenChange={() => resetErrorBoundary()}
      close="none"
      className={cn('space-y-6 pr-8', className)}
      containerClass="w-full max-w-3xl"
    >
      <h2 className="h4">
        <span className="mr-3 text-orange-500">Encountered error:</span>
        <span className="font-mono">{error.message}</span>
      </h2>
      {error.stack && (
        <div className="w-full overflow-x-auto rounded bg-gray-50 p-2">
          <pre>{error.stack}</pre>
        </div>
      )}
      <div className="flex space-x-6">
        <DialogClose className="button">Try Again</DialogClose>
        {/*
        <DialogClose asChild>
          <SubmitIssue error={error} />
        </DialogClose>
        */}
      </div>
    </Dialog>
  );
}
