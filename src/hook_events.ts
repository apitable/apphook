/*
 * appHook inside events set
 *
 * @Author: Kelly Peilin Chan (kelly@apitable.com)
 * @Date: 2020-03-11 19:38:00
 * @Last Modified by: Kelly Peilin Chan (kelly@apitable.com)
 * @Last Modified time: 2020-03-19 14:22:02
 */
import { AsyncFilterCommand, FilterCommand, TriggerCommand } from './commands';
import { IRule } from './rules';

export type AddTriggerEvent = (hook: string,
    command: TriggerCommand,
    commandArg: any,
    rule: IRule | undefined,
    priority: number,
    isCatch: boolean) => void;

export type AddFilterEvent<T> = (hook: string,
    command: FilterCommand<T> | AsyncFilterCommand<T>,
    commandArg: any,
    rule: IRule | undefined,
    priority: number,
    isCatch: boolean) => void;

export type DoTriggerEvent = (hook: string, hookState?: any) => void;

/**
 * the event that will be triggered when use applyFilters
 */
export type WhenApplyFiltersEvent = (hook: string, defaultValue: any, hookState?: any) => void;
