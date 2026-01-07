<p align="center">
  <img src="assets/mockmark_logo.png" alt="MockMark Logo" width="180" />
</p>

<h1 align="center">MockMark</h1>

<p align="center">
  <strong>Development-only visual indicators for mock data in React applications.</strong>
</p>

<p align="center">
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#variants">Variants</a> •
  <a href="#props">Props</a>
</p>

---

## Installation

```bash
npm install mockmark
```

## Usage

### Basic Usage

```tsx
import { MockMark } from 'mockmark'

function AdvisorList() {
  return (
    <MockMark label="Advisors" reason="Not connected to database">
      <div className="grid">
        {mockAdvisors.map(advisor => (
          <AdvisorCard key={advisor.id} advisor={advisor} />
        ))}
      </div>
    </MockMark>
  )
}
```

### Global Configuration

```tsx
import { MockMarkProvider } from 'mockmark'

function App() {
  return (
    <MockMarkProvider 
      enabled={process.env.NODE_ENV === 'development'}
      defaultVariant="border"
      theme={{ borderColor: '#8b5cf6' }}
    >
      <YourApp />
    </MockMarkProvider>
  )
}
```

### Variants

- `border` (default): Dashed border around content with floating label
- `badge`: Just the label badge positioned absolutely
- `minimal`: Thin outline with corner label

```tsx
<MockMark variant="minimal" label="API">
  <DataTable />
</MockMark>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | string | "MOCK" | Badge text |
| `reason` | string | - | Tooltip description |
| `variant` | 'border' \| 'badge' \| 'minimal' | 'border' | Visual style |
| `disabled` | boolean | false | Force hide this instance |

## License

MIT
