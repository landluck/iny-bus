import { BusEvents, Context, InyEventIdNames } from '../types/index';
export declare function verifyEvents(busEvents?: BusEvents): boolean;
export declare function onLoad(ctx: Context, onLoad: string): void;
export declare function onUnload(ctx: Context, onUnload: string): void;
export declare function addEvent(events: BusEvents, ctx: Context): InyEventIdNames[];
