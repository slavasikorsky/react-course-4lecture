import { useEffect, useState } from "react";

function useUseInfo(id) {
	const [userData, setUserData] = useState(false);

	useEffect(() => {
		if (id) {
			fetch(`http://localhost:5010/user/${id}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((res) => res.json())
				.then((result) => {
					setUserData(result);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [id]);

	return { userData };
}

export default useUseInfo;
