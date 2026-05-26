import { AuthProvider, LayoutProvider, useAuth } from './application/store';
import { LoginPage } from './presentation/pages/LoginPage';
import { DashboardPage } from './presentation/pages/DashboardPage';
import { Sidebar } from './presentation/components/Sidebar';
import { Toaster } from 'react-hot-toast';

function AppContent() {
  const { state } = useAuth();

  if (!state.currentUser) {
    return <LoginPage />;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <DashboardPage />
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <LayoutProvider>
        <AppContent />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 5000,
            style: {
              background: '#fff',
              color: '#333',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '12px 16px',
              fontSize: '14px',
            },
          }}
        />
      </LayoutProvider>
    </AuthProvider>
  );
}

export default App;
