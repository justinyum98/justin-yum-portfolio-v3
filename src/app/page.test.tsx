import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from './page';

describe('Home', () => {
  it('renders the main heading', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('To get started, edit the page.tsx file.');
  });

  it('renders the Next.js logo', () => {
    render(<Home />);
    const logo = screen.getByAltText('Next.js logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Home />);
    const deployButton = screen.getByRole('link', { name: /deploy now/i });
    const docsLink = screen.getByRole('link', { name: /documentation/i });

    expect(deployButton).toBeInTheDocument();
    expect(docsLink).toBeInTheDocument();
  });
});
