import React from 'react';
import {
  render, screen, waitFor, fireEvent,
} from '@testing-library/react';
import axios from 'axios';
import App from './App';

jest.mock('axios');
const mockAxios = axios;

const data = {
  items: [{
    id: 1001,
    name: 'Kale Caesar Pasta, Turmeric Satay Broccoli & Lemon Cashew Greens',
    dietaries: ['v', 've', 'df', 'gf', 'n!'],
  },
  {
    id: 1002,
    name: 'Hake & Smoky Chickpeas, Brown Rice & Quinoa, Roasted Roots',
    dietaries: ['gf', 'df', 'rsf'],
  },
  {
    id: 1003,
    name: 'Dill & Swiss Chard Potato Cakes, Summer Tabbouleh & Roasted Roots',
    dietaries: ['gf', 'df', 'v', 've', 'n!'],
  }],
};

mockAxios.get.mockResolvedValue({
  data,
});

// Example test
describe('App tests', () => {
  it('renders the page, with the menu title', () => {
    render(<App />);
    expect(screen.getByText('Menu preview')).toBeInTheDocument();
  });

  it('the page should render 3 cards in the left sidebar and no card in the menu', async () => {
    const { queryByTestId } = render(<App />);
    const { items } = data;

    await waitFor(() => expect(queryByTestId(`${items[0].id}-header`)).toBeInTheDocument());
    await waitFor(() => expect(queryByTestId(`${items[1].id}-header`)).toBeInTheDocument());
    await waitFor(() => expect(queryByTestId(`${items[2].id}-header`)).toBeInTheDocument());
    await waitFor(() => expect(queryByTestId(`${items[0].id}-remove`)).not.toBeInTheDocument());
    await waitFor(() => expect(queryByTestId(`${items[1].id}-remove`)).not.toBeInTheDocument());
    await waitFor(() => expect(queryByTestId(`${items[2].id}-remove`)).not.toBeInTheDocument());
  });

  it('click on one card and it should also appear in the menu', async () => {
    const { queryByTestId } = render(<App />);
    const { items } = data;

    await waitFor(() => expect(queryByTestId(`${items[0].id}-header`)).toBeInTheDocument());
    await waitFor(() => expect(queryByTestId(`${items[0].id}-remove`)).not.toBeInTheDocument());
    fireEvent.click(queryByTestId(`${items[0].id}-header`));
    expect(queryByTestId(`${items[0].id}-remove`)).toBeInTheDocument();
  });

  it('can use input to filter the cards in sidebar', async () => {
    const { queryByTestId, getByPlaceholderText } = render(<App />);
    const { items } = data;

    await waitFor(() => expect(queryByTestId(`${items[0].id}-header`)).toBeInTheDocument());
    await waitFor(() => expect(queryByTestId(`${items[1].id}-header`)).toBeInTheDocument());
    await waitFor(() => expect(queryByTestId(`${items[2].id}-header`)).toBeInTheDocument());
    fireEvent.change(getByPlaceholderText('Name'), {
      target: { value: 'Roasted' },
    });
    expect(queryByTestId(`${items[0].id}-header`)).not.toBeInTheDocument();
    expect(queryByTestId(`${items[1].id}-header`)).toBeInTheDocument();
    expect(queryByTestId(`${items[2].id}-header`)).toBeInTheDocument();
  });

  it("can use 'x' button to remove card in menu", async () => {
    const { queryByTestId } = render(<App />);
    const { items } = data;

    await waitFor(() => expect(queryByTestId(`${items[0].id}-header`)).toBeInTheDocument());
    await waitFor(() => expect(queryByTestId(`${items[0].id}-remove`)).not.toBeInTheDocument());
    fireEvent.click(queryByTestId(`${items[0].id}-header`));
    expect(queryByTestId(`${items[0].id}-remove`)).toBeInTheDocument();
    fireEvent.click(queryByTestId(`${items[0].id}-remove`));
    expect(queryByTestId(`${items[0].id}-remove`)).not.toBeInTheDocument();
  });

  it('the header should show correct number of items and dieteries', async () => {
    const { queryByTestId, getByText } = render(<App />);
    const { items } = data;

    expect(getByText('0 items')).toBeInTheDocument();
    await waitFor(() => expect(queryByTestId(`${items[0].id}-header`)).toBeInTheDocument());
    fireEvent.click(queryByTestId(`${items[0].id}-header`));
    expect(getByText('1 items')).toBeInTheDocument();
    expect(queryByTestId('dietaries').innerHTML).toBe('1<span class="dietary">v</span>1<span class="dietary">ve</span>1<span class="dietary">df</span>1<span class="dietary">gf</span>1<span class="dietary">n!</span>');
    fireEvent.click(queryByTestId(`${items[1].id}-header`));
    expect(getByText('2 items')).toBeInTheDocument();
    expect(queryByTestId('dietaries').innerHTML).toBe('1<span class="dietary">v</span>1<span class="dietary">ve</span>2<span class="dietary">df</span>2<span class="dietary">gf</span>1<span class="dietary">n!</span>1<span class="dietary">rsf</span>');
    fireEvent.click(queryByTestId(`${items[0].id}-remove`));
    expect(getByText('1 items')).toBeInTheDocument();
    expect(queryByTestId('dietaries').innerHTML).toBe('1<span class=\"dietary\">gf</span>1<span class=\"dietary\">df</span>1<span class=\"dietary\">rsf</span>');
  });
});
