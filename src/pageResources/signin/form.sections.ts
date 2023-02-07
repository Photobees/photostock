import _memoize from "lodash/memoize";

import { IFormSection } from "@/interfaces/form";

import { FORM_FIELDS } from "./constants";

type ISignInFormSectionProps = {
  isSignIn: boolean;
};

const getFormSections = _memoize(
  ({ isSignIn }: ISignInFormSectionProps): IFormSection => [
    { rowItems: [FORM_FIELDS.USERNAME], rowClassName: "m-b-1" },
    { rowItems: [FORM_FIELDS.EMAIL] },
    {
      rowItems: [
        FORM_FIELDS.PASSWORD,
        ...(!isSignIn ? [FORM_FIELDS.CONFIRM_PASSWORD] : []),
      ],
    },
  ]
);

export default getFormSections;
