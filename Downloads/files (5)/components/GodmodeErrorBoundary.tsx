import React from 'react';
import AftercarePanel from './AftercarePanel';

export default class GodmodeErrorBoundary extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <h2>Something glitched in the ritual.</h2>
          <AftercarePanel error={this.state.error} />
        </div>
      );
    }
    return this.props.children;
  }
}