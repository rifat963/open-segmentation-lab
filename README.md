# Open Segmentation Lab

Open Segmentation Lab is a free static academic website for learning image segmentation. It covers semantic segmentation, instance segmentation, panoptic segmentation, self-supervised segmentation, datasets, metrics, papers, and small browser-only playground tools.

The project uses only HTML, CSS, and vanilla JavaScript. There is no React, Next.js, npm, TypeScript, Tailwind, backend, database, login system, or build step.

## Folder Structure

```text
open-segmentation-lab/
|-- index.html
|-- semantic.html
|-- instance.html
|-- panoptic.html
|-- ssl-segmentation.html
|-- datasets.html
|-- metrics.html
|-- playground.html
|-- papers.html
|-- about.html
|-- css/
|   `-- style.css
|-- js/
|   `-- main.js
|-- images/
|   |-- placeholder-segmentation.svg
|   |-- semantic-mask.svg
|   |-- instance-mask.svg
|   `-- panoptic-mask.svg
|-- ads/
|   `-- adsense-placeholder.html
|-- robots.txt
|-- sitemap.xml
|-- vercel.json
`-- README.md
```

## How to Run Locally

Option 1:
Open `index.html` directly in a browser.

Option 2:
Use the VS Code Live Server extension.

Option 3:
Use Python's local server:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Deploy to Vercel

1. Push the folder to GitHub.
2. Open the Vercel dashboard.
3. Import the GitHub repository.
4. Select Framework Preset: Other.
5. Leave Build Command empty.
6. Leave Output Directory as project root or default if Vercel serves `index.html`.
7. Deploy.

The included `vercel.json` adds basic security headers and long-lived caching for CSS, JavaScript, and image assets. It does not require a build command.

## Connect GitHub with Vercel

1. Create a GitHub repository for `open-segmentation-lab`.
2. Commit and push the project files.
3. In Vercel, choose Add New Project.
4. Select the GitHub repository.
5. Confirm that the project is treated as a static site.
6. Deploy and use the Vercel URL for testing.
7. Update canonical URLs and `sitemap.xml` from `https://example.com/` to the final domain.

## AdSense Placement

Ad placeholders use the `.ad-slot` class and include this comment:

```html
<!-- Future Google AdSense unit can be placed here after approval. Do not encourage clicks. -->
```

Place AdSense code only where placeholders already exist:

- Footer area.
- Right side of long pages on desktop.
- After major tutorial sections.

Do not place ads in the hero section, inside formulas, inside code blocks, near buttons, near playground tools, or in any location that encourages accidental clicks.

## Academic Content Contribution Guide

- Keep all educational content free.
- Prefer clear definitions, formulas, diagrams, and examples over promotional language.
- Use correct segmentation terminology: semantic masks, instance masks, panoptic maps, IoU, Dice, Mask AP, and Panoptic Quality.
- Add citations or official paper links when replacing placeholder paper links.
- Explain limitations and pitfalls, especially for metrics and pseudo-label workflows.
- Keep pages readable for undergraduate and graduate computer vision students.
- Avoid unsupported claims about model performance unless the page links to a reliable source.
- Keep ads sparse, labeled, and separate from learning-critical content.
