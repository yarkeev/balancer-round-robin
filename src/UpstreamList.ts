import { IUpstreamOptions } from './interfaces';
import { Upstream } from './Upstream';

export class UpstreamList {

	protected upstreams: Upstream[] = [];

	add(options: IUpstreamOptions) {
		const upstream = new Upstream(options);

		upstream.setIndex(this.upstreams.length);
		this.upstreams.push(upstream);
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
