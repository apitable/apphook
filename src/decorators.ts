import { AppHook } from "./apphook";
import { TriggerCommand } from "./commands";
import { IRule } from "./rules";

/**
 * Decorator for apphook.addTrigger
 * 
 * @param apphook 
 * @param hook 
 * @param args 
 * @param rule 
 * @param priority 
 * @param isCatch 
 * @returns 
 */
export function WhenTrigger(apphook: AppHook, hook: string, args: any[] = [], rule: IRule | undefined = undefined, priority?: number, isCatch?: boolean ): MethodDecorator {
    return (target: any, propertyKey: string | symbol, _descriptor: PropertyDescriptor) => {
        const actionCommand = target[propertyKey] as TriggerCommand;
        apphook.addTrigger(
            hook,
            actionCommand,
            args,
            rule,
            priority,
            isCatch
          );
    }
}
