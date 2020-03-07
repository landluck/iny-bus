import { InyEvents, Context, InyEventIdNames } from '../types/index';
export declare function verifyEvents(inyEvents?: InyEvents): boolean;
export declare function onLoad(ctx: Context, onLoad: string): void;
export declare function onUnload(ctx: Context, onUnload: string): void;
export declare function addEvent(events: InyEvents, ctx: Context): InyEventIdNames[];
