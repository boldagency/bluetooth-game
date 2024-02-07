import localFont from 'next/font/local';
import cx from 'classnames';
import '../../styles/globals.scss';

const samsungFont = localFont(
  {
    src: [
      { path: '../assets/fonts/samsung-font/Samsung Sharp Sans Regular Regular.ttf', style: 'normal', weight: '400' },
      { path: '../assets/fonts/samsung-font/Samsung Sharp Sans Medium Regular.ttf', style: 'normal', weight: '600' },
      { path: '../assets/fonts/samsung-font/Samsung Sharp Sans Medium Regular.ttf', style: 'normal', weight: '700' },
    ],
    variable: '--samsung-font'
  }
)
const digitalFont = localFont(
  {
    src: [
      { path: '../assets/fonts/digital-font/digital-7.ttf', style: 'normal', weight: '400' },
      { path: '../assets/fonts/digital-font/digital-7 (italic).ttf', style: 'italic', weight: '400' },
    ],
    variable: '--digital-font'
  }
)

export const metadata = {
  title: "SAMSUNG",
  description: "bluetooth game",
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cx(samsungFont.variable, digitalFont.variable)}>{children}</body>
    </html>
  );
}
