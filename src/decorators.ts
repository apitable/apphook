import { AppHook } from "./apphook";
import { TriggerCommand } from "./commands";
import { IRule } from "./rules";

export function AddTrigger(apphook: AppHook, hook: string, args: any[] = [], rule: IRule | undefined = undefined, priority?: number, isCatch?: boolean ): MethodDecorator {

    return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {

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
