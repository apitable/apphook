import {
    AppHook,
    WhenTrigger,
  } from "../src";
  
describe("test appHook decorators", () => {
    it("should call trigger event ok", () => {
      const apphook = new AppHook();
      let triggerResult = false;
      const hookName = "test_trigger_decorator_event";
  
      class TestClass {
        @WhenTrigger(apphook, hookName)
        testTriggerFunction(hookState: any, args: any[]) {
          expect(hookState).toBe(678);
          expect(this).not.toBeNull();
          triggerResult = true;
        }
      }
  
      apphook.doTriggers(hookName, 678);
  
      // again, run double time
      triggerResult = false;
      expect(triggerResult).toBe(false);
      apphook.doTriggers(hookName, 678);
  
      expect(triggerResult.toString()).toBe("true");
  
  
      // ensure once trigger added
      const triggersCount = apphook.countAnyTrigger(hookName);
      expect(triggersCount).toBe(1);
    });
  });
  