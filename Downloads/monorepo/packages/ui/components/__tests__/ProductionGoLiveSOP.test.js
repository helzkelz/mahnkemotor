import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductionGoLiveSOP from '../ProductionGoLiveSOP';

describe('ProductionGoLiveSOP', () => {
  it('renders the main title', () => {
    render(<ProductionGoLiveSOP />);
    expect(screen.getByText('Godmode OS Production Go-Live SOP')).toBeInTheDocument();
  });

  it('renders all 7 main sections', () => {
    render(<ProductionGoLiveSOP />);
    
    expect(screen.getByText('1. Domain & Cloudflare')).toBeInTheDocument();
    expect(screen.getByText('2. Secrets, Compliance, Security')).toBeInTheDocument();
    expect(screen.getByText('3. Monitoring & Recovery')).toBeInTheDocument();
    expect(screen.getByText('4. Real-World Ritual Test')).toBeInTheDocument();
    expect(screen.getByText('5. Operator & User Access')).toBeInTheDocument();
    expect(screen.getByText('6. Deploy & Cache')).toBeInTheDocument();
    expect(screen.getByText('7. Docs & SOPs')).toBeInTheDocument();
  });

  it('renders the operator ritual section', () => {
    render(<ProductionGoLiveSOP />);
    
    expect(screen.getByText('Operator Ritual')).toBeInTheDocument();
    expect(screen.getByText(/activate-production.mission/)).toBeInTheDocument();
  });

  it('renders domain daemon reference', () => {
    render(<ProductionGoLiveSOP />);
    
    expect(screen.getByText('domainOpsDaemon@1')).toBeInTheDocument();
    expect(screen.getByText('/packages/agents/domainOpsDaemon@1.js')).toBeInTheDocument();
  });

  it('renders security checklist items', () => {
    render(<ProductionGoLiveSOP />);
    
    expect(screen.getByText(/All secrets stored in secrets manager/)).toBeInTheDocument();
    expect(screen.getByText(/SSL enforced everywhere/)).toBeInTheDocument();
    expect(screen.getByText(/Privacy Policy & ToS linked/)).toBeInTheDocument();
  });

  it('renders monitoring checklist items', () => {
    render(<ProductionGoLiveSOP />);
    
    expect(screen.getByText(/Structured logging active/)).toBeInTheDocument();
    expect(screen.getByText(/Discord\/Email\/Operator alerts tested/)).toBeInTheDocument();
    expect(screen.getByText(/DB and Redis backup\/restore tested/)).toBeInTheDocument();
  });

  it('renders deployment checklist items', () => {
    render(<ProductionGoLiveSOP />);
    
    expect(screen.getByText(/Zero-downtime deploy/)).toBeInTheDocument();
    expect(screen.getByText(/Cloudflare cache purge on deploy/)).toBeInTheDocument();
  });

  it('renders completed checkmark emojis by default', () => {
    render(<ProductionGoLiveSOP />);
    
    // Check that completed items show green checkmarks
    const checkmarks = screen.getAllByText('✅');
    expect(checkmarks.length).toBeGreaterThan(0);
  });

  it('has proper CSS classes for styling', () => {
    const { container } = render(<ProductionGoLiveSOP />);
    
    // Check main container classes
    expect(container.querySelector('.max-w-4xl')).toBeInTheDocument();
    expect(container.querySelector('.mx-auto')).toBeInTheDocument();
    expect(container.querySelector('.bg-white')).toBeInTheDocument();
  });
});
