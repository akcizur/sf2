import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="px-4 pt-12 pb-6 md:px-6">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-4 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <Link to="/" className="text-sm font-semibold text-foreground transition hover:text-primary">
          Maison Terre
        </Link>
        <p>© {new Date().getFullYear()} Maison Terre. All rights reserved.</p>
      </div>
    </footer>
  );
}
