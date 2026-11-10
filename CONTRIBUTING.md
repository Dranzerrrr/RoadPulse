# Contributing to RoadPulse

Thank you for your interest in contributing to **RoadPulse**. This guide outlines our repository organization, branching strategy, commit conventions, and validation workflows.

---

## 🌳 Branching Model

- `main` / `master`: Production-ready code. Every commit here should be deployable.
- Feature branches: `feat/feature-name`, `fix/bug-fix-name`, `docs/documentation-update`.
- Open a Pull Request (PR) against `main` for all changes.

---

## 📝 Conventional Commits

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification. Each commit message must follow this structure:

```
<type>(<scope>): <short description>
```

### Allowed Types
- `feat`: A new user-facing feature or application capability.
- `fix`: A bug fix or layout correction.
- `docs`: Documentation updates (README, ADRs, concept plans).
- `chore`: Tooling, dependency, or configuration updates.
- `refactor`: Code restructuring without functional or visual changes.

### Examples
- `feat(landing): add physics-calibrated reaction timer to driver HUD`
- `fix(navbar): prevent navigation links from wrapping on medium displays`
- `docs(adr): record decision on zero-build static landing page`
- `chore(repo): update npm workspaces dependencies`

---

## 💻 Local Development Workflow

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the local landing page preview:
   ```bash
   npm run serve:landing
   ```
3. Run automated checks before submitting a PR:
   ```bash
   npm run validate
   npm run lint
   npm run format:check
   ```

---

## 🎨 Code Style

- **HTML:** Semantic tags (`<header>`, `<main>`, `<section>`, `<footer>`, `<aside>`). Explicit ARIA attributes on interactive tabs and accordions.
- **CSS:** Use design tokens from `packages/design-tokens/tokens.css`. Prefer CSS custom properties over hardcoded hex values.
- **JavaScript:** ES6+ modules. Clean separation of concerns. Avoid inline `onclick` attributes in HTML markup; bind events using `addEventListener`.
- **Formatting:** 2-space indentation, single quotes in JS, trailing semicolons. Run `npm run format` to automatically format.
