import React, { useState, useEffect } from 'react';
import AssetGrid from './AssetGrid';
import { get, post } from './Fetch1';

const AssetData = () => {

    const [assetData, setAssetData] = useState([]);
    const [error, setError] = useState('');
    const [token, setTokens] = useState('');

    const fetchAssetData = async (token) => {
        try {
            const response = await get('getAssets', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token,
                },
            });
            setAssetData(response);
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to fetch asset data.');
        }
    };

    useEffect(() => {

        const token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            setTokens(token);
        }
        fetchAssetData(token); // Fetch initial asset data

    }, []);

    return (
        <div className="dashboard-container">
            <div className='container'>
                <AssetGrid assetData={assetData} />
            </div>
        </div>
    );
};

export default AssetData;
