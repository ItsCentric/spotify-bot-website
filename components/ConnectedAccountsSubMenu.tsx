import axios from 'axios';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { IAccount } from '../models/Account';
import { BiUnlink } from 'react-icons/bi';
import Tooltip from './Tooltip';

export default function ConnectedAccountsSubMenu() {
  const [connectedAccounts, setConnectedAccounts] = useState([]);

  useEffect(() => {
    async function getConnectedAccounts() {
      const { data } = await axios.get('api/user/connected-accounts');
      setConnectedAccounts(data.accounts);
    }

    getConnectedAccounts();
  }, []);

  if (connectedAccounts.length === 0) {
    return <div>Loading accounts...</div>;
  } else {
    return (
      <ul>
        {connectedAccounts.map((account: IAccount) => (
          <li
            key={account.providerAccountId}
            className='flex justify-between items-center border border-white rounded-lg p-2'>
            <div>
              <Image
                src={`/icons/${account.provider}-icon.png`}
                alt={`${account.provider} logo`}
                width={32}
                height={32}
                className='inline-block mr-2'></Image>
              <p className='inline-block'>
                {account.provider.replace(account.provider[0], account.provider[0].toUpperCase())}
              </p>
            </div>
            <div>
              <button
                className='bg-red-500 enabled:hover:bg-red-600 transition-colors p-2 rounded-full disabled:contrast-75 group relative'
                onClick={async () =>
                  await axios.delete('/api/user/connected-accounts', {
                    params: { providerAccountId: account.providerAccountId },
                  })
                }
                disabled={connectedAccounts.length === 1}>
                <BiUnlink className='inline-block mr-1 align-middle' />
                <p className='inline-block align-middle'>Unlink</p>
                <Tooltip position='bottom' alignment='right'>
                  You must add another account before unlinking this one.
                </Tooltip>
              </button>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}
