export interface IUpstreamOptions {
	server: string;
	weight?: number;
	maxFails?: number;
	failTimeout?: number;
}
