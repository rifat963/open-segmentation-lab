# Open Segmentation Lab - Next.js Migration Context

This document describes the current Open Segmentation Lab static website and provides a complete prompt for recreating the same design and content structure as a modern Next.js application.

## Project Identity

Open Segmentation Lab is a free academic learning website for computer vision and image processing. It serves students and researchers with tutorials, EWU course pages, research resources, datasets, metrics, interactive learning tools, and notebook-style lab material.

Primary audience:

- Undergraduate computer science students
- Computer vision learners
- EWU CSE438 and CSE445 students
- Researchers who want organized segmentation, detection, tracking, and image processing references

Tone:

- Academic but readable
- Structured, precise, and classroom friendly
- Practical and example-driven
- Free learning resource, no login or backend assumptions

## Current Static Site Inventory

Root pages:

- `index.html` - home page and topic gateway
- `semantic.html` - semantic segmentation tutorial
- `instance.html` - instance segmentation tutorial
- `panoptic.html` - panoptic segmentation tutorial
- `object-detection.html` - object detection topic page
- `tracking.html` - object tracking topic page
- `ssl-segmentation.html` - self-supervised segmentation topic page
- `metrics.html` - segmentation and vision metrics
- `papers.html` - research paper reading resources
- `datasets.html` - datasets for segmentation and vision
- `playground.html` - browser-only interactive segmentation playground
- `blog.html` - blog/resource posts
- `about.html` - about the project and instructor
- `cse438-dip.html` - CSE438 Digital Image Processing course page
- `cse445-cv.html` - CSE445 Computer Vision course page

Course module folders:

- `cse438_content/`
  - `module-1-foundations.html`
  - `module-2-gray-level.html`
  - `module-3-spatial-filtering.html`
  - `module-4-transforms-frequency.html`
  - `module-5-restoration.html`
  - `module-6-segmentation-color.html`
  - `module-7-morphology-recognition.html`
- `cse445_content/`
  - `module-1-introduction.html`
  - `module-2-features.html`
  - `module-3-camera-geometry.html`
  - `module-4-matching.html`
  - `module-5-multiple-view.html`
  - `module-6-motion.html`
  - `module-7-detection-recognition.html`
  - `module-9-tracking.html`
  - `module-10-advances.html`

Notebook HTML folder:

- `notebook_html/cse438-unet-crack-segmentation.html`
- `notebook_html/cse438-deeplabv3-crack-segmentation.html`
- `notebook_html/cse438-segformer-crack-segmentation-ipynb.html`

Main asset folder:

- `images/Homepage_hero_banner2.png`
- `images/Homepage_hero_banner.png`
- `images/how_dense_prediction_work.png`
- `images/iou-dice-metrics.webp.png`
- `images/model-evolution-timeline.webp.png`
- `images/segmentation-pipeline.webp.png`
- `images/semantic-instance-panoptic-comparison.png`
- `images/ssl-segmentation-workflow.webp.png`
- SVG masks and examples for segmentation visuals

## Visual Design System

The site uses a polished academic learning-site style. It should feel serious, clean, structured, and course/resource focused.

### Color Tokens

Use these colors as design tokens in Next.js:

```css
:root {
  --color-primary: #123a63;
  --color-primary-dark: #0b2744;
  --color-accent: #2f8f8a;
  --color-accent-soft: #dff2f0;
  --color-bg: #f8fafc;
  --color-surface: #ffffff;
  --color-text: #26313d;
  --color-muted: #617080;
  --color-border: #d9e2ec;
  --color-callout: #eef5fb;
  --color-code-bg: #102033;
  --color-code-text: #eef6ff;
  --color-warning: #8a5a12;
  --color-warning-bg: #fff6df;
  --shadow-soft: 0 12px 34px rgba(18, 58, 99, 0.08);
  --shadow-hover: 0 18px 46px rgba(18, 58, 99, 0.14);
  --radius: 8px;
  --container: 1120px;
  --transition: 0.2s ease;
}
```

