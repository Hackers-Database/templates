'use client';

import { useState, useEffect } from 'react';
import { WalletConnectButton } from '@/app/components/WalletConnectButton';
import { WalletAddresses } from '@/app/components/WalletAddresses';
import { isConnected } from '@stacks/connect';

export default function Home() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

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
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="w-full p-4 flex justify-end">
        <WalletConnectButton />
      </nav>
      
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        {!isWalletConnected ? (
          <div className="text-center max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">
              Your Hackathon Journey starts here...
            </h1>
            <p className="text-lg text-gray-600">
              Connect your wallet to view your addresses and get started
            </p>
          </div>
        ) : (
          <WalletAddresses />
        )}
      </div>

      <footer className="text-center p-4 text-gray-600 border-t border-gray-100">
        Made with ❤️ by <a href="https://hackdb.io" className="text-black hover:underline">hackdb</a>
      </footer>
    </div>
  );
}