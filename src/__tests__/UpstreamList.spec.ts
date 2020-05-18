import { UpstreamList } from '../UpstreamList';

describe('UpstreamList', () => {
	let upstreams: UpstreamList;
	const server = 'localhost:3000';
	const weight = 1;
	const maxFails = 5;
	const failTimeout = 5000;

	beforeEach(() => {
		upstreams = new UpstreamList();
		upstreams.setList([
			{ server, weight, maxFails, failTimeout },
			{ server, weight, maxFails, failTimeout },
			{ server, weight, maxFails, failTimeout },
			{ server, weight, maxFails, failTimeout },
		]);
	});

	it('get - uniform distribution', () => {
		const useMap: { [key: number]: number } = {};

		for (let i = 0; i < 1000; i++) {
			const upstream = upstreams.get();
			const index = upstream.getIndex();

			useMap[index] = useMap[index] !== undefined ? useMap[index] + 1 : 1;
		}

		for (let i = 0; i < upstreams.getCount(); i++) {
			for (let j = i + 1; j < upstreams.getCount(); j++) {
				expect(Math.abs(useMap[i] - useMap[j])).toBeLessThan(50);
			}
		}
	});

	it('get - fails', () => {
		const useMap: { [key: number]: number } = {};

		for (let i = 0; i < 1000; i++) {
			const upstream = upstreams.get();
			const index = upstream.getIndex();

			if (index === 0 || index === 2) {
				upstream.fail();
			}

			useMap[index] = useMap[index] !== undefined ? useMap[index] + 1 : 1;
		}

		expect(useMap[0]).toBeLessThan(10);
		expect(useMap[2]).toBeLessThan(10);

		expect(useMap[1]).toBeGreaterThan(450);
		expect(useMap[3]).toBeGreaterThan(450);
	});

	it('weight', () => {
		upstreams.setList([
			{ server, weight, maxFails, failTimeout },
			{ server, weight: 10, maxFails, failTimeout },
			{ server, weight, maxFails, failTimeout },
			{ server, weight: 10, maxFails, failTimeout },
		]);

		const useMap: { [key: number]: number } = {};

		for (let i = 0; i < 1000; i++) {
			const upstream = upstreams.get();
			const index = upstream.getIndex();

			useMap[index] = useMap[index] !== undefined ? useMap[index] + 1 : 1;
		}

		expect(useMap[1]).toBeGreaterThan(400);
		expect(useMap[3]).toBeGreaterThan(400);
	});
});