Design personality:

- Navy and teal are the core identity.
- White cards and light gray page backgrounds keep the site readable.
- Use soft shadows, not heavy shadows.
- Use 6px to 8px radius for normal cards and controls.
- Use pill radius only for badges and small labels.
- Avoid one-note dark blue pages. Use white, teal highlights, and light callout bands for balance.

### Typography

Current stack:

```css
font-family: "Segoe UI", Roboto, Arial, sans-serif;
```

Next.js recommendation:

- Use this same system stack or use `Inter` if the app already standardizes on it.
- Keep line height around `1.6` to `1.72` for educational reading.
- Use large display type only for home/page heroes.
- Use tighter, smaller headings inside cards and sidebars.

### Layout Rules

- Global container width: `min(1120px, calc(100% - 32px))`.
- Sections use full-width bands with constrained inner content.
- Do not nest cards inside cards.
- Cards are for repeated content, lab notebooks, module blocks, resources, and sidebars.
- Course modules should be full-width zones, one module per row.
- Inner module pages should use a two-column layout on desktop:
  - main article
  - sticky sidebar with key terms
- Collapse grids to one column on mobile.

### Primary Components

Implement these as reusable Next.js components:

- `SiteHeader`
  - sticky header
  - OSL brand mark
  - dropdown nav groups
  - mobile menu button
- `SiteFooter`
  - dark navy footer
  - breadcrumb-style footer trail
  - contact address
  - topic/course/resource link columns
- `PageHero`
  - gradient/callout hero for inner pages
  - eyebrow, h1, description
- `HomeHero`
  - image-backed hero using `Homepage_hero_banner2.png`
  - navy overlay gradient
  - H1: Open Segmentation Lab
- `SectionTitle`
  - h2 and supporting text
- `Card`
  - white surface, border, 8px radius, soft shadow
- `Badge`
  - small pill label using callout/accent colors
- `Button`
  - primary: navy or teal filled
  - outline: white/light surface with navy text and border
- `CourseSnapshot`
  - 4 cards across desktop, 2 across tablet, 1 on mobile
- `ModuleZone`
  - full-width course module row
  - large module number
  - title, summary, badges
  - action buttons
- `SiteTrail`
  - dark notebook-style secondary nav for module pages
- `InfographStep`
  - numbered square node plus title and description
- `ScenarioCard`
  - scenario-driven exploration prompts
- `LectureItem`
  - module page lecture focus block
- `NotebookCard`
  - lab notebook/resource cards

## Navigation Model

Main navigation:

- Home
- Computer Vision Tasks
  - Semantic Segmentation
  - Instance Segmentation
  - Panoptic Segmentation
  - Object Detection
  - Object Tracking
  - Self-Supervised Learning
- Courses
  - CSE438 DIP
  - CSE445 CV
- Resources
  - Evaluation Metrics
  - Research Papers
  - Datasets
  - Interactive Playground
- Blog
- About

Footer repeats the major groups:

- Computer Vision
- Courses
- Resources

Footer contact:

```text
Mohammad Rifat Ahmmad Rashid
Computer Vision Researcher | Associate Professor
Dept. of Computer Science and Engineering
East West University, Dhaka 1212, Bangladesh
rifat.rashid@ewubd.edu
```

## Recommended Next.js Route Structure

Use App Router:

```text
app/
  layout.tsx
  page.tsx
  semantic/page.tsx
  instance/page.tsx
  panoptic/page.tsx
  object-detection/page.tsx
  tracking/page.tsx
  ssl-segmentation/page.tsx
  metrics/page.tsx
  papers/page.tsx
  datasets/page.tsx
  playground/page.tsx
  blog/page.tsx
  about/page.tsx
  courses/
    cse438-dip/page.tsx
    cse438-dip/[slug]/page.tsx
    cse445-cv/page.tsx
    cse445-cv/[slug]/page.tsx
  notebooks/
    cse438-unet-crack-segmentation/page.tsx
    cse438-deeplabv3-crack-segmentation/page.tsx
    cse438-segformer-crack-segmentation/page.tsx
components/
  SiteHeader.tsx
  SiteFooter.tsx
  PageHero.tsx
  Section.tsx
  Card.tsx
  Badge.tsx
  Button.tsx
  CourseSnapshot.tsx
  ModuleZone.tsx
  SiteTrail.tsx
  Infograph.tsx
  ScenarioGrid.tsx
  NotebookCard.tsx
data/
  navigation.ts
  courses.ts
  topics.ts
  resources.ts
  blog.ts
public/
  images/
```

