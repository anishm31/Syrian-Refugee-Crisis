import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchBar from "../Components/SearchBar";
import InstanceGrid from "../Components/InstanceGrid";
import TeamCard from "../Components/TeamCard";
import GenericModelPage from "../Components/GenericModelPage";
import CharityModelPage from "../Components/CharityModelPage";
import CharityCard from "../Components/CharityCard";
import NewsEventsModelPage from "../Components/NewsEventsModelPage";
import NewsCard from "../Components/NewsCard";
import CountryModelPage from "../Components/CountryModelPage";
import CountryCard from "../Components/CountryCard";
import HomePage from "../Components/HomePage";
import HomeCarousel from "../Components/HomeCarousel";

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

describe('TeamCard Component', () => {
  it('should render the team card with the correct information', () => {
    const sampleData = {
      name: 'John Doe',
      image: 'john-doe-image.jpg',
      user: 'johndoe123',
      role: 'Developer',
      bio: 'Passionate about web development',
      commits: 100,
      issues: 50,
    };

    render(<TeamCard {...sampleData} />);

    const nameElement = screen.getByText('John Doe');
    const userElement = screen.getByText('@johndoe123');

    expect(nameElement).toBeInTheDocument();
    expect(userElement).toBeInTheDocument();
  });
});

describe('GenericModelPage Component', () => {
  it('should render the component with the provided props', () => {
    const sampleProps = {
      model: 'Sample Model',
      modelCard: () => <div>Mock Model Card</div>,
      instances: [
        { id: 1, name: 'Instance 1' },
        { id: 2, name: 'Instance 2' },
      ],
    };

    render(<GenericModelPage {...sampleProps} />);
    
    const modelHeader = screen.getByText('Sample Model');
    const searchBar = screen.getByRole('textbox');

    expect(modelHeader).toBeInTheDocument();
    expect(searchBar).toBeInTheDocument();
  });
});

jest.mock('../Components/CharityCard', () => {
  return () => <div data-testid="charity-card">Mock Charity Card</div>;
});

describe('CharityModelPage Component', () => {
  it('should render the CharityModelPage component with the provided data', () => {
    render(<CharityModelPage />);
    render(<CharityCard />);
    const modelHeader = screen.getByText('Charities');

    expect(modelHeader).toBeInTheDocument();
  });
});

jest.mock('../Components/NewsCard', () => {
  return () => <div data-testid="news-card">Mock News/Events Card</div>;
});

describe('NewsEventsModelPage Component', () => {
  it('should render the NewsEventsModelPage component with the provided data', () => {
    render(<NewsEventsModelPage />);
    render(<NewsCard />);
    const modelHeader = screen.getByText('News');

    expect(modelHeader).toBeInTheDocument();
  });
});

jest.mock('../Components/CountryCard', () => {
  return () => <div data-testid="country-card">Mock Country Card</div>;
});

describe('CountryModelPage Component', () => {
  it('should render the CountryModelPage component with the provided data', () => {
    render(<CountryModelPage />);
    render(<CountryCard />);
    const modelHeader = screen.getByText('Countries');

    expect(modelHeader).toBeInTheDocument();
  });
});

describe('TeamCard Component', () => {
  it('should render the team card with the correct information', () => {
    const sampleData = {
      name: 'Jack Test',
      image: 'jack-test-image.jpg',
      user: 'jacktest123',
      role: 'Reporter',
      bio: 'Loves technology',
      commits: 100,
      issues: 50,
    };

    render(<TeamCard {...sampleData} />);

    const roleElement = screen.getByText('Reporter');
    const bioElement = screen.getByText('Loves technology');

    expect(roleElement).toBeInTheDocument();
    expect(bioElement).toBeInTheDocument();
  });
});

jest.mock('../Components/HomeCarousel', () => {
  return () => <div data-testid="mocked-carousel">Mocked Carousel</div>;
});

describe('HomePage Component', () => {
  it('should render the HomePage component', () => {
    render(<HomePage />);

    const carousel = screen.getByTestId('mocked-carousel');

    expect(carousel).toBeInTheDocument();
  });
});