import { Component, type ReactNode } from 'react';

/** Catches render errors so one broken page shows a message instead of a blank app. */
export class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: { componentStack?: string | null }) {
    console.error('UI error:', error, info.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface p-6">
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-xl font-bold text-white">Something went wrong</h1>
          <p className="text-sm text-zinc-400">This page hit an unexpected error. Reloading usually fixes it.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-lg bg-primary-container text-on-primary-container text-sm font-semibold"
          >
            Reload
          </button>
        </div>
      </div>
    );
  }
}
