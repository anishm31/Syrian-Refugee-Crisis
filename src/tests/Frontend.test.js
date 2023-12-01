import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchBar from "../Components/SearchBar";
import TeamCard from "../Components/TeamCard";
import GenericModelPage from "../Components/GenericModelPage";
import HomePage from "../Components/HomePage";
import ToolCard from "../Components/ToolCard";

describe('SearchBar Component', () => {
  it('should render the search form textbox element', () => {
    render(<SearchBar />);
    const formControl = screen.getByRole('textbox');
    expect(formControl).toBeInTheDocument();
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

    const userElement = screen.getByText('@johndoe123');

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

    expect(modelHeader).toBeInTheDocument();
  });
});

describe('ToolCard', () => {
  it('should render a tool card with the correct content', () => {
    const tool = {
      name: 'Sample Tool',
      desc: 'Description of the sample tool',
      link: 'https://example.com',
      image: 'sample-image.jpg',
    };

    render(<ToolCard {...tool} />);

    const cardElement = screen.getByTestId('tool-card');
    expect(cardElement).toBeInTheDocument();

    const toolName = screen.getByText('Sample Tool');
    expect(toolName).toBeInTheDocument();
  });
});

describe('ToolCard', () => {
  it('should render a tool card with the correct content', () => {
    const tool = {
      name: 'Another Tool',
      desc: 'desc',
      link: 'https://another-example.com',
      image: 'sample-image.jpg',
    };

    render(<ToolCard {...tool} />);

    const toolDescription = screen.getByText('desc');
    expect(toolDescription).toBeInTheDocument();

    const cardElement = screen.getByTestId('tool-card');
    expect(cardElement).toBeInTheDocument();
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

jest.mock('../Components/InstanceGrid', () => {
  return () => <div data-testid="mocked-instance-grid">Mocked Instance Grid</div>;
});

describe('GenericModelPage', () => {
  it('renders the model page with the correct title', () => {
    render(<GenericModelPage model="Test Model" />);

    const titleElement = screen.getByText('Test Model');
    expect(titleElement).toBeInTheDocument();
  });
});

describe('ToolCard Component', () => {
  const toolData = {
    name: 'Random',
    desc: 'A description of the random tool',
    link: 'https://example.com/tool',
    image: 'https://example.com/tool-image.jpg',
  };

  it('should render the ToolCard component with tool information', () => {
    render(<ToolCard {...toolData} />);
    
    const nameElement = screen.getByText(toolData.name);
    expect(nameElement).toBeInTheDocument();

    const descElement = screen.getByText(toolData.desc);
    expect(descElement).toBeInTheDocument();
  });
});
