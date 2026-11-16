# Technical documentation

## Architecture

Backstage (Fedora, localhost:3000) -> Scaffolder -> GitHub repo Hedi-AM/portfolio-nextjs -> GitHub Actions -> Docker Hub (hediam/portfolio-nextjs) -> Watchtower on the VM (192.168.122.180) -> container on port 3005.

## Backstage templates (in the Backstage app, folder `templates/`)

- `portfolio-nextjs-template`: form (name, title, bio, skills, certifications, DevOps projects, repo, Docker Hub user and token). Steps: `fetch:template` (generates the project and Docker artifacts), `publish:github` (creates the repo, pushes the code, creates the secrets DOCKERHUB_USERNAME and DOCKERHUB_TOKEN), `catalog:register` (registers catalog-info.yaml).
- `portfolio-redeploy`: form (repo, version, apply evolution). Step: `github:actions:dispatch` triggers the workflow `ci-cd.yml`.

## Generated files

- `app/`: Next.js App Router portfolio, `app/api/health` returns status and deployed version.
- `Dockerfile`: multi-stage build, standalone output, HEALTHCHECK on /api/health.
- `.dockerignore`, `docker-compose.yml`.
- `.github/workflows/ci-cd.yml`: pipeline.
- `evolution/app/`: v2 version of the app (Certifications, Projets DevOps & Cloud, Dark Mode, updated title).
- `catalog-info.yaml`: catalog metadata, GitHub slug, links.

## Pipeline

1. Trigger: push on main, or `workflow_dispatch` from Backstage (inputs: version, evolve).
2. If evolve = yes, the pipeline copies `evolution/app` over `app` and commits to main.
3. Version: the version typed in Backstage (v2, v1.1, ...); on push it is v1 for the first run, then v1.<run number>.
4. Build the image with buildx, log in to Docker Hub with the repo secrets, push `<version>` and `latest`.

## Deployment (VM)

`docker-compose.yml` runs two containers on the VM: `portfolio-nextjs` (port 3005 to 3000, Docker healthcheck) and `portfolio-watchtower`, which polls Docker Hub every 30 seconds and only updates containers labelled `com.centurylinklabs.watchtower.enable=true`. Other containers on the VM are not touched.

## Versioning

First successful build was tagged v1.2 (v1 run failed on empty secrets and was re-run). The evolution is released as v2. `latest` always points to the last build.

## Known limits

- The GitHub self-hosted runner cannot run on the Alpine VM (needs glibc), so the deploy is done by Watchtower instead of a deploy job.
- The first deployment of the compose file on the VM was bootstrapped once with `docker compose up -d`. Later versions are deployed automatically.
- Port 3005 is used instead of 3000 because 3000 is already used on the VM.
