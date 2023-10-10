import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact';
import _ from 'lodash';

function AssetGrid({ assetData }) {
  const [searchText, setSearchText] = useState('');

  const columns = [
    {
      label: 'SNo',
      field: 'SerialNumber',
      width: 60,
      sort: 'disabled',
    },
    {
      label: 'RAM',
      field: 'RAM',
      width: 100,
      sort: 'disabled',
    },
    {
      label: 'HDD',
      field: 'HDD',
      width: 100,
      sort: 'disabled',
    },
    {
      label: 'Processor',
      field: 'Processor',
      width: 100,
      sort: 'disabled',
    },
    {
      label: 'OS',
      field: 'OS',
      width: 150,
      sort: 'disabled',
    },
    {
      label: 'Lan N',
      field: 'LanNo',
      width: 150,
      sort: 'disabled',
    },
    {
      label: 'Asset Type',
      field: 'AssetType',
      width: 100,
      sort: 'disabled',
    },
    {
      label: 'Location',
      field: 'Location',
      width: 200,
      sort: 'disabled',
    },
    {
      label: 'Designation',
      field: 'Designation',
      width: 100,
      sort: 'disabled',
    },
    {
      label: 'Assign',
      field: 'empHistory',
      width: 70,
      sort: 'disabled',
    },
    {
      label: 'Action',
      field: 'action',
      sort: 'disabled',
    }
  ];

  const transformedData = useMemo(() => {
    return assetData.map(asset => ({
      ...asset,
      empHistory: asset.empHistory.length,
      action: <Link to={`/manage/${asset._id}`} className='btn btn-primary'>Manage</Link>
    }));
  }, [assetData]);

  const filteredData = useMemo(() => {
    return transformedData.filter(row =>
      Object.values(row).some(value =>
        String(value).toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [transformedData, searchText]);

  const sortedData = useMemo(() => {
    return _.orderBy(filteredData, ['SerialNumber'], ['asc']);
  }, [filteredData]);

  const dataTable = {
    columns,
    rows: sortedData,
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div className="asset-grid">
      <h3 className='heading'>Asset Data</h3>
      <input
        type="text"
        value={searchText}
        onChange={handleSearch}
        placeholder="Search"
        className='form-control search_input'
      />
      <CDBContainer>
        <CDBCard>
          <CDBCardBody>
            <CDBDataTable
              striped
              bordered
              hover
              entriesOptions={[5, 10, 20, 25]}
              entries={5}
              pagesAmount={4}
              scrollY
              maxHeight="50vh"
              data={dataTable}
              searching={false}
            />
          </CDBCardBody>
        </CDBCard>
      </CDBContainer>
    </div>
  );
}

export default AssetGrid;
