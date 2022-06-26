import { ConnectButton } from '@rainbow-me/rainbowkit'
import React, {Dispatch, SetStateAction} from 'react'

// import {updateWalletAddress} from "@/states/application/slice";
// import {useAppDispatch} from "@/states/hooks";

export default function RainbowConnectButton({
  setWalletAddress
}: {
  setWalletAddress: Dispatch<SetStateAction < string | undefined >>
}): JSX.Element {
  // const dispatch = useAppDispatch()

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 12,
      }}
    >
      <ConnectButton.Custom>
        {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            mounted,
          }) => {
          return (
            <div
              {...(!mounted && {
                'aria-hidden': true,
                'style': {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!mounted || !account || !chain) {
                  return (
                    <button onClick={openConnectModal} type="button" className="hover:bg-bbbbbb rounded-full bg-ffffff py-3 px-5 transition">
                      Connect Wallet
                    </button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <button onClick={openChainModal} type="button" className="hover:bg-bbbbbb rounded-full bg-ffffff py-3 px-5 transition">
                      Wrong network
                    </button>
                  );
                }

                setWalletAddress(account.address)
                // dispatch(updateWalletAddress(account.address))

                return (
                  <div style={{ display: 'flex', gap: 12 }} className="hover:bg-bbbbbb rounded-full bg-ffffff py-3 px-5 transition">
                    <button
                      onClick={openChainModal}
                      style={{ display: 'flex', alignItems: 'center' }}
                      type="button"
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 12,
                            height: 12,
                            borderRadius: 999,
                            overflow: 'hidden',
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? 'Chain icon'}
                              src={chain.iconUrl}
                              width={12}
                              height={12}
                            />
                          )}
                        </div>
                      )}
                      {chain.name}
                    </button>

                    <button onClick={openAccountModal} type="button">
                      {account.displayName}
                      {account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ''}
                    </button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </div>
  )
}