Alternative route mapping if you want to preserve old URLs:

- `/cse438-dip`
- `/cse438_content/module-1-foundations`
- `/cse445-cv`
- `/cse445_content/module-1-introduction`

For a cleaner Next.js app, prefer `/courses/cse438-dip/module-1-foundations`.

## Course Content Details

### CSE438 Digital Image Processing

Course summary:

- 4 credits total
- 3 theory credits and 1 laboratory credit
- 5 contact hours per week
- Instructor: Dr. Mohammad Rifat Ahmmad Rashid
- Tools: Python, NumPy, OpenCV, SciPy, scikit-image, PyWavelets, Matplotlib

Course outcomes:

- CO1: Explain image processing basics, sampling, quantization, color representation, gray-level transformations, and histogram equalization.
- CO2: Apply filtering methods in spatial and frequency domains.
- CO3: Model restoration, extract regions of interest, use segmentation, apply morphology, and recognize shapes.
- CO4: Demonstrate hands-on labs, communicate concepts, solve real-world problems, and write application reports.

Assessment:

- Class participation: 5
- Class test: 10
- Midterm exam: 30
- Final exam: 35
- Term project: 15
- Laboratory performance and lab exam: 5

CSE438 modules:

1. DIP Foundations and Image Representation
   - Lectures 1-6
   - Introduction to DIP, key stages, sampling, quantization, pixel relationships, distance measures, arithmetic/logical operations
   - Labs 1-2
2. Gray-Level Transformations and Histogram Processing
   - Lectures 7-11
   - Point operations, thresholding, bit-plane slicing, contrast stretching, intensity slicing, log transform, gamma transform, histogram equalization, histogram matching
   - Labs 3-4
3. Spatial Filtering and Derivative Operators
   - Lectures 12-16
   - Spatial filtering, smoothing, sharpening, unsharp masking, high boost filtering, Sobel, Prewitt, LoG, Canny
   - Labs 5-7
4. Transforms, Compression and Frequency Processing
   - Lectures 17-20
   - DFT, DCT, wavelets, compression, Hough transform, frequency domain low-pass and high-pass filters
   - Labs 8-9
5. Image Restoration and Noise Modeling
   - Lectures 21-22
   - Restoration models, Gaussian noise, salt-and-pepper noise, inverse filtering, Wiener filtering, PSNR
   - Lab 10
6. Segmentation, Feature Extraction and Color Processing
   - Lectures 23-25
   - Segmentation, feature extraction, edge detection, thresholding, region-based methods, medical image recognition, color image processing
   - Lab 11
7. Morphological Operations and Object Recognition
   - Lecture 26
   - Erosion, dilation, opening, closing, morphological gradient, top-hat, black-hat, connected components, shape descriptors
   - Lab 12

CSE438 module page structure:

- Page hero
- Notebook-style `SiteTrail`
- Lecture focus list
- Infographic section
- Scenario driven exploration section
- Sticky sidebar with key terms

### CSE445 Computer Vision

Course summary:

- 4 credits total
- 3 theory credits and 1 laboratory credit
- 5 contact hours per week
- Prerequisite: CSE246 Algorithms
- Instructor: Dr. Mohammad Rifat Ahmmad Rashid

Course outcomes:

