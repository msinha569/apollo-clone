import Header from "@/components/Header";
import "./globals.css";
import { SearchContext, SearchContextProvider } from "@/context/useSearch";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <SearchContextProvider>
        <Header/>
        {children}
        </SearchContextProvider>
      </body>
    </html>
  );
}
