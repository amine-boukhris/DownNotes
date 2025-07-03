backend/
├── src/
│ ├── config/ # Configuration files
│ │ ├── db.config.ts # Database configuration
│ │ ├── env.config.ts # Environment variables
│ │ └── ...
│ │
│ ├── controllers/ # Route controllers
│ │ ├── notes.controller.ts
│ │ ├── grammar.controller.ts
│ │ ├── auth.controller.ts
│ │ └── ...
│ │
│ ├── middleware/ # Custom middleware
│ │ ├── auth.middleware.ts
│ │ ├── error.middleware.ts
│ │ └── ...
│ │
│ ├── models/ # Database models
│ │ ├── note.model.ts
│ │ ├── user.model.ts
│ │ └── ...
│ │
│ ├── routes/ # Route definitions
│ │ ├── notes.routes.ts
│ │ ├── grammar.routes.ts
│ │ ├── auth.routes.ts
│ │ └── index.ts
│ │
│ ├── services/ # Business logic
│ │ ├── notes.service.ts
│ │ ├── grammar.service.ts
│ │ ├── auth.service.ts
│ │ └── ...
│ │
│ ├── utils/ # Utility functions
│ │ ├── apiError.ts
│ │ ├── apiResponse.ts
│ │ ├── markdownParser.ts
│ │ ├── grammarChecker.ts
│ │ └── ...
│ │
│ ├── validations/ # Request validations
│ │ ├── note.validations.ts
│ │ ├── user.validations.ts
│ │ └── ...
│ │
│ ├── app.ts # Express app setup
│ └── server.ts # Server startup
│
├── tests/ # Test files
│ ├── unit/
│ └── integration/
│
├── .env # Environment variables
├── package.json
├── tsconfig.json
└── README.md


```ts
const cookies = [
'accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbWNuc283anAwMDAwdWl3bzJobzhudzV5IiwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiaWF0IjoxNzUxNTcxODc5LCJleHAiOjE3NTE1NzI3Nzl9._EzAyjPaBchLoTXvBLwkkS6SWUauxKJI9HGO_yhpMm4; Max-Age=900; Path=/; Expires=Thu, 03 Jul 2025 19:59:39 GMT; HttpOnly',
'refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbWNuc283anAwMDAwdWl3bzJobzhudzV5IiwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiaWF0IjoxNzUxNTcxODc5LCJleHAiOjE3NTIxNzY2Nzl9.TjuDAncczUdVZZpigK5JWeYCxAQtNXgOezKQOvAp8R8; Max-Age=604800; Path=/; Expires=Thu, 10 Jul 2025 19:44:39 GMT; HttpOnly'
]
```
