import { AuthProvider, LayoutProvider, useAuth, useLayout } from './application/store';
import { LoginPage } from './presentation/pages/LoginPage';
import { DashboardPage } from './presentation/pages/DashboardPage';
import { Sidebar } from './presentation/components/Sidebar';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

function AppContent() {
  const { state: authState } = useAuth();
  const { dispatch: layoutDispatch } = useLayout();

  // Actualizar userId en LayoutContext cuando cambia el usuario autenticado
  useEffect(() => {
    if (authState.currentUser) {
      layoutDispatch({ type: 'SET_USER_ID', payload: authState.currentUser.id });
    } else {
      layoutDispatch({ type: 'SET_USER_ID', payload: null });
    }
  }, [authState.currentUser, layoutDispatch]);

  if (!authState.currentUser) {
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
