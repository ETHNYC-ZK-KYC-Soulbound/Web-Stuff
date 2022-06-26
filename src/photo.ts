import { cipher, decryptWithPrivateKey } from "eth-crypto";
import { Web3Storage } from "web3.storage";

const web3StorageToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDkyNDVlRTVjZUQyMUFBMTRFQzI0YTA3M2JiQjNhYTAwRjA3RkJhOTYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTYxOTc0NzczNjgsIm5hbWUiOiJueWMifQ.vkoBU8_O1GaOKIiTi9g7unIpM7SbnYw_tXWqhinK4wM";

export const grabFromIPFS = async (cid: string) => {
  const client = new Web3Storage({
    token: web3StorageToken,
    endpoint: new URL("https://api.web3.storage"),
  });

  const result = await client.get(cid);
  const files = await result!.files();
  const text = await files![0].text();

  const toDecode = cipher.parse(text as string);
  return await decryptWithPrivateKey("privateKey", toDecode);
};

export function getBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}
