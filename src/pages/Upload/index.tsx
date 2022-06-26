import {Box} from "@chakra-ui/react";
import Background from "@/components/Background";
import RainbowConnectButton from "@/components/RainbowConnectButton";
import React, {useState} from 'react';
import { toast } from 'react-toastify'
import cn from "classnames";
import { Contract } from 'ethers'
import { Web3Storage } from 'web3.storage'
import {useAppDispatch, useAppSelector} from "@/states/hooks";
import {selectWorldIDResponse, updateUploadedCID} from "@/states/application/slice";
import {JsonRpcProvider} from "@ethersproject/providers";
import * as WorldIDVerification from '../../abis/WorldIDVerification.json'
// import { Semaphore } from '@zk-kit/protocols'

const web3StorageToken = process.env.REACT_APP_WEB3_STORAGE_TOKEN!
const storage = new Web3Storage({ token: web3StorageToken, endpoint: new URL("https://api.web3.storage") })

export default function Upload() {
  const dispatch = useAppDispatch()

  const [image, setImage] = useState<{ preview: string; raw: File | null }>({
    preview: "",
    raw: null,
  });

  function handleFileUpload(e: React.MouseEvent<HTMLButtonElement>) {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  }

  async function handleUpload(e: any) {
    e.preventDefault();
    if (!(image.raw instanceof File)) {
      toast.error('Invalid image!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      })
      return
    }

    // const base64String = await getBase64(image.raw);
    // const result = await axios.post("https://api.web3.storage/upload", {
    //   photo: base64String,
    // });
    const cid = await storage.put([image.raw])
    // console.log(cid)
    dispatch(updateUploadedCID(cid))

    const provider = new JsonRpcProvider('https://rpc.ankr.com/polygon_mumbai')
    const contract = new Contract(WorldIDVerification.address, WorldIDVerification.abi, provider)

    const verifiers = [
      '0x0409b7528da4913daab9e5fdb03f09b09034fdb287da590213efeaa0e3a269905152d5e968a8be072ecf5e6dc3bc2a290f80afd40d6b7d5e70465da37d1e7bd78c',
      '0x0460fc9b61830bae4b97cc637db46e66488dc895b61fc425941f148dace80de7a2802b795331cc343463b39aca5865aeaf7a41ad461d4bb7815b51890a19b0e487',
      '0x043ab28b7dc27862e27f9116b9afeed034af1410fa4261199dd610ab5ba8feab778a8f885942ee56b43893303a7088e71114c4c9b182170d5d69472a4c06405655'
    ]

    // eslint-disable-next-line react-hooks/rules-of-hooks
    // const worldIDResponse = useAppSelector(selectWorldIDResponse)
    const worldIDResponse = {}

    if (!worldIDResponse.proof) return

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await contract.addSubmission(
      verifiers,
      [cid, cid, cid],
      worldIDResponse.merkle_root,
      worldIDResponse.nullifier_hash,
      worldIDResponse.proof,
    )

    toast.success('Uploaded successfully', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
    })
  }

  return (
    <div className="relative grid h-full w-full content-between bg-0f0b16 px-6 pt-5 xs:px-16 xs:pb-4.5 xs:pt-9">
      <Background />
      <div className={cn("relative grid gap-y-10 2xl:gap-y-64")}>
        <div className="w-full py-12 text-center">
          <div className="text-[20px] font-bold text-ffffff">Upload your document for verification.</div>
        </div>
        <div className="grid justify-items-center gap-y-3 justify-self-center text-ffffff xs:gap-y-4">
          <div>
            <label htmlFor="upload-button">
              {image.preview ? (
                <img
                  src={image.preview}
                  alt="dummy"
                  width="300"
                  height="300"
                />
              ) : (
                <div className="cursor-pointer bg-f1b261 py-4 px-2 hover:bg-f1b261/70">
                  {/*<span className="fa-stack fa-2x mt-3 mb-2">*/}
                  {/*  <i className="fas fa-circle fa-stack-2x" />*/}
                  {/*  <i className="fas fa-store fa-stack-1x fa-inverse" />*/}
                  {/*</span>*/}
                  <div className="text-center">Add photo ID photo</div>
                </div>
              )}
            </label>
            <input
              type="file"
              id="upload-button"
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
          </div>
          <button type="button" onClick={handleUpload} className="hover:bg-dddddd rounded-full bg-ffffff py-3 px-5 text-000000">Upload</button>

          <Box textColor="black" className="mt-6 grid justify-items-center gap-y-3">
            <RainbowConnectButton />
          </Box>
        </div>
      </div>
    </div>
  )
}
