import { IUpstreamOptions } from './interfaces';

export class Upstream {

	public server: string;
	protected index: number;
	protected weight: number;
	protected maxFails: number;
	protected failTimeout: number;
	protected currentFailsCount = 0;
	protected isAvailableState = true;

	constructor(options: IUpstreamOptions) {
		const {
			server,
			weight = 1,
			maxFails = 1,
			failTimeout = 10000,
		} = options;

		this.server = server;
		this.weight = weight;
		this.maxFails = maxFails;
		this.failTimeout = failTimeout;
	}

	setIndex(index: number) {
		this.index = index;
	}

	getIndex() {
		return this.index;
	}

	getWeight() {
		return this.weight;
	}

	getMaxFails() {
		return this.maxFails;
	}

	getFailTimeout() {
		return this.failTimeout;
	}

	fail() {
		this.currentFailsCount++;
		setTimeout(() => this.currentFailsCount--, this.failTimeout);

		if (this.currentFailsCount === this.maxFails) {
			this.isAvailableState = false;
			setTimeout(() => this.isAvailableState = true, this.failTimeout);
		}
	}

	isAvailable() {
		return this.isAvailableState;
	}

}
