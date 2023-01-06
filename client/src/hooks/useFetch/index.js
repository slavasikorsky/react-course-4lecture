import { useEffect, useState } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(false);
    const [error, setError] = useState(false);

    const handler = async (body = false) => {
        if (body) {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body,
            }).then(async (response) => { 
                try {
                    const data = await response.json();
                    return data;
                } catch (err) {
                    setError(err);
                } 
            });
            setData(response);
        }
    }

    useEffect(()=>{
        handler();
    }, [])
  
    return [ data, error, { setFetch: handler}];
  };

export default useFetch;