# Release Guide

## Version Bumps

### Patch Release (0.1.0 → 0.1.1)
```bash
git commit -m "fix: resolve login timeout issue"
```

### Minor Release (0.1.0 → 0.2.0)
```bash
git commit -m "feat: add user authentication"
```

### Major Release (0.1.0 → 1.0.0)
```bash
git commit -m "feat!: remove deprecated API endpoints"
```

## Commit Types

| Type | Version | When to Use |
|------|---------|-------------|
| `fix` | Patch | Bug fixes, minor improvements |
| `feat` | Minor | New features |
| `feat!` | Major | Breaking changes |
| `perf` | Minor | Performance improvements |
| `chore` | None | Maintenance, dependencies |

## Examples

```bash
# Patch
fix: resolve authentication timeout

# Minor
feat: add user profile upload
perf: optimize database queries

# Major
feat!: remove old authentication system

# No release
chore: update dependencies
docs: update README
```

**Note**: `perf` creates minor versions. Use `fix` for minor improvements.
