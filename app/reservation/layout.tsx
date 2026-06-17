export default function ReservationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout intentionally omits the global Navbar and Footer,
  // so the reservation page feels like a dedicated, immersive experience.
  return <>{children}</>;
}
