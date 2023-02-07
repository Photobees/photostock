import FORM_ACTIONS from "@/components/organisms/Form/form.actionTypes";
import { IActionHandlerHookParam } from "@/lib/hooks/useActionHandler";

export type ILocalState = {
  text: string;
};

const signInActionHandlers: IActionHandlerHookParam<ILocalState> = {
  [FORM_ACTIONS.SUBMIT]: ({
    payload,
    localState,
    setLocalState,
    setLoading,
  }) => {
    console.log(payload);

    setLocalState({ text: "hello" });
  },
};

export default signInActionHandlers;
