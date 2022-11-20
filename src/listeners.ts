import { IRule } from './rules';
import { ITriggerAction, IFilterAction, IAsyncFilterAction } from './actions';

/**
 * Listener interface
 *
 * @export
 * @interface IListener
 */
export interface IListener {
    type: ListenerType;
    priority: number;
    /**
     * hook name
     */
    hook: string;
    rule?: IRule;
    isCatch?: boolean;
}

export interface ITrigger extends IListener {
    action: ITriggerAction;
}

export interface IFilter extends IListener {
    action: IFilterAction;
}
export interface IAsyncFilter<T> extends IListener {
    action: IAsyncFilterAction<T>;
}

export enum ListenerType {
    Trigger = 'Trigger',
    Filter = 'Filter',
    AsyncFilter = 'AsyncFilter',
}
