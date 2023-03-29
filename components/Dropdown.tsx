import { FC, useMemo, useRef, useEffect } from 'react';
import Select from 'react-select';
import tw, { theme } from 'twin.macro';

type DropdownOption =
  | {
      value: string | number;
      label: string | number;
      isDisabled?: boolean;
    }
  | string
  | number;

type DropdownProps = {
  options: DropdownOption[];
  selectedOption?: DropdownOption;
  variant?: 'HEADER' | 'NORMAL';
  placeHolder?: string;
  onChange?: (option: DropdownOption) => void;
};

const Dropdown: FC<DropdownProps> = ({
  onChange,
  options,
  placeHolder,
  selectedOption,
  variant = 'NORMAL',
}) => {
  const inputRef = useRef<any>();
  useEffect(() => {
    if (inputRef) {
      inputRef?.current?.inputRef?.setAttribute('readonly', true);
    }
  }, []);
  const normalizedSelectedOption = useMemo<DropdownOption>(() => {
    if (
      typeof selectedOption === 'string' ||
      typeof selectedOption === 'number'
    ) {
      return {
        label: selectedOption,
        value: selectedOption,
      };
    }
    return selectedOption;
  }, [selectedOption]);

  const normalizedOption = useMemo(() => {
    return options.map<DropdownOption>((option) => {
      if (typeof option === 'string' || typeof option === 'number') {
        return {
          label: option,
          value: option,
        };
      }
      return option;
    });
  }, [options]);

  return (
    <Select
      ref={inputRef}
      components={{
        DropdownIndicator: ({ isFocused }) => (
          <div
            css={[
              variant === 'NORMAL' && tw`px-4`,
              !options.length && tw`hidden`,
            ]}
            tw="py-4"
          >
            <img
              alt="Dropdown"
              css={[isFocused ? tw`rotate-180` : tw`rotate-0`]}
              src={
                variant === 'NORMAL'
                  ? '/assets/images/dropdown.svg'
                  : '/assets/images/down_arrow.svg'
              }
            />
          </div>
        ),
        IndicatorSeparator: () => null,
      }}
      instanceId="dropdown"
      options={normalizedOption}
      placeholder={placeHolder}
      styles={{
        control: (provided) => ({
          ...provided,
          '& > div': {
            paddingRight: 6,
          },
          '&:hover': {
            cursor: 'pointer',
            textDecoration: variant === 'HEADER' && 'underline',
            textUnderlineOffset: '0.3rem',
          },
          border:
            variant === 'NORMAL' ? `1px solid ${theme`colors.black`}` : 'none',
          borderRadius: '0',
          boxShadow: 'none',
          minHeight: theme`spacing.11`,
        }),
        input: (provided) => ({
          ...provided,
          margin: 0,
          padding: 0,
        }),
        menu: (provided) => ({
          ...provided,
          borderRadius: 0,
          marginTop: variant === 'HEADER' && -5,
          minWidth: 230,
        }),
        menuList: (provided) =>
          variant === 'NORMAL'
            ? { ...provided }
            : {
                ...provided,
                maxHeight: 600,
                overflowX: 'hidden',
              },
        option: (provided, state) => ({
          ...provided,
          backgroundColor: 'white',
          color: 'black',
          fontWeight: state.isSelected || state.isFocused ? 'bold' : 'normal',
          whiteSpace: 'nowrap',
        }),
        placeholder: (provided) => ({
          ...provided,
          color: '#404040',
          fontSize: 14,
          fontWeight: 'normal',
        }),
        singleValue: (provided) => ({
          ...provided,
          marign: 0,
          padding: 0,
        }),
        valueContainer: (provided) => ({
          ...provided,
          margin: 0,
          padding: `0 ${theme`spacing.4`}`,
        }),
      }}
      value={normalizedSelectedOption}
      onChange={(value) => {
        if (typeof value === 'string' || typeof value === 'number') {
          onChange(value);
        } else {
          onChange(value.value);
        }
      }}
    />
  );
};

export default Dropdown;