- CO1: Explain fundamental concepts, visual structure, applications, and challenges.
- CO2: Apply feature-based and geometry-based methods for correspondences and spatial relationships.
- CO3: Interpret motion, 3D vision, recognition, and learning-based pipelines.
- CO4: Design, implement, and document complete vision systems.

Assessment:

- Class participation: 5
- Class test/quiz: 10
- Midterm assessment: 30
- Final exam: 35
- Laboratory performance: 10
- Mini project: 10

CSE445 modules:

1. Introduction to Computer Vision
   - Lectures 1-2
   - CV definition, image processing versus CV, tasks, pipeline, applications
2. Feature Detection and Description
   - Lectures 3-5
   - Harris, FAST, SIFT, SURF, ORB, local descriptors and robustness
3. Camera Models and Projection Geometry
   - Lectures 6-8
   - Pinhole camera, projection geometry, intrinsic/extrinsic parameters, coordinate systems, transformations, homogeneous coordinates
4. Feature Matching and Geometric Verification
   - Lectures 9-11
   - Descriptor matching, distance metrics, RANSAC, homography, image alignment, panorama, calibration
5. Multiple View Geometry
   - Lectures 12, 14-15
   - Epipolar geometry, fundamental matrix, essential matrix, stereo correspondence, triangulation, depth estimation
6. Motion Analysis
   - Lectures 16-17
   - Optical flow, sparse and dense motion, motion fields, background subtraction, temporal consistency
7. Object Detection and Recognition
   - Lectures 18-19
   - Sliding window, HOG+SVM, region proposals, YOLO, Faster R-CNN, SSD, self-supervised learning concept
9. Object Tracking
   - Lectures 20-21
   - Tracking-by-detection, Kalman filter, IoU association, SORT, DeepSORT, ByteTrack, MOT metrics
10. Advances in Computer Vision
   - Lectures 22-24
   - Autonomous driving, medical vision, robotics vision, surveillance analytics, agricultural vision, emerging frontiers

Important numbering note:

- The official CSE445 outline skips Module 8. Preserve this numbering unless the course outline is revised.

## Main Topic Page Content

### Home Page

Hero:

- Background image: `Homepage_hero_banner2.png`
- Overlay: dark navy linear gradient
- Eyebrow: Computer Vision Learning Platform
- H1: Open Segmentation Lab
- Summary: Free computer vision tutorials and EWU course materials covering segmentation, object detection, tracking, self-supervised learning, datasets, metrics, and research paper reading.
- Primary CTA: Browse Topics
- Secondary CTA: Computer Vision Course

Home page sections:

- Courses at East West University
- Computer vision topics
- Evaluation and resources
- Featured topic cards

### Tutorial Pages

The tutorial pages are long-form educational pages and should use:

- `PageHero`
- Two-column page grid where needed
- Formula boxes
- Callouts and notes
- Code panels
- Image cards
- Tables for comparisons
- Wizard/tab interactions for multi-step learning

Pages:

- Semantic Segmentation
- Instance Segmentation
- Panoptic Segmentation
- Self-Supervised Segmentation

### Playground Page

Interactive browser-only tools:

- Segmentation task simulator on canvas
- Toggle semantic, instance, panoptic modes
- Scene selection: urban street, microscopy cell field, agricultural field
- Uncertainty slider
- Layer toggles: source image, mask, boundaries, labels
- Legend and summary
- IoU calculator
- Dice calculator
- Segmentation profile selector
- Mask overlay demo

In Next.js:

- Implement simulator as a client component.
- Keep canvas rendering logic client-side.
- Use accessible labels and live regions for result outputs.

### Metrics Page

Content should include:

- IoU
- Dice score
- Pixel accuracy
- Mean IoU
- Mask AP
- Panoptic Quality
- Interactive IoU and Dice calculators

### Resources

Datasets page:

- segmentation datasets
- medical, street scene, agriculture, general CV datasets
- dataset selection notes

Papers page:

- timeline of segmentation model evolution
- recommended readings
- paper reading workflow

Blog page:

- category filter
- article cards

About page:

