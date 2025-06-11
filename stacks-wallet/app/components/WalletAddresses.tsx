'use client';

import { getLocalStorage } from '@stacks/connect';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

type Address = {
  address: string;
  type?: string;
};

type WalletData = {
  addresses: {
    stx: Address[];
    btc: Address[];
  };
};

export const WalletAddresses = () => {
  const data = getLocalStorage() as WalletData;
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  if (!data) return null;

  const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  const handleCopy = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(address);
      setTimeout(() => setCopiedAddress(null), 2000);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto mt-8">
      <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Your Wallet Addresses</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your STX and BTC addresses</p>
        </div>
        
        <div className="p-6 space-y-6">
          {Object.entries(data.addresses).map(([key, addrs]) => (
            <div key={key} className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wider">{key}</h3>
              <div className="space-y-3">
                {addrs.map((addr, i) => (
                  <div 
                    key={i} 
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="space-y-1">
                      <div className="font-mono text-sm text-gray-900">{formatAddress(addr.address)}</div>
                      {addr.type && (
                        <div className="text-xs text-gray-500">{addr.type}</div>
                      )}
                    </div>
                    <button 
                      onClick={() => handleCopy(addr.address)}
                      className="p-2 text-gray-500 hover:text-[#F7931A] transition-colors duration-200 rounded-full hover:bg-gray-200"
                      title="Copy address"
                    >
                      {copiedAddress === addr.address ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
