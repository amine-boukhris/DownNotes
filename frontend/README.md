frontend/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── assets/              # Static assets
│       ├── images/
│       └── fonts/
│
├── src/
│   ├── api/                 # API service definitions
│   │   ├── notesApi.ts
│   │   ├── grammarApi.ts
│   │   └── index.ts
│   │
│   ├── assets/              # Frontend assets
│   │   ├── images/
│   │   ├── icons/           # SVG icons
│   │   └── styles/          # Global styles
│   │       └── global.css
│   │
│   ├── components/          # Reusable UI components
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   └── ...
│   │   ├── notes/
│   │   │   ├── MarkdownEditor.tsx
│   │   │   ├── MarkdownPreview.tsx
│   │   │   └── ...
│   │   └── ui/
│   │       ├── Header.tsx
│   │       ├── Sidebar.tsx
│   │       └── ...
│   │
│   ├── context/             # React contexts
│   │   ├── AuthContext.tsx
│   │   └── NotesContext.tsx
│   │
│   ├── hooks/               # Custom hooks
│   │   ├── useNotes.ts
│   │   └── useGrammarCheck.ts
│   │
│   ├── pages/               # Page components
│   │   ├── HomePage.tsx
│   │   ├── NotePage.tsx
│   │   ├── CreateNotePage.tsx
│   │   ├── EditNotePage.tsx
│   │   └── ...
│   │
│   ├── routes/              # Routing configuration
│   │   ├── AppRoutes.tsx
│   │   └── PrivateRoute.tsx
│   │
│   ├── store/               # State management (if using Redux)
│   │   ├── slices/
│   │   └── store.ts
│   │
│   ├── types/               # TypeScript types
│   │   ├── note.ts
│   │   ├── user.ts
│   │   └── index.ts
│   │
│   ├── utils/               # Utility functions
│   │   ├── markdownUtils.ts
│   │   ├── grammarUtils.ts
│   │   └── ...
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts        # Vite type definitions
│
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md