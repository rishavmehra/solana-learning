import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import "dotenv/config";
import {
    getKeypairFromEnvironment,
    getExplorerLink,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

const user = getKeypairFromEnvironment("SECRET_KEY");

let tokenMintAddress; // Declare outside the try block

try {
    tokenMintAddress = new PublicKey(process.env.TOKEN_MINT);
} catch (error) {
    console.error("Invalid TOKEN_MINT:", process.env.TOKEN_MINT);
    throw error;
}

const recipientAssocidatedTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    user,
    tokenMintAddress,
    user.publicKey
);

const transactionSignature = await mintTo(
    connection,
    user,
    tokenMintAddress,
    recipientAssocidatedTokenAccount.address,
    user,
    10 * MINOR_UNITS_PER_MAJOR_UNITS
);

const link = getExplorerLink("transaction", transactionSignature, connection);

console.log(`Success! Mint Token Transaction: ${link}`);
