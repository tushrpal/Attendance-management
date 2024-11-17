import React, { useState } from 'react';

function SearchComponent({ data, setSearchResults }) {
  const [nameQuery, setNameQuery] = useState('');
  const [branchQuery, setBranchQuery] = useState('');
  const [registerNumberQuery, setRegisterNumberQuery] = useState('');

  const handleSearch = () => {
    const filteredResults = data.filter((item) => {
      const matchesName = item.Name.toLowerCase().includes(nameQuery.toLowerCase());
      const matchesBranch = item.Branch_of_studying.toLowerCase().includes(branchQuery.toLowerCase());
      const matchesRegisterNumber = item.Register_number.toLowerCase().includes(registerNumberQuery.toLowerCase());
      return matchesName && matchesBranch && matchesRegisterNumber;
    });

    setSearchResults(filteredResults);
  };

  return (
    <div className="SearchComponent">
      <input
        type="text"
        placeholder="Search by Name"
        value={nameQuery}
        onChange={(e) => setNameQuery(e.target.value)}
      />
      <input
        type="text"
        placeholder="Search by Branch"
        value={branchQuery}
        onChange={(e) => setBranchQuery(e.target.value)}
      />
      <input
        type="text"
        placeholder="Search by Register Number"
        value={registerNumberQuery}
        onChange={(e) => setRegisterNumberQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchComponent;
