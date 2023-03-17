import { FC } from "react";
import classes from "./icon-button.module.css";

interface Props {
  icon: string;
  alt?: string;
  onClick: VoidFunction;
}

export const IconButton: FC<Props> = ({
  icon,
  alt = "Icon button",
  onClick,
}) => {
  return (
    <button className={classes.button} title={alt} onClick={onClick}>
      <img src={icon} className={classes.icon} alt={alt} />
    </button>
  );
};
