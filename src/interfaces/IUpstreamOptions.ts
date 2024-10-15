export interface IUpstreamOptions<T = unknown> {
	server: string;
	weight?: number;
	maxFails?: number;
	failTimeout?: number;
	extra?: T;
}
