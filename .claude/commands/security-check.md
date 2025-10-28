---
description: Check project for security vulnerabilities
---

# Security Vulnerability Check

Please perform a comprehensive security audit of this project:

## Tasks to Complete

1. **Dependency Vulnerabilities**
   - Run `yarn audit` to check for known vulnerabilities in dependencies
   - Analyze the output and identify critical, high, moderate, and low severity issues
   - Check if any dependencies are outdated or deprecated
   - Provide recommendations for fixing vulnerabilities (upgrade versions, replace packages, etc.)

2. **Code Security Analysis**
   - Check for hardcoded secrets, API keys, or sensitive information in the codebase
   - Look for potential XSS vulnerabilities in React components
   - Check for unsafe use of `dangerouslySetInnerHTML`
   - Verify proper input validation in forms (currently using zod - confirm schemas are secure)
   - Check for SQL injection risks (if database queries exist)
   - Review authentication and authorization implementations (if any)

3. **Configuration Security**
   - Review environment variable usage and `.env` files
   - Check that sensitive files are properly excluded in `.gitignore`
   - Verify that no credentials are committed to the repository
   - Review CORS and security headers configuration (if applicable)

4. **Dependencies Review**
   - Check `package.json` for any suspicious or unnecessary packages
   - Verify all dependencies are from trusted sources
   - Look for packages with known security issues or minimal maintenance

5. **Build & Runtime Security**
   - Review Vite configuration for security best practices
   - Check for any unsafe build configurations
   - Verify that source maps are not exposed in production

## Output Format

Please provide:

1. **Summary**: Overall security status (Critical/High/Medium/Low risk)
2. **Vulnerabilities Found**: List of issues with severity levels
3. **Immediate Actions**: Critical fixes needed right away
4. **Recommendations**: Suggested improvements and best practices
5. **Commands to Fix**: Specific commands to resolve vulnerabilities

## Instructions

- Be thorough but practical
- Prioritize findings by severity
- Provide actionable remediation steps
- Include code examples for fixes where applicable
- Don't flag false positives from dev dependencies unless they pose real risk
