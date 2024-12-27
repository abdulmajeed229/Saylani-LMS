import AdminHeader from "../components/adminHeader";

export default function RootLayout({
  
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <body>
            <AdminHeader/>
          {children}
        </body>
      </html>
    );
  }
  