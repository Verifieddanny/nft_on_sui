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

 async function mint() {
   try {
     const tx = new Transaction();

     tx.moveCall({
       target: `${mintNftPackage}::sui_nft::mint`,
       arguments: [
         tx.pure.string("Pug"),
         tx.pure.string("Playful, Fearless, Mythical"),
         tx.pure.string(
           "https://peach-added-rooster-898.mypinata.cloud/ipfs/QmYx6GsYAKnNzZ9A6NvEKV9nf1VaDzJrqDR23Y8YSkebLU"
         ),
       ],
     });

     // Set an explicit gas budget
     tx.setGasBudget(10000000);

     console.log("Transaction block created:", tx);

     const result = signAndExecute({
       transaction: tx,
     });

     console.log("Transaction result:", result);
     window.alert("Minted successfully ✅");
   } catch (error) {
     console.error("Error creating or executing transaction:", error);
     window.alert(`Error minting NFT: ${error}`);
   }
 }
}

export default MintNFT;
