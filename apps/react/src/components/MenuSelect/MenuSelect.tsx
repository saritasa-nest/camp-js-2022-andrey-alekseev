import { useState, MouseEvent, ReactNode, useEffect } from 'react';
import { Badge, Button, Menu, MenuItem } from '@mui/material';

interface Props<Option> {

  /** Select updated callback. */
  readonly selectUpdated: (selectedOptions: readonly Option[]) => void;

  /** Is multiple select. */
  readonly isMultiple: boolean;

  /** Function that checks that option in array. */
  readonly includes?: (options: readonly Option[], option: Option) => boolean;

  /** Select options. */
  readonly selectOptions: readonly Option[];

  /** Selected options. */
  readonly initSelectedOptions?: readonly Option[];

  /** Function that maps option ket to readable. */
  readonly toReadableMapper: (option: Option) => string;

  /** Button content. */
  readonly buttonContent: ReactNode;
}

const MenuSelectComponent = <Option extends unknown>({
  selectOptions,
  initSelectedOptions,
  includes,
  toReadableMapper,
  selectUpdated,
  buttonContent,
  isMultiple = false,
}: Props<Option>) => {
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
  const [selectedOptions, setSelectedOptions] = useState<readonly Option[]>(
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
  const handleMenuItemClick = (option: Option) => {
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
