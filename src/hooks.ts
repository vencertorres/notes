import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
	function readValue() {
		const item = window.localStorage.getItem(key);

		return item
			? JSON.parse(item, (key, value) => {
					if (key === 'createdAt' || key === 'updatedAt') {
						return new Date(value);
					}
					return value;
			  })
			: initialValue;
	}

	const [value, setValue] = useState<T>(readValue);

	useEffect(() => {
		window.localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue] as const;
}
