import React, { useCallback, useState } from "react";
import { Button } from "antd";
import cx from "classnames";

import { unbounded, outfit } from "@/lib/fonts";
import useActionHandler from "@/lib/hooks/useActionHandler";
import Form from "@/components/organisms/Form/Form";

import getFormFields from "@/pageResources/signin/form.fields";
import getFormSections from "@/pageResources/signin/form.sections";
import signInActionHandlers, {
  ILocalState,
} from "@/pageResources/signin/actionHandlers";

import styles from "./signin.module.css";

const LoginPage: React.FC = () => {
  const [isSignIn, setSignIn] = useState(true);
  const { localState, onAction } =
    useActionHandler<ILocalState>(signInActionHandlers);

  const toggleIsSignIn = useCallback(() => {
    setSignIn((prev) => !prev);
  }, [setSignIn]);

  return (
    <div className={styles.authForm}>
      {isSignIn && <h1 className={unbounded.className}>Sign In</h1>}
      {isSignIn && (
        <div className="m-b-1">
          <h4 className={cx("d-inline", outfit.className)}>
            {"Don't have an account ?"}
          </h4>
          <Button
            className={outfit.className}
            type="link"
            onClick={toggleIsSignIn}
          >
            Sign Up
          </Button>
        </div>
      )}

      {!isSignIn && <h1 className={unbounded.className}>Sign Up</h1>}
      {!isSignIn && (
        <div className="m-b-1">
          <h4 className={cx("d-inline", outfit.className)}>
            Already have an account ?
          </h4>
          <Button
            className={outfit.className}
            type="link"
            onClick={toggleIsSignIn}
          >
            Sign In
          </Button>
        </div>
      )}
      <div className={styles.formDiv}>
        <Form
          fields={getFormFields({ isSignIn })}
          sections={getFormSections({ isSignIn })}
          onAction={onAction}
        />
      </div>
    </div>
  );
};

export default LoginPage;
