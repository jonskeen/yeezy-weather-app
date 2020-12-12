export const fetchRainfall = () => {
	const url = "http://private-4945e-weather34.apiary-proxy.com/weather34/rain";

	return fetch(url)
		.then(async response => {
			if (!response.ok) {
				throw new Error("Unable to fetch rainfall amounts, please try again later.");
			}

			const data = await response.json();
			const { days } = data[0];

			return days || [];
		})
};