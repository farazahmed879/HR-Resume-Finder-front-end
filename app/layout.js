import "./globals.css";

export const metadata = {
  title: "HR Resume Chatbot — AI-Powered Resume Matching",
  description:
    "Intelligent HR assistant that finds the most relevant resumes from your database using AI-powered natural language search. Upload, search, and discover top candidates effortlessly.",
  keywords: "HR, resume, chatbot, AI, recruitment, talent search",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
