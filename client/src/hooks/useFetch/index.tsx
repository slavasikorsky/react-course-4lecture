import { useEffect, useState } from "react";

function useFetch(url: string) {
	const [data, setData] = useState<{ message?: string } | boolean>(false);
	const [error, setError] = useState<string>(null);

	const handler = async (body: FormData | null = null) => {
		if (body) {
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: body || null,
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
