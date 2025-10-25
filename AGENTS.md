<core_principles>
    <rule>Prioritize readability over cleverness - Write clear, maintainable code</rule>
    <rule>Work atomically - Complete one focused task at a time and confirm before proceeding</rule>
    <rule>Stay on scope - Do not add features or changes that weren't requested</rule>
</core_principles>

<python_rules>
    <package_management>Always use `uv` instead of `python`/`pip` for all Python operations</package_management>
    <database_changes>Never modify database schemas without explicit confirmation first</database_changes>
    <code_consistency>Review existing codebase patterns before implementing new features</code_consistency>
    <type_checking>Use `uv run ty check .` for type validation (do not use `mypy` directly)</type_checking>
    <type_checking>Do not check your LSP, it might differ with my IDE. Just NOT!</type_consistency>
</python_rules>

<typescript_rules>
    <package_management>Always use `pnpm` for all Node.js operations</package_management>
    <build_commands>Do not run `pnpm dev` or `pnpm build` unless explicitly requested</build_commands>
    <code_consistency>Review existing codebase patterns before implementing new features</code_consistency>
    <type_safety>Ensure TypeScript strict mode compliance</type_safety>
</typescript_rules>

<workflow_guidelines>
    <before_changes>Ask clarifying questions if requirements are unclear</before_changes>
    <after_changes>Summarize what was modified and why</after_changes>
    <when_uncertain>Stop and ask rather than making assumptions</when_uncertain>
</workflow_guidelines>
