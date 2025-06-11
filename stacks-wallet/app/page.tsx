'use client';

import { useState, useEffect } from 'react';
import { WalletConnectButton } from '@/app/components/WalletConnectButton';
import { WalletAddresses } from '@/app/components/WalletAddresses';
import { isConnected } from '@stacks/connect';

export default function Home() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  // Listen for connection changes
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
      <div className="flex-1 flex flex-col items-center p-8">
        <div className="max-w-3xl w-full text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Your Hackathon Journey starts here...
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Connect your wallet to view your addresses and get started
          </p>
        </div>
        
        {isWalletConnected && <WalletAddresses />}
        
        {!isWalletConnected && (
          <div className="text-center max-w-2xl mx-auto bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-2">Connect Your Wallet</h2>
            <p className="text-gray-600 mb-4">
              Click the button in the top right corner to connect your wallet and view your addresses.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <p className="text-blue-700">
                This is a demo using the Stacks Connect API. Your wallet connection is handled securely in your browser.
              </p>
            </div>
          </div>
        )}
      </div>
      <footer className="text-center p-4 text-gray-600 border-t border-gray-100">
        Made with ❤️ by <a href="https://hackdb.io" className="text-black hover:underline">hackdb</a>
      </footer>
    </div>
  );
}