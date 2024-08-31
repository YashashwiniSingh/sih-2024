import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from '../components/NavBar';

export const metadata = {
  title: 'UIDAI',
  description: 'Aadhar Services',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <div className="pt-16">{children}</div>
      </body>
    </html>
  );
}