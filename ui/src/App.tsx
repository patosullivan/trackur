import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Helmet } from 'react-helmet';
import Home from '@/views/Home';
import ErrorAlert from '@/components/ErrorAlert';
import Fast from '@/views/Fast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
              <Route element={<Fast />} path="/fast" />
            </Routes>
          </Router>
        </div>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