- project mission
- instructor profile
- contact details

## Interactive Behavior To Preserve

The static site currently uses `js/main.js`. In Next.js, split these into client components:

- Mobile navigation toggle
- Dropdown nav toggles
- Smooth in-page scrolling
- Active nav state based on route
- Code tab panels
- Tutorial wizards with tabbed panels
- Model selector tabs
- Playground canvas simulator
- IoU and Dice calculators
- Segmentation profile selector
- Mask overlay toggle demo
- Blog category filter

Accessibility expectations:

- Use semantic landmarks: `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`.
- Preserve skip link.
- Dropdown buttons need `aria-expanded`.
- Tab controls need `role="tablist"`, `role="tab"`, `role="tabpanel"`, and `aria-selected`.
- Calculator outputs should use `aria-live="polite"`.
- Canvas needs accessible label and textual caption.

## Styling Guidance For Next.js

Recommended approach:

- Use global CSS tokens in `app/globals.css`.
- Use CSS Modules or plain component classes for components.
- Avoid introducing a heavy UI framework unless needed.
- Use `next/image` for images in `public/images`.
- Use App Router metadata exports for page title and description.
- Generate sitemap from route data or keep `app/sitemap.ts`.

Responsive breakpoints:

- Desktop: multi-column grids
- Tablet under 980px: 2-column course snapshots, module zones collapse
- Mobile under 640px: 1-column cards and module actions

Component layout details:

`ModuleZone`:

- Grid columns on desktop:
  - module number
  - content
  - actions
- Minimum height around 260px
- White surface
- Border and soft shadow
- Left accent border 7px teal
- Alternate rows can use a light callout gradient and primary left border

`ModulePage`:

- Page hero
- SiteTrail below header
- Main content grid: article plus sticky sidebar
- Lecture list
- Infographic steps
- Scenario grid

`SiteTrail`:

- Sticky below primary header on desktop
- Dark navy background
- Teal bottom border
- Brand mark: course code
- Links and badge actions
- Static layout on small mobile

## Data Model Suggestions

Use data-driven pages for courses:

```ts
export type CourseModule = {
  number: string;
  slug: string;
  title: string;
  summary: string;
  outcomes: string[];
  lectures: {
    title: string;
    description: string;
  }[];
  labs?: string[];
  badges: string[];
  keyTerms: string[];
  infograph: {
    node: string;
    title: string;
    description: string;
  }[];
  scenarios: {
    title: string;
    prompt: string;
  }[];
};
```

Use route generation:

```ts
export function generateStaticParams() {
  return courseModules.map((module) => ({ slug: module.slug }));
}
```

## Migration Priorities

1. Recreate visual design tokens and layout primitives.
2. Build shared navigation, footer, hero, card, badge, button components.
3. Convert CSE438 and CSE445 data into structured arrays.
4. Build course overview pages from data.
5. Build module detail pages from dynamic routes.
6. Convert interactive pages into client components.
7. Move images into `public/images`.
8. Add metadata and sitemap generation.
9. Verify mobile nav, dropdowns, and interactive widgets.
10. Run accessibility and responsive checks.

## Ready-To-Use Prompt

Use this prompt to ask a coding agent or LLM to build the Next.js version:

