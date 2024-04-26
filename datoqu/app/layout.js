import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/features/authentication/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
      <html lang="en">  
        {/* <head>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" integrity="sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV" crossorigin="anonymous"></link>
        </head> */}
        <body className={inter.className}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </body>
        
      </html>
  );
}
