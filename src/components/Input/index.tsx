import classNames from "classnames";
import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  error?: string;
}

const Input: FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <input
        className={classNames("input  w-full", { "input-error": !!error })}
        {...props}
      />

      {error && <div className="mt-1 text-[12px] text-red-500">{error}</div>}
    </div>
  );
};

export default Input;
