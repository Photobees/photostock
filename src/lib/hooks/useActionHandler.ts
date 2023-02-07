import { Dispatch, SetStateAction, useState } from "react";

type IActionType = string;

type IActionHandlerCallbackParam<T> = {
  payload: object | undefined;
  localState: T | undefined;
  setLocalState: Function;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

type IActionHandlerCallback<IActionHandlerLocalState> = (
  param: IActionHandlerCallbackParam<IActionHandlerLocalState>
) => void;

export type IActionHandlerHookParam<IActionHandlerLocalState> = Record<
  IActionType,
  IActionHandlerCallback<IActionHandlerLocalState>
>;

type IActionHandlerParam = {
  type: IActionType;
  payload?: object;
};

export type IActionHandler = (param: IActionHandlerParam) => void;

const useActionHandler = <IActionHandlerLocalState>(
  actionHandlers: IActionHandlerHookParam<IActionHandlerLocalState>
) => {
  const [loading, setLoading] = useState(false);
  const [localState, setLocalState] = useState<IActionHandlerLocalState>();
  const [actionHandlersMap] = useState(actionHandlers);

  const onAction: IActionHandler = ({ type, payload }) => {
    actionHandlersMap &&
      actionHandlersMap[type] &&
      actionHandlersMap[type]({
        payload,
        localState,
        setLocalState,
        setLoading,
      });
  };

  return { loading, localState, onAction };
};

export default useActionHandler;
