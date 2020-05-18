import { Upstream } from '../Upstream';

describe('Upstream', () => {
	let upstream: Upstream;
	const server = 'localhost:3000';
	const weight = 1;
	const maxFails = 5;
	const failTimeout = 5000;

	beforeEach(() => {
		upstream = new Upstream({
			server,
			weight,
			maxFails,
			failTimeout,
		});
	});

	it('server', () => {
		expect(upstream.server).toEqual(server);
	});

	it('getWeight', () => {
		expect(upstream.getWeight()).toEqual(weight);
	});

	it('getMaxFails', () => {
		expect(upstream.getMaxFails()).toEqual(maxFails);
	});

	it('getFailTimeout', () => {
		expect(upstream.getFailTimeout()).toEqual(failTimeout);
	});
});
