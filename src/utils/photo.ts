import { cipher, decryptWithPrivateKey } from "eth-crypto";
import { Web3Storage } from "web3.storage";

const web3StorageToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDkyNDVlRTVjZUQyMUFBMTRFQzI0YTA3M2JiQjNhYTAwRjA3RkJhOTYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTYxOTc0NzczNjgsIm5hbWUiOiJueWMifQ.vkoBU8_O1GaOKIiTi9g7unIpM7SbnYw_tXWqhinK4wM";

const cids = [
  "bafybeiaeqnhkt3m2uzchv7eogbvxrwupayra5ian2tnz3plw64rc2x5zdy",
  "bafybeif6drthpjpyk4texti4flfo6k333ii3t4dtd4fcmbra5nvojvbrsa",
];

export const grabFromIPFS = async (cid: string, pk: string) => {
  const client = new Web3Storage({
    token: web3StorageToken,
    endpoint: new URL("https://api.web3.storage"),
  });

  const result = await client.get(cid);
  const files = await result!.files();
  const text = await files[0].text();

  // console.log(text);

  // const toDecode = cipher.parse(text as string);

  // console.log("Done");
  // return await decryptWithPrivateKey(pk, toDecode);
  const toDecode = cipher.parse(text );

  console.log("Done");
  return await decryptWithPrivateKey(pk, toDecode);
};

export async function getBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}
