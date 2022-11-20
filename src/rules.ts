
export interface IRule {
    condition: ICondition;
    args: any[];
}

export type ICondition = IConditionFunction | IConditionClass;

export type IConditionFunction = () => boolean;

export interface IConditionClass {
    doCheck(): boolean;
}
