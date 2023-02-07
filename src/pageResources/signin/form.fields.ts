import Input from "antd/lib/input";
import _memoize from "lodash/memoize";

import { IFormFields, IFormField } from "@/interfaces/form";

import { FORM_FIELDS } from "./constants";

const EMAIL_FIELD: IFormField = {
  id: FORM_FIELDS.EMAIL,
  renderer: Input,
  renderProps: {
    placeholder: "Email Id",
  },
  rules: {
    required: { value: true, message: "Email Id is required" },
    pattern: {
      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      message: "Enter a valid Email Id",
    },
  },
};

const USERNAME_FIELD = {
  id: FORM_FIELDS.USERNAME,
  renderer: Input,
  renderProps: {
    placeholder: "User Name",
  },
  rules: {
    required: true,
  },
};

const getPasswordField = (isSignIn: boolean) => ({
  id: FORM_FIELDS.PASSWORD,
  renderer: Input.Password,
  renderProps: {
    visibilityToggle: isSignIn,
    placeholder: "Password",
  },
});

const CONFIRM_PASSWORD_FIELD = {
  id: FORM_FIELDS.CONFIRM_PASSWORD,
  renderer: Input.Password,
  renderProps: {
    placeholder: "Confirm Password",
  },
};

const getFormFields = _memoize(
  ({ isSignIn = false }): IFormFields => ({
    [FORM_FIELDS.EMAIL]: EMAIL_FIELD,
    [FORM_FIELDS.USERNAME]: USERNAME_FIELD,
    [FORM_FIELDS.PASSWORD]: getPasswordField(isSignIn),
    [FORM_FIELDS.CONFIRM_PASSWORD]: CONFIRM_PASSWORD_FIELD,
  })
);

export default getFormFields;
