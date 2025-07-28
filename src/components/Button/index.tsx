import classNames from "classnames";
import { DetailedHTMLProps, FC, ButtonHTMLAttributes } from "react";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isLoading?: boolean;
}

const Button: FC<ButtonProps> = ({ children, isLoading, ...props }) => {
  return (
    <button
      className={classNames("btn-neutral btn btn-block", {
        "btn-disabled": isLoading,
      })}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
