import { FC } from "react";
import { FigureThickness } from "../../entities/figure";
import { IconButton } from "./components";

export enum ActionType {
  Button,
  Dropdown,
}

export type Option = {
  value: string | number;
  label: string;
};

export type Action = {
  name: string;
  type: ActionType;
  icon?: Icon;
  options?: Option[];
  onClick?: VoidFunction;
  onSelect?: (value: string | number) => void;
};

interface Props {
  actions: Action[];
}

export const ActionPanel: FC<Props> = ({ actions }) => {
  return (
    <>
      {actions.map(({ icon, name, type, options, onClick, onSelect }) =>
        type === ActionType.Button && icon ? (
          <IconButton
            key={name}
            icon={icon}
            alt={name}
            onClick={() => onClick?.()}
          />
        ) : (
          <select
            key={name}
            onChange={(e) =>
              onSelect?.(e.target.value as unknown as FigureThickness)
            }
          >
            {options?.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        )
      )}
    </>
  );
};
