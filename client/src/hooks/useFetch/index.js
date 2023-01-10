import { useEffect, useState } from "react";

function useFetch(url) {
	const [data, setData] = useState(false);
	const [error, setError] = useState(false);

	const handler = async (body = false) => {
		if (body) {
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: body || false,
			}).then(async (res) => {
				try {
					const newData = await res.json();
					return newData;
				} catch (err) {
					setError(err);
				}
				return false;
			});
			setData(response);
		}
	};

	useEffect(() => {
		handler();
	}, []);

	return [data, error, { setFetch: handler }];
}

export default useFetch;
