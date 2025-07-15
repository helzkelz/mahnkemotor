import React from 'react';
import ProductionGoLiveSOPEnhanced from './ProductionGoLiveSOP.enhanced';

export default {
  title: 'Components/ProductionGoLiveSOPEnhanced',
  component: ProductionGoLiveSOPEnhanced,
  parameters: {
    docs: {
      description: {
        component: 'Enhanced Production Go-Live SOP component with interactive features, progress tracking, and customizable state management.'
      }
    }
  },
  argTypes: {
    interactive: {
      control: 'boolean',
      description: 'Enable interactive mode with clickable checklist items'
    },
    onProgress: {
      action: 'onProgress',
      description: 'Callback function called when progress changes'
    },
    initialState: {
      control: 'object',
      description: 'Initial state for checklist items'
    }
  }
};

const Template = (args) => <ProductionGoLiveSOPEnhanced {...args} />;

export const Default = Template.bind({});
Default.args = {
  interactive: false
};
Default.parameters = {
  docs: {
    description: {
      story: 'The default enhanced SOP component in non-interactive mode showing all items as completed.'
    }
  }
};

export const Interactive = Template.bind({});
Interactive.args = {
  interactive: true
};
Interactive.parameters = {
  docs: {
    description: {
      story: 'Interactive mode with clickable checklist items and progress tracking.'
    }
  }
};

export const PartiallyCompleted = Template.bind({});
PartiallyCompleted.args = {
  interactive: true,
  initialState: {
    'domain-daemon': false,
    'alerts-tested': false,
    'backup-tested': false,
    'payment-flow': false,
    'zero-downtime': false,
    'cache-purge': false,
    'emergency-sop': false,
  }
};
PartiallyCompleted.parameters = {
  docs: {
    description: {
      story: 'Interactive SOP with some items left unchecked to demonstrate progress tracking.'
    }
  }
};

export const AllIncomplete = Template.bind({});
AllIncomplete.args = {
  interactive: true,
  initialState: {
    'domain-daemon': false,
    'cloudflare-secrets': false,
    'domain-routing': false,
    'secrets-manager': false,
    'ssl-enforced': false,
    'privacy-policy': false,
    'structured-logging': false,
    'alerts-tested': false,
    'backup-tested': false,
    'payment-flow': false,
    'ritual-visibility': false,
    'auth-protected': false,
    'onboarding-works': false,
    'zero-downtime': false,
    'cache-purge': false,
    'runbooks': false,
    'emergency-sop': false,
  }
};
AllIncomplete.parameters = {
  docs: {
    description: {
      story: 'All checklist items unchecked to show the starting state for a new deployment.'
    }
  }
};

export const WithProgressCallback = Template.bind({});
WithProgressCallback.args = {
  interactive: true,
  initialState: {
    'domain-daemon': false,
    'alerts-tested': false,
    'backup-tested': false,
  },
  onProgress: (progress) => {
    console.log(`Progress updated: ${progress}%`);
  }
};
WithProgressCallback.parameters = {
  docs: {
    description: {
      story: 'Interactive SOP with progress callback (check console for progress updates).'
    }
  }
};

export const CompactView = Template.bind({});
CompactView.args = {
  interactive: true,
  initialState: {
    'domain-daemon': false,
    'alerts-tested': false,
    'backup-tested': false,
  }
};
CompactView.decorators = [
  (Story) => (
    <div className="max-w-2xl mx-auto p-4">
      <Story />
    </div>
  )
];
CompactView.parameters = {
  docs: {
    description: {
      story: 'Enhanced SOP component in a compact container to show responsive behavior.'
    }
  }
};

export const DarkMode = Template.bind({});
DarkMode.args = {
  interactive: true,
  initialState: {
    'domain-daemon': false,
    'alerts-tested': false,
  }
};
DarkMode.decorators = [
  (Story) => (
    <div className="bg-gray-900 p-8 min-h-screen">
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <Story />
      </div>
    </div>
  )
];
DarkMode.parameters = {
  docs: {
    description: {
      story: 'Enhanced SOP component in a dark mode context.'
    }
  }
};
