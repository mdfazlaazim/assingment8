export function Footer() {
  return (
    <footer className="mt-16 border-t border-base-300 bg-base-200">
      <div className="page-wrap grid gap-8 py-10 md:grid-cols-2">
        <div>
          <h3 className="text-lg font-bold">BookNest Platform</h3>
          <p className="mt-2 text-sm opacity-80">
            Borrow books online and discover your next favorite read.
          </p>
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          <div className="flex items-center gap-3">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="link">
              Facebook
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="link">
              Twitter
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="link">
              LinkedIn
            </a>
          </div>
          <a href="mailto:contact@booknest.dev" className="link link-hover">
            Contact Us: contact@booknest.dev
          </a>
        </div>
      </div>
    </footer>
  );
}
