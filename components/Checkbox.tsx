import React, { useState } from 'react';
import { styled } from 'twin.macro';

export const Checkbox = ({
  label,
  onSelectType,
}: {
  label: string;
  onSelectType: (option: string, selected: boolean) => void;
}) => {
  const [checked, setChecked] = useState(false);
  return (
    <div
      tw="relative"
      onClick={() => {
        onSelectType(label, !checked);
        setChecked(!checked);
      }}
    >
      <Input checked={checked} type="checkbox" />
      <Label checked={checked} htmlFor="checkbox" tw="text-xs relative">
        {label}
      </Label>
    </div>
  );
};

const Input = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
`;

const Label = styled.label<{ checked: boolean }>`
  padding-left: 18px;
  position: relative;
  color: black;
  border: 0;
  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 2px;
    width: 1em;
    height: 1em;
    border: 1px solid black;
    ${({ checked }) =>
      checked &&
      `background: black;
       box-shadow: inset 0 0 0 2px white;`}
  }
`;
