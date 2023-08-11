import React, { useEffect, useRef, useState } from 'react';
import { Box, List } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../../../../../utils/hooks/useDebounce';
import { useGlobalContext } from '../../../../../../context/GlobalContext';
import { HttpClient } from '../../../../../../utils/generic/httpClient';
import { searchEndpoints } from '../../../../../../assets/api/ApiList';
import classes from '../../../styles/search-box.module.css';
import { MdOutlineLocationOn, MdOutlineSearch } from 'react-icons/md';
import { useForm } from '@mantine/form';

type SearchBox = {
  innerComponent: boolean;
  setFetchedAddress?: React.Dispatch<React.SetStateAction<FetchedAddressType>>;
  residentialInfoForm?: ReturnType<typeof useForm<residentialInfoFormType>>;
};

export const SearchBox: React.FC<SearchBox> = ({
  innerComponent,
  setFetchedAddress,
  residentialInfoForm,
}): JSX.Element => {
  const navigate = useNavigate();
  const { authClient, scrollToTop } = useGlobalContext();

  const [addressQuery, setAddressQuery] = useState<string>('');
  const [addressList, setAddressList] = useState<Array<FetchedAddressType>>([]);
  const [showSearchList, setShowSearchList] = useState<boolean>(false);

  const query = useDebounce(addressQuery);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchListContainerRef = useRef<HTMLOListElement>(null);

  const fetchAddresses = async (q: string) => {
    if (!q || q.length < 2) {
      setAddressList([]);
      return;
    }

    const queryParams = new URLSearchParams({
      address: q,
    }).toString();

    const res = await HttpClient.callApiAuth<Array<FetchedAddressType>>(
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

  const handleSelectedAddress = (event: React.MouseEvent<HTMLButtonElement>, address: FetchedAddressType) => {
    setShowSearchList(false);
    if (innerComponent) {
      if (setFetchedAddress) {
        setFetchedAddress(address);
      }

      if (residentialInfoForm) {
        residentialInfoForm.setValues(address.address);
      }

      navigate('.', { replace: true, state: address });
    } else {
      navigate('/candidate/profile/address/addResidentialInfo', { state: address });
      scrollToTop();
    }
  };

  useEffect(() => {
    document.addEventListener(
      'click',
      (event) => {
        const targetElement = event.target;
        if (searchListContainerRef.current && searchListContainerRef.current.contains(targetElement as Node)) {
          return;
        }

        if (searchContainerRef.current && searchContainerRef.current.contains(targetElement as Node)) {
          setShowSearchList(true);
          return;
        }

        setShowSearchList(false);
      },
      true
    );
    return () => {
      document.removeEventListener(
        'click',
        (event) => {
          const targetElement = event.target;
          if (searchListContainerRef.current && searchListContainerRef.current.contains(targetElement as Node)) {
            return;
          }

          if (searchContainerRef.current && searchContainerRef.current.contains(targetElement as Node)) {
            setShowSearchList(true);
            return;
          }

          setShowSearchList(false);
        },
        true
      );
    };
  }, []);

  return (
    <>
      <Box className={classes.searchBoxContainer}>
        <Box className={classes.locationIconWrapper}>
          <span className={classes.locationIconContainer}>
            <MdOutlineLocationOn />
          </span>
        </Box>
        <Box className={classes.searchInputContainer} ref={searchContainerRef}>
          <span className={classes.searchIconContainer}>
            <MdOutlineSearch />
          </span>
          <input
            type="search"
            name="location-search"
            id="location-search"
            placeholder="Search your address"
            onChange={(e) => setAddressQuery(e.target.value)}
            className={classes.searchInputControl}
          />
          {showSearchList && addressList.length > 0 && (
            <List className={classes.addressList} ref={searchListContainerRef}>
              {addressList.map((address, idx) => {
                return (
                  <List.Item key={idx} className={classes.addressListItems}>
                    <button onClick={(e) => handleSelectedAddress(e, address)} className={classes.addressButton}>
                      {address.addressString}
                    </button>
                  </List.Item>
                );
              })}
            </List>
          )}
        </Box>
      </Box>
    </>
  );
};
