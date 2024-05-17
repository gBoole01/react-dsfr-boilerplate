import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Home from '../../src/pages/Home';

describe('Home', () => {
    it('renders a heading', () => {
        render(<Home />);

        const heading = screen.getByRole('heading', {
            name: /Hello World!/i,
        });

        expect(heading).toBeInTheDocument();
    });
});
