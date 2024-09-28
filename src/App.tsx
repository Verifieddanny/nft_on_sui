import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import MintNFT from "./MintNFT";
function App() {
  const currentAccount = useCurrentAccount();

  return (
    <>
     <div className="app">
      <h1>Mint your NFT on SUI</h1>
       <div className="connect-button">

       <ConnectButton />
       </div>
       <h1>Mint NFT</h1>
       <div className="body">
        {
          currentAccount ? <MintNFT /> : (
            <div>Please connect your wallet to mint your NFT</div>
          )  
 
        }
       </div>
       
     </div>
    </>
  );
}

export default App;
