export interface IUpstreamOptions<T = {}> {
	server: string;
	weight?: number;
	maxFails?: number;
	failTimeout?: number;
	extra?: T;
}
