import { Transaction } from "@mysten/sui/transactions";
import { useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { useNetworkVariable } from "./networkConfig";
function MintNFT() {
    const mintNftPackage = useNetworkVariable("mintNftPackageId")
     const suiClient = useSuiClient();
     const { mutate: signAndExecute } = useSignAndExecuteTransaction({
       execute: async ({ bytes, signature }) =>
         await suiClient.executeTransactionBlock({
           transactionBlock: bytes,
           signature,
           options: {
             showRawEffects: true,
             showEffects: true,
           },
         }),
     });

  return <div>
    <button onClick={() => {
        mint();
  
    }}>Mint NFT</button>
  </div>;

 function mint() {
   
     const tx = new Transaction();

     tx.moveCall({
       target: `${mintNftPackage}::my_hero::mint`,
       arguments: [
         tx.pure.string("Pug"),
         tx.pure.string(
           "https://ipfs.io/ipfs/QmYx6GsYAKnNzZ9A6NvEKV9nf1VaDzJrqDR23Y8YSkebLU"
         ),
       ],
     });

     tx.setGasBudget(10000000);


     signAndExecute({
       transaction: tx,
     }, {
        onSuccess: async() => {
          console.log("Minted successfully");
        },
      });

 
   
 }
}

export default MintNFT;
