import './globals.css';
import { profile } from './data';

export const metadata = { title: profile.fullName + ' | Portfolio' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
