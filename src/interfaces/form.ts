import React, { ReactNode } from "react";
import {
  FieldPath,
  Message,
  Path,
  RegisterOptions,
  ValidationRule,
} from "react-hook-form";

type IFormRow = {
  rowItems: string[];
  rowClassName?: string;
};

export type IFormSection = IFormRow[];

interface IFormFieldRenderProps {
  placeholder?: string;
}

type IFormFieldValidationRules = {
  required: Message | ValidationRule<boolean>;
  min: ValidationRule<number | string>;
  max: ValidationRule<number | string>;
  maxLength: ValidationRule<number>;
  minLength: ValidationRule<number>;
  pattern: ValidationRule<RegExp>;
};

export type IFormField = {
  id: string;
  renderer: Function;
  rules?: Partial<IFormFieldValidationRules>;
  renderProps?: IFormFieldRenderProps;
};

export type IFormFields = Record<string, IFormField>;
