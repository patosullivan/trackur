import Layout from '@/components/Layout/Layout';
import { useNavigate } from 'react-router';

export default function Home() {
  const navigate = useNavigate();

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
          <button onClick={() => navigate('/fasts')} className="button">
            Start a Fast
          </button>
          <button className="button">Log your weight</button>
        </div>
      </div>
    </Layout>
  );
}
