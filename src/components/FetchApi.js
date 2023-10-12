import React from 'react'

const FetchApi = (url) => {
    return fetch(`http://localhost:3034/${url}`);
}

export default FetchApi