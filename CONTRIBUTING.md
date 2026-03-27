# Contributing to NEXUS OS

Thank you for your interest in contributing to NEXUS OS! This document provides guidelines for contributing.

## Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally
3. **Create** a new branch for your feature or fix
4. **Install** dependencies with `npm install`
5. **Make** your changes
6. **Test** your changes with `npm run lint` and `npm run build`
7. **Commit** your changes with a clear message
8. **Push** to your fork
9. **Submit** a Pull Request

## Development Setup

```bash
git clone https://github.com/YOUR_USERNAME/NEXUS-OS.git
cd NEXUS-OS
npm install
npm run dev
```

## Code Standards

- Use TypeScript for all new code
- Follow the existing code style and conventions
- Use shadcn/ui components where possible
- Use Tailwind CSS for styling (no arbitrary values)
- Use Lucide React for icons
- Add proper TypeScript types (avoid `any`)
- Write meaningful commit messages

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Test additions or modifications
- `chore:` Maintenance tasks

## Pull Request Process

1. Update the README.md if needed
2. Ensure all lint checks pass
3. Ensure the build succeeds
4. Request review from maintainers
5. Address review feedback promptly

## Reporting Issues

- Use the GitHub issue tracker
- Include steps to reproduce
- Include expected vs actual behavior
- Include screenshots if applicable
- Include browser/OS information

## Questions?

Feel free to open a discussion on GitHub or reach out to the maintainers.

Thank you for contributing!
