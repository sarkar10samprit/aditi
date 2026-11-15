import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Crash-proof boundary caught an issue:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#2B0B19] text-white flex flex-col items-center justify-center p-6 text-center select-none">
          <div className="w-16 h-16 rounded-full bg-pink-500/20 border border-pink-400/40 flex items-center justify-center mb-4 text-3xl">
            ✨
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl text-pink-100 mb-2">
            For My Dearest Coco
          </h1>
          <p className="font-sans text-sm text-pink-200/80 max-w-md mb-6">
            A momentary hiccup occurred, but your birthday sanctuary is safe.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 rounded-full luxury-button text-white text-xs uppercase tracking-widest font-semibold cursor-pointer"
          >
            Reload Website
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
