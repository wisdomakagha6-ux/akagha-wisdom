export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
      .roll { display: inline-flex; white-space: nowrap; line-height: 1; }
      .roll__char { position: relative; display: inline-block; overflow: hidden; height: 1em; }
      .roll__glyph { display: block; transform: translate3d(0, 0, 0); opacity: 1; transition: transform 0.34s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.24s cubic-bezier(0.22, 1, 0.36, 1); transition-delay: var(--d, 0s); }
      .roll__next { position: absolute; inset: 0; transform: translate3d(0, 105%, 0); opacity: 0.72; }
      .secondary:hover .roll__current, .secondary:focus-visible .roll__current { transform: translate3d(0, -105%, 0); opacity: 0.72; }
      .secondary:hover .roll__next, .secondary:focus-visible .roll__next { transform: translate3d(0, 0, 0); opacity: 1; }
      @media (prefers-reduced-motion: reduce) { .roll__glyph { transition: none; } .secondary:hover .roll__current, .secondary:focus-visible .roll__current, .secondary:hover .roll__next, .secondary:focus-visible .roll__next { transform: none; opacity: 1; } }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/" aria-label="Go home">
          <span class="roll" aria-hidden="true">
            <span class="roll__char" style="--d:0s"><span class="roll__glyph roll__current">G</span><span class="roll__glyph roll__next">G</span></span>
            <span class="roll__char" style="--d:0.012s"><span class="roll__glyph roll__current">o</span><span class="roll__glyph roll__next">o</span></span>
            <span class="roll__char" style="--d:0.024s"><span class="roll__glyph roll__current">&nbsp;</span><span class="roll__glyph roll__next">&nbsp;</span></span>
            <span class="roll__char" style="--d:0.036s"><span class="roll__glyph roll__current">h</span><span class="roll__glyph roll__next">h</span></span>
            <span class="roll__char" style="--d:0.048s"><span class="roll__glyph roll__current">o</span><span class="roll__glyph roll__next">o</span></span>
            <span class="roll__char" style="--d:0.06s"><span class="roll__glyph roll__current">m</span><span class="roll__glyph roll__next">m</span></span>
            <span class="roll__char" style="--d:0.072s"><span class="roll__glyph roll__current">e</span><span class="roll__glyph roll__next">e</span></span>
          </span>
        </a>
      </div>
    </div>
  </body>
</html>`;
}
