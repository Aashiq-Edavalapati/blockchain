# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Container build

This repo now includes a production Docker image for the Vite app.

Build locally:

```bash
docker build -t consensus .
docker run --rm -p 8080:8080 consensus
```

## Google Cloud deploy without YAML

Use Google Cloud Run's source deploy flow, which reads the `Dockerfile` automatically:

1. Push this repo to GitHub or another Git provider connected to Google Cloud.
2. In Google Cloud Console, open Cloud Run and choose `Deploy from source`.
3. Select this repository and branch.
4. Let Google create the Cloud Build and Cloud Run pipeline from the source checkout.
5. Future pushes to the watched branch will trigger redeploys through the same managed pipeline.

If you prefer the CLI, this also uses the Dockerfile automatically:

```bash
gcloud run deploy consensus --source . --region YOUR_REGION --allow-unauthenticated
```
