import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Helmet } from 'react-helmet';
import Home from '@/views/Home';
import ErrorAlert from '@/components/ErrorAlert';
import Fasts from '@/views/Fasts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Weight from './views/Weight';

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorAlert}
      onReset={() => window.location.reload()}
    >
      <QueryClientProvider client={new QueryClient()}>
        <div className="flex h-full w-full flex-col p-4">
          <Router basename="/apps/trackur">
            <Helmet>
              <title>Trackur</title>
            </Helmet>
            <Routes>
              <Route element={<Home />} path="/" />
              <Route element={<Fasts />} path="/fasts" />
              <Route element={<Weight />} path="/weight" />
            </Routes>
          </Router>
        </div>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
