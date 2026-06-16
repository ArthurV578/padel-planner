# Padel Planner — Netlify (flat layout)

index.html sits at the root, so the publish directory is "." — nothing to misconfigure.

## Deploy with Git (recommended — builds the function)
1. Push this whole folder to a GitHub repo.
2. Netlify > Add new project > Import an existing project > pick the repo.
3. Build command: leave empty. Publish directory: .  (root). Functions: netlify/functions (auto).
4. Deploy. Every push redeploys.

## Or deploy with the CLI
    npm i -g netlify-cli
    cd padel-flat
    netlify deploy --build --prod

The shared sign-ups go through /api/store into Netlify Blobs.
Do NOT use plain drag-and-drop: the @netlify/blobs function needs the build step.
