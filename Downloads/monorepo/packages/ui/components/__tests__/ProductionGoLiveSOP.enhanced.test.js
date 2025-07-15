import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductionGoLiveSOPEnhanced from '../ProductionGoLiveSOP.enhanced';

describe('ProductionGoLiveSOPEnhanced', () => {
  it('renders the main title', () => {
    render(<ProductionGoLiveSOPEnhanced />);
    expect(screen.getByText('Godmode OS Production Go-Live SOP')).toBeInTheDocument();
  });

  it('renders progress bar when interactive mode is enabled', () => {
    render(<ProductionGoLiveSOPEnhanced interactive={true} />);
    
    // Check for progress bar elements
    expect(screen.getByText(/100%/)).toBeInTheDocument();
    expect(screen.getByText('17/17')).toBeInTheDocument();
  });

  it('does not render progress bar when interactive mode is disabled', () => {
    render(<ProductionGoLiveSOPEnhanced interactive={false} />);
    
    // Should not show progress indicators
    expect(screen.queryByText(/100%/)).not.toBeInTheDocument();
  });

  it('starts with custom initial state', () => {
    const initialState = {
      'domain-daemon': false,
      'alerts-tested': false,
    };
    
    render(
      <ProductionGoLiveSOPEnhanced 
        interactive={true} 
        initialState={initialState}
      />
    );
    
    // Should show reduced progress
    expect(screen.getByText('15/17')).toBeInTheDocument();
  });

  it('toggles items when clicked in interactive mode', () => {
    const initialState = {
      'domain-daemon': false,
    };
    
    render(
      <ProductionGoLiveSOPEnhanced 
        interactive={true} 
        initialState={initialState}
      />
    );
    
    // Find the domain daemon item and click it
    const domainDaemonItem = screen.getByTestId('domain-daemon');
    fireEvent.click(domainDaemonItem);
    
    // Check that progress updated
    expect(screen.getByText('17/17')).toBeInTheDocument();
  });

  it('does not toggle items when clicked in non-interactive mode', () => {
    const initialState = {
      'domain-daemon': false,
    };
    
    render(
      <ProductionGoLiveSOPEnhanced 
        interactive={false} 
        initialState={initialState}
      />
    );
    
    // Try to click an item (should not work)
    const domainDaemonItem = screen.getByTestId('domain-daemon');
    fireEvent.click(domainDaemonItem);
    
    // Progress should not be shown in non-interactive mode
    expect(screen.queryByText('17/17')).not.toBeInTheDocument();
  });

  it('calls onProgress callback when progress changes', () => {
    const mockOnProgress = jest.fn();
    const initialState = {
      'domain-daemon': false,
    };
    
    render(
      <ProductionGoLiveSOPEnhanced 
        interactive={true} 
        initialState={initialState}
        onProgress={mockOnProgress}
      />
    );
    
    // Click to toggle an item
    const domainDaemonItem = screen.getByTestId('domain-daemon');
    fireEvent.click(domainDaemonItem);
    
    // Check that callback was called with correct progress
    expect(mockOnProgress).toHaveBeenCalledWith(100);
  });

  it('shows completion celebration when all items are checked', () => {
    render(<ProductionGoLiveSOPEnhanced interactive={true} />);
    
    // Should show the ready for production message
    expect(screen.getByText('🎉 Ready for Production!')).toBeInTheDocument();
    expect(screen.getByText(/All checks complete!/)).toBeInTheDocument();
  });

  it('shows pending message when not all items are checked', () => {
    const initialState = {
      'domain-daemon': false,
    };
    
    render(
      <ProductionGoLiveSOPEnhanced 
        interactive={true} 
        initialState={initialState}
      />
    );
    
    // Should show the pending message
    expect(screen.getByText('Operator Ritual')).toBeInTheDocument();
    expect(screen.getByText(/Complete all checklist items above/)).toBeInTheDocument();
  });

  it('renders all checklist sections', () => {
    render(<ProductionGoLiveSOPEnhanced />);
    
    expect(screen.getByText('1. Domain & Cloudflare')).toBeInTheDocument();
    expect(screen.getByText('2. Secrets, Compliance, Security')).toBeInTheDocument();
    expect(screen.getByText('3. Monitoring & Recovery')).toBeInTheDocument();
    expect(screen.getByText('4. Real-World Ritual Test')).toBeInTheDocument();
    expect(screen.getByText('5. Operator & User Access')).toBeInTheDocument();
    expect(screen.getByText('6. Deploy & Cache')).toBeInTheDocument();
    expect(screen.getByText('7. Docs & SOPs')).toBeInTheDocument();
  });

  it('has hover effects in interactive mode', () => {
    render(<ProductionGoLiveSOPEnhanced interactive={true} />);
    
    const domainDaemonItem = screen.getByTestId('domain-daemon');
    expect(domainDaemonItem).toHaveClass('cursor-pointer');
    expect(domainDaemonItem).toHaveClass('hover:bg-gray-50');
  });

  it('does not have hover effects in non-interactive mode', () => {
    render(<ProductionGoLiveSOPEnhanced interactive={false} />);
    
    const domainDaemonItem = screen.getByTestId('domain-daemon');
    expect(domainDaemonItem).not.toHaveClass('cursor-pointer');
  });

  it('shows correct progress percentage calculation', () => {
    const initialState = {
      'domain-daemon': false,
      'alerts-tested': false,
      'backup-tested': false,
    };
    
    render(
      <ProductionGoLiveSOPEnhanced 
        interactive={true} 
        initialState={initialState}
      />
    );
    
    // 14 out of 17 items completed = 82%
    expect(screen.getByText('82%')).toBeInTheDocument();
    expect(screen.getByText('14/17')).toBeInTheDocument();
  });
});
