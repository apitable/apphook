
![apphook](https://socialify.git.ci/apitable/apphook/image?description=1&font=Inter&language=1&name=1&pattern=Diagonal%20Stripes&stargazers=1&theme=Dark)
# apphook: Event-Manager Hook Engine 

[![npm](https://img.shields.io/npm/v/apphook)](https://www.npmjs.com/package/apphook)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/apitable/apphook/npm-publish)](https://github.com/apitable/apphook/actions)
[![npm bundle size](https://img.shields.io/bundlephobia/min/apphook)](https://www.npmjs.com/package/apphook)
[![npm](https://img.shields.io/npm/dm/apphook)](https://www.npmjs.com/package/apphook)

`apphook` is a way to implant/modify other piece of code.

It is a lightweight Event-Manager that is inspired by [Wordpress Hooks](https://developer.wordpress.org/plugins/hooks/)

Computer software is a sort of sequence. We build software according to the business.

However, the user's behaviors are out-of-sequence and chaos.

You will never know what users want, how they use your software, what they want to customization.

So, we need to prepare a system to deal with out-of-sequence and chaos, which can make big changes and flexible customization available.

That's why we should know `AppHook`.

`AppHook` is a hooks engine which Event-Driven. It can intercept users' behaviors and extend our functionalities.

## Quick Start

```bash
npm i --save apphook
```


TypeScript types declarations (.d.ts) are ready.

See [examples](#example) for usage examples.

## Principle

We place AppHook hooks in code and trigger events.

For example, when a user clicks the button A, we can trigger an event called "click:button:A"

We have two ways to trigger an event:

1. Trigger. When an event appears, do some actions or behaviors, it would not change the code pipeline path.
2. Filter. When an event appears, it will do some actions and behaviors, and it will return a object. It can be an interceptor.


## Use Case

- Event Tracking：Don't need to hard code in the code anymore, we can put all the event tracking code in the file by binding and unbinding.
- Rookie Onboarding: New register user onboarding
- Help Guiding: on the 10th click on a button, popup a UI window.
- Users Tasks: check whether the user has finished some tasks.
- Marketing Events: If some condition is matched, do something like popup a marketing ui window.
- Users Recall: If the user has not logged in for 30 days, do something.
- Payment Interception: When a feature button is clicked, and users have no payment yet, trigger and open a UI window until the payment is finished and go on.
- Third Party: customize 3rd party plugins or add more features
- ......

## Terms

- hook：
    - hookState：
    - hookArgs：
- binding：
    - add_trigger：
    - remove_trigger：
    - add_filter：
    - remove_filter：
- trigger
    - triggerCommand:
    - triggerCommandArg ：any
- filter：
    - filterCommand:
    - filterCommandArg:
- rule 
    - condition
    - conditionArgs
- action:
    - trigger action: 
        - trigger command: 
        - arg: 
    - filter action: 
        - filter command: 
        - filter command arg: 
- listener ：
    - trigger Listner：
    - filter Listner：




## Example

### Use Trigger to Event Tracking

```typescript
// Window.tsx
// ...
onClickLoginButton: () => {
    // ...
    apphook.doTrigger('user:click_login_button');

}
// ...
```

```typescript
//  EventTracking.ts, a independent file for event tracking 
apphook.addTrigger('user:click_login_button', (args) => {

    // Event Tracking Code
    EventTracking.track('user:click_login_button', {...});

    tracker.track('user:click_login_button', {...});
    tracker.setProfile({email:'xxx@xxx.com'});
});
```


### Use Filter, make contact number nickname customizable

```typescript
apphook.addFilter('get_form_name', (defaultValue, args) => {
    let user = args[0];
    if (user.is_cloud) {
        return "Member ID";
    } else if (user.is_self_hosted) {
        return "Employee ID";
    }
    return defaultValue;
});
```

```typescript
// UI.tsx
<Form name="{apphook.applyFilters('get_form_name', 'ID')}" />  
// Here will get the result "Member ID" or "Employee ID" or "ID"
```

## Rookie popup guiding

If you want: 
> When a female user gets views a product for the 10th time, pop up "congratulations, you have viewed the product 10 times"

Break it down:

- trigger: user views the product 10th times
    - hook: view product(application:start)
    - hookState: 10th time
    - rule: female
        - condition: gender == female
    - action: 
        - command: popup
        - command: "congratulations, you have viewed the product 10 times"
        

Relevant code:
```typescript
// trigger event
apphook.doTrigger('application:start', [],  10) // 10 is the number of times viewed

// add trigger
apphook.addTrigger('application:start', (args, hookState) => {
    if (hookState == 10) {
        showWindow('congratulations, you have viewed the product 10 times');
    }
}, {
    doCheck: (args) => {
            return user.gender === 'female';
}});
```

    
