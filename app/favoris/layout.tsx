

export default function FavorisLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="wrappermx-auto px-4 sm:px-6 lg:px-8 py-8">
      {children}
    </div>
  );
}
