// This component is now a simple pass-through layout wrapper.
// Data fetching has been moved to the page component to resolve build errors.
export default function OrderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}
