# LEF Visualizer Web App

This project is an interactive web-based LEF (Library Exchange Format) visualizer. It allows users to edit LEF files live using a Monaco code editor and instantly see the parsed and visualized via stacks and metal layers.

## Features

- **Live Monaco Editor:** Edit your LEF file in the left panel and see changes instantly.
- **LEF Parsing:** Uses a custom parser to extract layers and vias from LEF text.
- **Interactive Visualization:**
  - Main via stack analysis and visualization.
  - Grid view of all via stacks, each with mini visual previews.
  - Clickable badges and layers for interactive exploration.
- **Responsive Layout:**
  - Left 30%: Monaco Editor for LEF input.
  - Right 70%: All via stacks grid and visualization.
- **No Backend Required:** All parsing and rendering is done in the browser.

## Getting Started

### Prerequisites
- Node.js (v18 or later recommended)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd <your-repo-directory>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and go to `http://localhost:5173` (or the port shown in your terminal).

## Usage

- Edit the LEF file in the Monaco editor (left panel).
- The visualizer (right panel) updates live as you type.
- Explore all via stacks in the grid; click to focus on a specific stack.

## Project Structure

- `src/LefLivePage.tsx` — Main page with Monaco editor and visualizer layout.
- `src/LefVisualizer.tsx` — Visualization component for via stacks and layers.
- `src/lefParser.ts` — LEF file parser logic.
- `src/LefVisualizer.css` — Custom styles for layout and visualization.

## Customization
- Adjust the number of columns in the via stacks grid by editing `.lef-grid-container` in `LefVisualizer.css`.
- Tweak colors, patterns, and layout as needed for your use case.

## License

MIT License. See [LICENSE](LICENSE) for details.

---

*Made with ❤️ for semiconductor and EDA enthusiasts.*
