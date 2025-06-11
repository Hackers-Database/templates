'use client';

import { useState, useEffect, useRef } from 'react';
import { connect, disconnect, getLocalStorage, isConnected } from '@stacks/connect';

export const WalletConnectButton = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Check connection status on mount
  useEffect(() => {
    const checkConnection = () => {
      try {
        const connected = isConnected();
        setIsWalletConnected(connected);
      } catch (err) {
        console.error('Error checking connection status:', err);
        setIsWalletConnected(false);
      }
    };
    
    checkConnection();

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleConnect = async () => {
    try {
      setError(null);
      setIsConnecting(true);
      const response = await connect();
      console.log('Wallet connected:', response);
      setIsWalletConnected(true);
    } catch (err) {
      console.error('Error connecting wallet:', err);
      setError('Failed to connect wallet. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    try {
      disconnect();
      setIsWalletConnected(false);
      setShowDropdown(false);
    } catch (err) {
      console.error('Error disconnecting wallet:', err);
      setError('Failed to disconnect wallet. Please try again.');
    }
  };

  if (isWalletConnected) {
    const userData = getLocalStorage()
    console.log(userData)
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          className="flex items-center gap-2 px-6 py-2 border border-[#F7931A] text-[#F7931A] font-bold hover:bg-[#F7931A] hover:text-white transition-colors duration-200 rounded-sm"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          <span>Connected</span>
        </button>
        
        {showDropdown && (
          <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 shadow-md rounded-sm z-10">
            <button
              className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-50 transition-colors text-sm"
              onClick={handleDisconnect}
            >
              Disconnect
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        className={`px-6 py-2 border border-[#F7931A] text-[#F7931A] font-bold rounded-sm transition-colors duration-200 hover:bg-[#F7931A] hover:text-white focus:ring-[#F7931A] flex items-center gap-2 ${
          isConnecting ? 'opacity-75 cursor-not-allowed' : ''
        }`}
        onClick={handleConnect}
        disabled={isConnecting}
      >
        {isConnecting ? (
          <>
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Connecting...
          </>
        ) : (
          'Connect Wallet'
        )}
      </button>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};