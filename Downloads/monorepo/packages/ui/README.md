# UI Components Package

This package contains shared React components for the Godmode OS monorepo.

## Components

### ProductionGoLiveSOP

A static checklist component that displays the Production Go-Live Standard Operating Procedure.

**Usage:**
```jsx
import { ProductionGoLiveSOP } from '@monorepo/ui';

function MyPage() {
  return <ProductionGoLiveSOP />;
}
```

**Features:**
- Displays a comprehensive 7-section production readiness checklist
- Shows completion status with visual indicators (✅ for completed, ⏳ for pending)
- Includes operator ritual section with final activation command
- Fully responsive design with Tailwind CSS

### ProductionGoLiveSOPEnhanced

An interactive version of the SOP component with state management and progress tracking.

**Usage:**
```jsx
import { ProductionGoLiveSOPEnhanced } from '@monorepo/ui';

function MyPage() {
  const handleProgress = (progress) => {
    console.log(`Progress: ${progress}%`);
  };

  return (
    <ProductionGoLiveSOPEnhanced
      interactive={true}
      onProgress={handleProgress}
      initialState={{
        'domain-daemon': false,
        'alerts-tested': false,
        // ... other checklist items
      }}
    />
  );
}
```

**Props:**
- `interactive` (boolean, optional): Enable interactive mode with clickable checkboxes
- `onProgress` (function, optional): Callback function that receives progress percentage
- `initialState` (object, optional): Initial state for checklist items

**Features:**
- All features from the static version
- Interactive checkboxes for real-time progress tracking
- Progress bar visualization
- Customizable initial state
- Progress callback for external tracking
- Dynamic styling based on completion status

## Development

### Testing

Run tests with:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Generate coverage report:
```bash
npm run test:coverage
```

### Storybook

Start Storybook development server:
```bash
npm run storybook
```

Build Storybook:
```bash
npm run build-storybook
```

## Dependencies

- React ^18.0.0
- React DOM ^18.0.0
- Tailwind CSS (for styling)

## Development Dependencies

- Jest & React Testing Library (for testing)
- Storybook (for component documentation)
- TypeScript support

## Directory Structure

```
packages/ui/
├── components/
│   ├── __tests__/
│   │   └── ProductionGoLiveSOP.test.js
│   ├── ProductionGoLiveSOP.tsx
│   ├── ProductionGoLiveSOP.enhanced.tsx
│   └── ProductionGoLiveSOP.stories.js
├── .storybook/
│   ├── main.js
│   ├── preview.js
│   └── tailwind.css
├── index.js
├── package.json
├── tsconfig.json
├── jest.config.js
├── jest.setup.js
└── README.md
```

## Integration

This package is designed to be used across multiple applications in the monorepo. To use it in an app:

1. Add the dependency to your app's package.json:
```json
{
  "dependencies": {
    "@monorepo/ui": "file:../../packages/ui"
  }
}
```

2. Import and use the components:
```jsx
import { ProductionGoLiveSOP, ProductionGoLiveSOPEnhanced } from '@monorepo/ui';
```

## Contributing

When adding new components:

1. Create the component in the `components/` directory
2. Add tests in `components/__tests__/`
3. Create Storybook stories in `components/ComponentName.stories.js`
4. Export the component in `index.js`
5. Update this README with usage documentation
