import React from 'react';
import ProductionGoLiveSOP from './ProductionGoLiveSOP';

export default {
  title: 'Components/ProductionGoLiveSOP',
  component: ProductionGoLiveSOP,
  parameters: {
    docs: {
      description: {
        component: 'Production Go-Live Standard Operating Procedure (SOP) component that displays a comprehensive checklist for production deployment readiness.'
      }
    }
  }
};

const Template = (args) => <ProductionGoLiveSOP {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  docs: {
    description: {
      story: 'The default SOP component showing all checklist items as completed (green checkmarks).'
    }
  }
};

export const WithCustomBackground = Template.bind({});
WithCustomBackground.args = {};
WithCustomBackground.decorators = [
  (Story) => (
    <div className="bg-gray-100 p-8 min-h-screen">
      <Story />
    </div>
  )
];
WithCustomBackground.parameters = {
  docs: {
    description: {
      story: 'SOP component displayed on a gray background to show how it integrates with different page layouts.'
    }
  }
};

export const DarkMode = Template.bind({});
DarkMode.args = {};
DarkMode.decorators = [
  (Story) => (
    <div className="bg-gray-900 p-8 min-h-screen">
      <div className="bg-gray-800 text-white rounded-lg">
        <Story />
      </div>
    </div>
  )
];
DarkMode.parameters = {
  docs: {
    description: {
      story: 'SOP component in a dark mode context to demonstrate adaptability.'
    }
  }
};

export const CompactView = Template.bind({});
CompactView.args = {};
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
      story: 'SOP component in a more compact container to show responsive behavior.'
    }
  }
};
