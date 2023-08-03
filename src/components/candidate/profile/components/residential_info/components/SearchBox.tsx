import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../../../../../utils/hooks/useDebounce';
import { useGlobalContext } from '../../../../../../context/GlobalContext';
import { HttpClient } from '../../../../../../utils/generic/httpClient';
import { searchEndpoints } from '../../../../../../assets/api/ApiList';

type SearchBox = {
  innerComponent: boolean;
  setFetchedAddress?: React.Dispatch<React.SetStateAction<any>>;
};

export const SearchBox: React.FC<SearchBox> = ({ innerComponent, setFetchedAddress }): JSX.Element => {
  const navigate = useNavigate();
  const { authClient, scrollToTop } = useGlobalContext();

  const [addressQuery, setAddressQuery] = useState<string>('');
  const [addressList, setAddressList] = useState<Array<any>>([]);

  const query = useDebounce(addressQuery);

  const fetchAddresses = async (q: string) => {
    if (!q || q.length < 2) {
      setAddressList([]);
      return;
    }

    const queryParams = new URLSearchParams({
      address: q,
    }).toString();

    const res = await HttpClient.callApiAuth<Array<any>>(
      {
        url: `${searchEndpoints.searchAddress}?${queryParams}`,
        method: 'GET',
      },
      authClient
    );

    if (res.ok) {
      setAddressList(res.value);
    } else {
      console.error(res.error);
    }
  };

  useEffect(() => {
    fetchAddresses(query);
  }, [query]);

  const handleSelectedAddress = (event: React.MouseEvent<HTMLButtonElement>, address: any) => {
    if (innerComponent) {
      if (setFetchedAddress) {
        setFetchedAddress(address);
      }
    } else {
      navigate('/candidate/profile/address/addResidentialInfo', { state: address });
      scrollToTop();
    }
  };

  return (
    <>
      <input
        style={{ border: '1px solid' }}
        type="search"
        name="location-search"
        id="location-search"
        onChange={(e) => setAddressQuery(e.target.value)}
      />
      <div style={{ border: '1px solid' }}>
        {addressList.map((address, idx) => {
          return (
            <button key={idx} onClick={(e) => handleSelectedAddress(e, address)}>
              {address.addressString}
            </button>
          );
        })}
      </div>
    </>
  );
};
