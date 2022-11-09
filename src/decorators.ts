import { AppHook } from "./apphook";
import { TriggerCommand } from "./commands";

export function AddTrigger(apphook: AppHook, hook: string): MethodDecorator {

    return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {

    }
}
