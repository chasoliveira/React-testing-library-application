import { Dropdown } from './Dropdown';

import { screen, render, userEvent } from '../../tests';

describe('Dropdown', () => {
  const title = "Select a number";
  const numbers = ["One", "Two", "Three"];

  const getScreenOptions = (getFromScreen) => numbers.map(number => getFromScreen('menuitem', { name: number }));
  const expectNumberInTheDocument = () => {
    const [option0, option1, option2] = getScreenOptions(screen.getByRole);

    expect(screen.queryByRole('menu')).toBeInTheDocument();
    expect(option0).toBeInTheDocument();
    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();

    return [option0, option1, option2];
  };

  const expectNumberNotInTheDocument = () => {
    const [option0, option1, option2] = getScreenOptions(screen.queryByRole);

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(option0).not.toBeInTheDocument();
    expect(option1).not.toBeInTheDocument();
    expect(option2).not.toBeInTheDocument();
  };

  it('should start closed', () => {
    //arrange

    //act
    render(<Dropdown title={title} options={numbers} onSelect={jest.fn()} />);

    //assert
    expectNumberNotInTheDocument()
  });

  it('should show options when open', () => {
    render(<Dropdown title={title} options={numbers} onSelect={jest.fn()} />);

    expectNumberNotInTheDocument();

    userEvent.click(screen.getByRole('button', { name: title }));

    expectNumberInTheDocument();
  });

  it('should signal an option was selected and close the dropdown', () => {
    const onSelect = jest.fn();
    render(<Dropdown title={title} options={numbers} onSelect={onSelect} />);

    userEvent.click(screen.getByRole('button', { name: title }));

    const [option0] = expectNumberInTheDocument();

    userEvent.click(option0);

    expect(onSelect).toHaveBeenCalledWith(option0.textContent);

    expectNumberNotInTheDocument();
  });
});