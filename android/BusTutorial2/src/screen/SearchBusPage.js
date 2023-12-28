import React, {useState} from 'react';
import {SearchBar} from 'react-native-elements';

export default function SearchBusPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <>
      <SearchBar
        placeholder="Search..."
        containerStyle={{
          height: 50,
          padding: 0,
        }}
        onChangeText={onChangeSearch}
        value={searchQuery}
        clearIcon={null}
        searchIcon={null}
        lightTheme
        color={'black'}
      />
    </>
  );
}