```text
You are building a Next.js App Router version of an existing static academic website called Open Segmentation Lab. Recreate the same design language, content hierarchy, and course structure using TypeScript, reusable components, and data-driven routes.

Use the following design identity:
- Academic computer vision learning platform.
- Navy and teal brand palette.
- Clean white/light gray surfaces, soft shadows, 8px card radius.
- Sticky primary navigation with dropdown groups.
- Dark notebook-style secondary navigation on course module pages.
- Inner page heroes with light gradient/callout backgrounds.
- Home hero uses a real image background with dark navy overlay.
- No marketing-style landing page fluff. The first screen should communicate the real learning platform and courses.

Use these color tokens:
--color-primary: #123a63;
--color-primary-dark: #0b2744;
--color-accent: #2f8f8a;
--color-accent-soft: #dff2f0;
--color-bg: #f8fafc;
--color-surface: #ffffff;
--color-text: #26313d;
--color-muted: #617080;
--color-border: #d9e2ec;
--color-callout: #eef5fb;
--color-code-bg: #102033;
--color-code-text: #eef6ff;
--color-warning: #8a5a12;
--color-warning-bg: #fff6df;

Build these reusable components:
- SiteHeader
- SiteFooter
- PageHero
- HomeHero
- SectionTitle
- Card
- Badge
- Button
- CourseSnapshot
- ModuleZone
- SiteTrail
- Infograph
- ScenarioGrid
- LectureList
- NotebookCard

Create these routes:
- /
- /semantic
- /instance
- /panoptic
- /object-detection
- /tracking
- /ssl-segmentation
- /metrics
- /papers
- /datasets
- /playground
- /blog
- /about
- /courses/cse438-dip
- /courses/cse438-dip/[slug]
- /courses/cse445-cv
- /courses/cse445-cv/[slug]

For CSE438, create modules:
1. DIP Foundations and Image Representation
2. Gray-Level Transformations and Histogram Processing
3. Spatial Filtering and Derivative Operators
4. Transforms, Compression and Frequency Processing
5. Image Restoration and Noise Modeling
6. Segmentation, Feature Extraction and Color Processing
7. Morphological Operations and Object Recognition

For CSE445, create modules:
1. Introduction to Computer Vision
2. Feature Detection and Description
3. Camera Models and Projection Geometry
4. Feature Matching and Geometric Verification
5. Multiple View Geometry
6. Motion Analysis
7. Object Detection and Recognition
9. Object Tracking
10. Advances in Computer Vision

Important: preserve the CSE445 numbering because the official course outline skips Module 8.

Each course overview page must have:
- PageHero
- Course snapshot cards
- Course objective
- Course outcomes
- Assessment map
- One full-width ModuleZone per module
- Lab track section
- Teaching materials/software section

Each course module page must have:
- SiteHeader
- SiteTrail secondary nav like notebook pages
- PageHero
- Lecture focus section
- Infographic section using numbered steps
- Scenario driven exploration section
- Sticky sidebar with key terms

Preserve the core website content:
- Open Segmentation Lab is a free academic site for computer vision, segmentation, detection, tracking, datasets, metrics, papers, and EWU course materials.
- Include CSE438 Digital Image Processing and CSE445 Computer Vision.
- Include notebook cards for the CSE438 concrete crack segmentation notebooks: U-Net, DeepLabV3, SegFormer.
- Include footer contact for Mohammad Rifat Ahmmad Rashid, Associate Professor, Department of CSE, East West University, Dhaka 1212, Bangladesh, rifat.rashid@ewubd.edu.

Interactive client components to implement or preserve:
- Mobile nav toggle
- Dropdown navigation
- Code tabs
- Tutorial wizard tabs
- Playground canvas simulator
- IoU calculator
- Dice calculator
- Segmentation profile selector
- Blog category filtering

Use semantic HTML and accessibility attributes:
- Keep skip link.
- Use header, nav, main, section, article, aside, footer.
- Use aria-expanded for dropdown buttons.
- Use aria-live for calculator results.
- Use tablist/tab/tabpanel roles for tabbed content.

Use data-driven content rather than hardcoding every course module directly in page JSX. Put course data in data/courses.ts and render overview pages and module pages from that data.

Do not invent a new visual identity. Recreate the current Open Segmentation Lab style faithfully while improving maintainability for Next.js.
```

## Notes For Future Cleanup

- The current static site still contains `https://example.com` in sitemap, canonical links, and Open Graph URLs. Replace with the real production domain during migration.
- The static CSS has accumulated repeated sections. In Next.js, consolidate these into tokens and component styles.
- Convert repeated page header/footer HTML into components.
- Keep the current content but move course modules and resource cards into typed data files.
