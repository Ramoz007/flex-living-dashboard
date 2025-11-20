# Property Dashboard – Documentation

## 1. Tech Stack

Frontend:

- Next.js 14 (React framework) – Server-side rendering and client-side interactivity.
- TypeScript – Strict typing across the codebase for better maintainability.
- Tailwind CSS + shadcn/ui – Modern styling with utility-first classes and prebuilt UI components.
- Lucide React – Icons for UI enhancements.
- Recharts – Data visualization (for property performance graphs).

State & Data Management:

- React hooks (useState, useEffect, useMemo) for local state.
- IndexedDB via utility functions for persistent client-side storage of private reviews.

Backend:

- Internal API services are mocked (Hostaway API simulation) – no production backend required for testing.
- JSON structured objects simulate review and property datasets.

## 2. Key Design and Logic Decisions

Dashboard Layout

- Panels: Property count, review count, average rating, top property, performance graph, and review table.
- Filters: Channel, category, rating, and time period filters applied globally to all panels.
- Shadcn/ui components used for tables, selects, switches, labels, badges, and other UI elements.

Reviews Management
- Reviews are stored per property and can be marked as private via a switch in the table.
- Private reviews are persisted in IndexedDB with a key-value map ({ [reviewId]: boolean }).
- The review table shows only public reviews (those not marked private).

Performance Calculations
- Average rating: Computed across all category ratings of public reviews.
- Top property: Determined by the highest average rating across all categories.
- Property performance graph: Visualizes each property’s average rating.

Data Normalization

- Reviews are linked to properties via NormalizedProperty objects.
- Each review contains categoryRatings for different metrics (cleanliness, communication, etc.).
- Data flattening and enrichment occur before filtering, so all panels can reference listingName and other property info.

## 3. API Behaviors

- Hostaway Mock API:
    - Returns a JSON dataset simulating property listings and reviews.
    - Properties contain multiple reviews with id, status, publicReview, categoryRatings, and submittedAt.

- IndexedDB Utility Functions:

    - setIndexedDatabaseItem, getIndexedDatabaseItem, removeIndexedDatabaseItem manage private review states.

    - Changes in private state are persisted automatically and reflected immediately in the dashboard.

- Filtering Logic:

    - Global dashboard filters are applied to reviews:

        - Channel – filters reviews by status.

        - Category – filters reviews that include the selected category.

        - Rating – filters reviews with any category rating greater than or equal to selected value.

        - Period – filters reviews within selected time window (week, month, year).

## 4. Google Reviews Findings

During exploration, we evaluated the feasibility of integrating Google Reviews using the Places API and Business Profile API:

1. Places API Limitations

    - Only returns up to 5 reviews per property.

    - Cannot provide full historical reviews.

    - Requires Google branding and attribution for any display.

    - Rate limits and potential API costs can become significant for many properties.

2. Business Profile API Limitations

    - Requires ownership of the Google-listed property.

    - Full access is only available to verified businesses.

    - Not feasible for dashboards displaying multiple external properties.

3. General Risks

    - Sampled reviews may be non-representative.

    - Storing reviews beyond allowed cache period would violate Google’s terms.

    - Integration would add extra complexity for minimal value.


<br>
<b> Conclusion: </b>
<br>
<br>

Google Reviews were not integrated due to API limitations, privacy concerns, sampling restrictions, and compliance requirements. Our dashboard relies on internal review data to ensure completeness, accuracy, and control over public/private visibility.

## 5. Running the Project

Local Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd <project-folder>
```


2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```


Open your browser at http://localhost:3000 to access the dashboard.

<b> Notes: </b>
<br>

- IndexedDB is used for persistent local state (private reviews). No backend persistence is required.
- Mocked API data can be found in api/hostaway/mockData/.
- Filters, review table, and graphs are fully interactive.