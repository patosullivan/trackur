import Layout from '@/components/Layout/Layout';
import { useNavigate } from 'react-router';
import { useCurrentFast } from '@/state/fasts';
import CurrentFast from '@/components/CurrentFast';

export default function Home() {
  const navigate = useNavigate();
  const { currentFast } = useCurrentFast();

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
                <button onClick={() => navigate('/fasts')} className="button">
                  Manage Fasts
                </button>
              </div>
            </div>
          ) : (
            <button onClick={() => navigate('/fasts')} className="button">
              Start a Fast
            </button>
          )}
          <div className="flex items-center justify-center space-y-2">
            <button onClick={() => navigate('/weight')} className="button">
              Log your weight
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
