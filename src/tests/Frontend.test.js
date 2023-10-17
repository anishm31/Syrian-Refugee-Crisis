import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchBar from "../Components/SearchBar";
import InstanceGrid from "../Components/InstanceGrid";

describe('SearchBar Component', () => {
  it('should render the search form textbox element', () => {
    render(<SearchBar />);
    const formControl = screen.getByRole('textbox');
    expect(formControl).toBeInTheDocument();
  });
});

describe('InstanceGrid Component', () => {
  it('should render the component without errors', () => {
    const sampleInstances = [
      { id: 1, name: 'Instance 1' },
      { id: 2, name: 'Instance 2' },
      { id: 3, name: 'Instance 3' },
    ];
    render(<InstanceGrid instances={sampleInstances} modelCard={() => <div>Mock Model Card</div>} />);
    const instanceCountElement = screen.getByText('3 Instances');

    expect(instanceCountElement).toBeInTheDocument();
  });
});

describe('SearchBar Component', () => {
  it('should render the search form search button and input placeholder element', () => {
    render(<SearchBar />);
    const inputPlaceholder = screen.getByPlaceholderText('Search for instance');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    expect(inputPlaceholder).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });
});
