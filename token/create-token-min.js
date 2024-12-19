import { createMint } from "@solana/spl-token"
import "dotenv/config"
import {
    getKeypairFromEnvironment,
    getExplorerLink,
} from "@solana-developers/helpers"
import { Connection, clusterApiUrl } from "@solana/web3.js"

const connection= new Connection(clusterApiUrl("devnet"))

const user = getKeypairFromEnvironment("SECRET_KEY")

console.log(
    "loaded our keypair securely, using env file! out private key is:", user.publicKey.toBase58()
);


const tokenMint = await createMint(connection, user, user.publicKey, null, 6)
const link = getExplorerLink("address", tokenMint.toString(), "devnet")
console.log(`success created token mint: ${link}`);







