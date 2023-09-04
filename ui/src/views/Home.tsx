import Layout from '@/components/Layout/Layout';
import { useNavigate } from 'react-router';
import { useCurrentFast, useLastFast } from '@/state/fasts';
import CurrentFast from '@/components/CurrentFast';
import PrimaryButton from '@/components/PrimaryButton';
import SecondaryButton from '@/components/SecondaryButton';

export default function Home() {
  const navigate = useNavigate();
  const { currentFast } = useCurrentFast();
  const { lastFast, timeSinceLastFastHours, timeSinceLastFastMinutes } =
    useLastFast();

  return (
    <Layout>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Trackur
        </h1>
        <span className="ml-2 text-gray-500 dark:text-gray-400">
          A simple fitness tracker.
        </span>

        <div className="mt-8 flex flex-col space-y-2">
          {currentFast ? (
            <div className="flex flex-col space-y-2">
              <CurrentFast />
              <div className="flex items-center justify-center space-y-2">
                <SecondaryButton onClick={() => navigate('/fasts')}>
                  Manage Fasts
                </SecondaryButton>
              </div>
            </div>
          ) : (
            <>
              {lastFast && (
                <div className="flex flex-col space-y-2">
                  <span>
                    It's been {timeSinceLastFastHours} hours,{' '}
                    {timeSinceLastFastMinutes} minutes since your last fast.
                  </span>
                </div>
              )}
              <div className="flex items-center justify-center space-y-2">
                <PrimaryButton onClick={() => navigate('/fasts')}>
                  Start a Fast
                </PrimaryButton>
              </div>
            </>
          )}
          <div className="flex items-center justify-center space-y-2">
            <SecondaryButton onClick={() => navigate('/weight')}>
              Log your weight
            </SecondaryButton>
          </div>
        </div>
      </div>
    </Layout>
  );
}
