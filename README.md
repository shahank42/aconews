# aconews - Never miss a beat

aconews is a modern news aggregator built with Next.js, React, and Tailwind CSS. It provides users with a seamless experience to stay updated on the latest news across various categories.

## Features

- Responsive design for desktop and mobile devices
- Dynamic news fetching from multiple sources
- Advanced search functionality with filters
- Customizable user interface with light and dark modes
- Efficient performance with server-side rendering

## Tech Stack

- Next.js
- React
- Tailwind CSS
- TypeScript
- shadcn/ui
- Tanstack Query

## Getting Started

1. Clone the client-side repository:
   ```
   git clone https://github.com/shahank42/aconews.git
   ```

2. Install dependencies:
   ```
   cd aconews
   bun install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add:
   ```
   NEXT_PUBLIC_BACKEND_URL=http://localhost:8787
   ```

4. Run the development server:
   ```
   bun run dev
   ```

5. Clone the backend-repository:
   ```
   cd ..
   git clone https://github.com/shahank42/aconews-backend
   ```

6. Install dependencies:
   ```
   cd aconews-backend
   bun install
   ```
7. Set up environment variables:
   Create a `.dev.vars` file in the root directory and add:
   ```
   GNEWS_API_KEY=<YOUR_API_KEY>
   ```
8. Run the development server:
   ```
   bun run dev
   ```
9. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
