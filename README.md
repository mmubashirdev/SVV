# SVV Software Verification, Validation & SQA Learning Roadmap

This repository is for learning **Software Verification and Validation (SVV)** and **Software Quality Assurance (SQA)** with an industry focused approach.

## Core Course Perspective

- **Software Verification:** *Are we building the product right?*
- **Software Validation:** *Are we building the right product?*
- **SQA:** Practices, processes, and tools that ensure software quality throughout development.

---

## Recommended Industry V&V Stack

| Area | Tools / Technologies | 
| --- | --- |
| API testing | Postman, Newman | 
| Unit testing | Jest / Vitest | 
| Backend/API integration testing | Supertest | 
| E2E & browser testing | Playwright | 
| Bug tracking | Jira | 
| Static analysis | ESLint, TypeScript | 
| Code quality | SonarQube | 
| Code coverage | Istanbul / c8 | 
| Performance testing | k6 |
| CI/CD | GitHub Actions | 
| Security testing | OWASP ZAP | 
| Database testing | PostgreSQL + SQL | 
| Version control | Git / GitHub | 
| Test documentation | Markdown + Jira/TestRail | 

---

## Primary Learning Focus

1. **Playwright** (modern E2E + browser automation)
2. **Jest/Vitest** (unit testing fundamentals using AAA: Arrange, Act, Assert)
3. **Supertest** (backend/integration testing for Node/Express APIs)
4. **Postman + Newman** (collection-driven API testing in CI)
5. **GitHub Actions** (automated verification pipeline on every push)
6. **k6** (load/performance testing)
7. **SonarQube** (code quality and maintainability signals)
8. **OWASP ZAP** (intro-level application security testing)
9. **Jira** (defect lifecycle and professional bug reporting)

---

### Learning Order

## Fundamentals

V&V concepts → testing levels → test cases → test design techniques → defect management

## JavaScript/TypeScript Testing Stack

Vitest/Jest → Supertest → Postman → Newman

## Real Application Testing

Playwright → E2E workflows → fixtures/test data → mocking → regression suites

## Engineering Quality

ESLint → TypeScript strictness → SonarQube → coverage metrics

# Professional Workflow

GitHub → GitHub Actions → automated test pipeline

## Advanced Topics

k6 → OWASP ZAP → Docker-based testing → environment strategy

---

## Test Design Techniques to Learn (Tool-Independent)

- Equivalence Partitioning
- Boundary Value Analysis
- Decision Tables
- State Transition Testing

These are essential because tools change, but test design thinking remains valuable across projects.


- Quality pipeline:
  - Unit tests (Jest/Vitest)
  - API/integration tests (Supertest/Postman)
  - E2E tests (Playwright)
  - CI automation (GitHub Actions)
  - Quality and performance checks (ESLint, SonarQube, k6)
