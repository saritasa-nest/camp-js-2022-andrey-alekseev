import { useState, MouseEvent, ReactNode, useEffect } from 'react';
import { Badge, Button, Menu, MenuItem } from '@mui/material';

interface Props<TOption> {

  /** Select updated callback. */
  readonly selectUpdated: (selectedOptions: readonly TOption[]) => void;

  /** Is multiple select. */
  readonly isMultiple: boolean;

  /** Function that checks that option in array. */
  readonly includes?: (options: readonly TOption[], option: TOption) => boolean;

  /** Select options. */
  readonly selectOptions: readonly TOption[];

  /** Selected options. */
  readonly initSelectedOptions?: readonly TOption[];

  /** Function that maps option ket to readable. */
  readonly toReadableMapper: (option: TOption) => string;

  /** Button content. */
  readonly buttonContent: ReactNode;
}

const MenuSelectComponent = <TOption extends unknown>({
  selectOptions,
  initSelectedOptions,
  includes,
  toReadableMapper,
  selectUpdated,
  buttonContent,
  isMultiple = false,
}: Props<TOption>) => {
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
  const [selectedOptions, setSelectedOptions] = useState<readonly TOption[]>(
    initSelectedOptions !== undefined ? initSelectedOptions : [],
  );
  const open = Boolean(anchorElement);

  useEffect(() => {
    selectUpdated(selectedOptions);
  }, [selectedOptions]);

  /**
   * Set button as anchor for menu.
   * @param event Click event.
   */
  const handleClickOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };

  /**
   * Toggle selection clicked item.
   * @param option Clicked option.
   */
  const handleMenuItemClick = (option: TOption) => {
    setSelectedOptions(options => {
      if (options.includes(option)) {
        return options.filter(item => item !== option);
      }
      const currentOptions = [...options];
      if (!isMultiple) {
        currentOptions.pop();
      }
      currentOptions.push(option);
      return currentOptions;
    });

    // Don't close menu if multiselect
    if (!isMultiple) {
      setAnchorElement(null);
    }
  };

  /** Unset anchor element. */
  const handleClose = () => {
    setAnchorElement(null);
  };

  return (
    <div>
      <Badge color="secondary" variant="dot" invisible={selectedOptions.length === 0}>
        <Button onClick={handleClickOpen}>{buttonContent}</Button>
      </Badge>
      <Menu anchorEl={anchorElement} open={open} onClose={handleClose}>
        {selectOptions.map((option, index) => (
          <MenuItem
            key={index}
            selected={includes === undefined ? selectedOptions.includes(option) : includes(selectedOptions, option)}
            onClick={_ => handleMenuItemClick(option)}
          >
            {toReadableMapper(option)}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export const MenuSelect = MenuSelectComponent;
