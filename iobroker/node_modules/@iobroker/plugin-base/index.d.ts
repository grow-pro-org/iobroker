/// <reference path="./lib/types.d.ts" />
declare module "@iobroker/plugin-base" {
	export const PluginBase: typeof import("./lib/PluginBase");
	export const PluginHandler: typeof import("./lib/PluginHandler");
	export * from "@iobroker/plugin-base/types";
}