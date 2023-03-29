import { FC } from 'react';
import { theme } from 'twin.macro';

import { ColorButton } from './buttons';

type ColorPickerProps = {
  colors: string[];
  defaultValue: string;
  onChange?: (color: string) => void;
};

const ColorPicker: FC<ColorPickerProps> = ({
  colors,
  defaultValue,
  onChange,
}) => {
  return (
    <div tw="flex">
      {colors.map((color) => (
        <div key={color} tw="mr-5 inline-flex">
          <ColorButton
            color={theme`colors`[color]}
            selected={color === defaultValue}
            onClick={() => onChange && onChange(color)}
          />
        </div>
      ))}
    </div>
  );
};

export default ColorPicker;
