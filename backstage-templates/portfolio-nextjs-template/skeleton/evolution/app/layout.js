import './globals.css';
import { profile } from './data';

export const metadata = { title: profile.fullName + ' | Portfolio' };

const themeScript =
  "try{var t=localStorage.getItem('theme');if(t){document.documentElement.dataset.theme=t}else if(window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.dataset.theme='dark'}}catch(e){}";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
