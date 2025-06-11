'use client';

import { getLocalStorage } from '@stacks/connect';

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
  if (!data) return null;

  const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded border border-gray-200">
      <h2 className="text-lg font-medium mb-4">Your Wallet</h2>
      
      {Object.entries(data.addresses).map(([key, addrs]) => (
        <div key={key} className="mb-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">{key.toUpperCase()}</h3>
          <div className="space-y-2">
            {addrs.map((addr, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <div className="font-mono text-sm">{formatAddress(addr.address)}</div>
                  {addr.type && <div className="text-xs text-gray-500">{addr.type}</div>}
                </div>
                <button 
                  onClick={() => navigator.clipboard.writeText(addr.address)}
                  className="text-xs text-[#F7931A] hover:underline"
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
