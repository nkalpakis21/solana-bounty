import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';

const network = clusterApiUrl('devnet'); // Use 'mainnet-beta' for production
const connection = new Connection(network, 'confirmed');

/**
 * Fetch account information from Solana
 * @param {string} publicKeyString - The public key of the account
 * @returns {Promise<AccountInfo | null>} - The account info or null if not found
 */
export async function getAccountInfo(publicKeyString) {
  try {
    const publicKey = new PublicKey(publicKeyString);
    const info = await connection.getAccountInfo(publicKey);
    return info;
  } catch (error) {
    console.error('Error fetching account info:', error);
    return null;
  }
}
