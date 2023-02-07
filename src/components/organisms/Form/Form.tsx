import React, { memo } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import cx from "classnames";

import _map from "lodash/map";
import _isEmpty from "lodash/isEmpty";
import _get from "lodash/get";

import { inter } from "@/lib/fonts";
import { IFormSection, IFormFields } from "@/interfaces/form";

import FORM_ACTIONS from "./form.actionTypes";

import styles from "./form.module.css";

type IFormProps = {
  fields: IFormFields;
  sections: IFormSection;
  onAction: Function;
};

const Form: React.FC<IFormProps> = ({ onAction, sections, fields }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormFields>();

  const onFormSubmit: SubmitHandler<IFormFields> = (data) => {
    onAction && onAction({ type: FORM_ACTIONS.SUBMIT, payload: data });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      {_map(sections, (section, rowIndex) => {
        const { rowClassName, rowItems } = section;

        if (_isEmpty(rowItems)) return;

        return (
          <div
            key={`row-${rowIndex}`}
            className={cx("m-b-1", styles.formRow, rowClassName)}
          >
            {_map(rowItems, (rowItem, itemIndex) => {
              const fieldConfig = fields?.[rowItem];

              if (!fieldConfig) return;

              const {
                renderer: Renderer,
                id,
                renderProps,
                ...rest
              } = fieldConfig;

              const fieldError = errors[id];

              return (
                <div
                  key={`row-${rowIndex}-item-${itemIndex}-div`}
                  style={{ width: "100%" }}
                >
                  <Controller
                    name={id}
                    key={`row-${rowIndex}-item-${itemIndex}`}
                    control={control}
                    render={({ field }) => (
                      <Renderer
                        {...field}
                        {...renderProps}
                        status={fieldError ? "error" : ""}
                      />
                    )}
                    {...rest}
                  ></Controller>
                  {fieldError && (
                    <div
                      className={cx(inter.className, styles.errorMessage)}
                      role="alert"
                      key={`row-${rowIndex}-item-${itemIndex}-error`}
                    >
                      {fieldError.message || "Required Field"}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
      <input type="submit" value="Submit" />
    </form>
  );
};

export default memo(Form);
