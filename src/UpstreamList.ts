import { IUpstreamOptions } from './interfaces';
import { Upstream } from './Upstream';

export class UpstreamList {

	protected upstreams: Upstream[] = [];

	add(options: IUpstreamOptions | Upstream) {
		let upstream;

		if (!(options instanceof Upstream)) {
			upstream = new Upstream(options);
		} else {
			upstream = options;
		}

		upstream.setIndex(this.upstreams.length);
		this.upstreams.push(upstream);
	}

	remove(server: string) {
		const index = this.upstreams.findIndex((upstream) => upstream.server === server);

		if (index >= 0) {
			this.upstreams.splice(index, 1);
			this.upstreams.forEach((upstream, index) => {
				upstream.setIndex(index);
			});
		}
	}

	find(server: string) {
		const index = this.upstreams.findIndex((upstream) => upstream.server === server);

		if (index < 0) {
			return null;
		}

		return this.upstreams[index];
	}

	changeWeight(upstream: Upstream, weight: number) {
		this.upstreams[upstream.getIndex()].setWeight(weight);
	}

	setList(list: IUpstreamOptions[]) {
		this.upstreams = [];

		list.forEach((item) => this.add(item));
	}

	get() {
		let n = 0;
		const rnd = Math.floor(Math.random() * this.getTotalWeight()) + 1;

		return this.getAvailableUpstreams()
			.find((item) => {
				n += item.getWeight();

				return n >= rnd;
			});
	}

	getCount() {
		return this.upstreams.length;
	}

	protected getAvailableUpstreams() {
		return this.upstreams.filter((item) => item.isAvailable());
	}

	protected getTotalWeight() {
		return this.getAvailableUpstreams()
			.map((item) => item.getWeight())
			.reduce((a, b) => a + b, 0);
	}

}
