backend/
├── src/
│   ├── config/              # Configuration files
│   │   ├── db.config.ts     # Database configuration
│   │   ├── env.config.ts    # Environment variables
│   │   └── ...
│   │
│   ├── controllers/         # Route controllers
│   │   ├── notes.controller.ts
│   │   ├── grammar.controller.ts
│   │   ├── auth.controller.ts
│   │   └── ...
│   │
│   ├── middleware/          # Custom middleware
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── ...
│   │
│   ├── models/              # Database models
│   │   ├── note.model.ts
│   │   ├── user.model.ts
│   │   └── ...
│   │
│   ├── routes/              # Route definitions
│   │   ├── notes.routes.ts
│   │   ├── grammar.routes.ts
│   │   ├── auth.routes.ts
│   │   └── index.ts
│   │
│   ├── services/            # Business logic
│   │   ├── notes.service.ts
│   │   ├── grammar.service.ts
│   │   ├── auth.service.ts
│   │   └── ...
│   │
│   ├── utils/               # Utility functions
│   │   ├── apiError.ts
│   │   ├── apiResponse.ts
│   │   ├── markdownParser.ts
│   │   ├── grammarChecker.ts
│   │   └── ...
│   │
│   ├── validations/         # Request validations
│   │   ├── note.validations.ts
│   │   ├── user.validations.ts
│   │   └── ...
│   │
│   ├── app.ts               # Express app setup
│   └── server.ts            # Server startup
│
├── tests/                   # Test files
│   ├── unit/
│   └── integration/
│
├── .env                     # Environment variables
├── package.json
├── tsconfig.json
└── README.md