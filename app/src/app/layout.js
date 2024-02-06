import '../../styles/globals.scss';

export const metadata = {
  title: "SAMSUNG",
  description: "bluetooth game",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
