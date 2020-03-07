import { Context, InyApp } from '../types/index';
declare function inyApp<T extends Context>(ctx: T): InyApp<T>;
export default inyApp;
