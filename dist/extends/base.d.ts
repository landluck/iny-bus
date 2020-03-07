import { busEvents, Context, InyEventIdNames } from '../types/index';
export declare function verifyEvents(busEvents?: busEvents): boolean;
export declare function onLoad(ctx: Context, onLoad: string): void;
export declare function onUnload(ctx: Context, onUnload: string): void;
export declare function addEvent(events: busEvents, ctx: Context): InyEventIdNames[];
