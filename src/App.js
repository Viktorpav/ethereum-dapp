import './App.css';
import { useEthers, useEtherBalance, useTokenBalance, useContractFunction } from '@usedapp/core'
import { utils, Contract } from 'ethers';
import { USDC } from './addresses';



export default function App() {
  const { activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);
  const tokenBalance = useTokenBalance(USDC, account);
  const usdcInt = new utils.Interface([
    "function mint(address, uint256)",
    "function transfer(address, uint256)"
  ]);
  const usdc = new Contract(USDC, usdcInt);
  const { send } = useContractFunction(usdc, "mint");
  const { send: transfer } = useContractFunction(usdc, "transfer");

  return (
    <div className="App">
      <header className="App-header">
        <h3>
          <code>Ethereum DApp</code>
        </h3>
        <button onClick={ activateBrowserWallet }>Connect</button>
        <code><span className='unselectable'>My address is: </span>{ account && account }</code>
        <code><span className='unselectable'>Ether Balance: </span>{ etherBalance && utils.formatEther(etherBalance) }</code>
        <br />
        <p>USDC Balance: { tokenBalance && utils.formatUnits(tokenBalance, 6) } </p>
        <br />
        <button onClick={ () => send(account, utils.parseUnits("1", 6)) }>Send</button>
        <button onClick={ () => transfer("0x77e739DC5840e8246ae1778ABBD6eD1D533Fa8fE", 3) }>Transfer</button>
      </header> 
    </div>
  )
}