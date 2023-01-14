import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { DAppProvider, ChainId, Mainnet } from '@usedapp/core'
import { getDefaultProvider } from "ethers";

import './index.css';
import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const config = {
  readOnlyChainId: ChainId.Sepolia,
  // readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: getDefaultProvider('mainnet'),
    [ChainId.Sepolia]: getDefaultProvider('sepolia')
  }
}

// if (!config.readOnlyUrls[chainId]) {
//   return <p>Please use either Mainnet or Goerli testnet.</p>
// }

root.render(
  <StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </StrictMode>
);


