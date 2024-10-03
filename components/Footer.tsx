export function Footer() {
  return (
    <footer className="py-6 text-center text-sm text-[hsl(240,5%,64.9%)]">
      <p>&copy; {new Date().getFullYear()} PlexQueue. All rights reserved.</p>
      <p className="mt-2">Powered by David's insomnia and an unhealthy obsession with media servers.</p>
    </footer>
  )
}