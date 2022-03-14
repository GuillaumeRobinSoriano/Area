import { Services } from "src/Entity/services.entity";

export async function checkTrigger(service: Services, APIResponse: number): Promise<boolean> {
  switch (service.trigger) {
    case '>':
      if (Number(service.triggerparams) < APIResponse) {
        return true;
      }
      return false
    case '<':
      if (Number(service.triggerparams) > APIResponse)
        return true;
    return false
    case '=':
      if (Number(service.triggerparams) === APIResponse)
        return true;
    return false
    case '!=':
      if (Number(service.triggerparams) !== APIResponse)
        return true;
    return false
    case '>=':
      if (Number(service.triggerparams) <= APIResponse)
        return true;
    return false
    case '<=':
      if (Number(service.triggerparams) >= APIResponse)
        return true;
    return false
    default:
      console.log(service.trigger);
      return false
  }
}