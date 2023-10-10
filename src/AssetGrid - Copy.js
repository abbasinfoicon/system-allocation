import React from 'react';
import { Link } from 'react-router-dom';
import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact';

function AssetGrid({ assetData }) {
  console.log("assigndata: ", assetData)

  const dataTable = () => {
    const trw = assetData.map(asset => ({
      ...asset,
      empHistory: asset.empHistory.length,
      action: <Link to={`/manage/${asset._id}`} className='btn btn-primary'>Manage</Link>
    }));

    return {
      columns: [
        {
          label: 'SNo',
          field: 'SerialNumber',
          width: 60,
          sort: 'asc',
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
      ],
      rows: trw,
    };
  };

  return (
    <div className="asset-grid">
      <h3 className='heading'>Asset Data</h3>

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
              data={dataTable()}
              materialSearch
            />
          </CDBCardBody>
        </CDBCard>
      </CDBContainer>
    </div>
  );
}

export default AssetGrid;
