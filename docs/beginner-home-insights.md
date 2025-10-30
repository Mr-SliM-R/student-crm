---
title: Student CRM — Home & Insights Walkthrough
paginate: true
size: A4
---

# Welcome!

This guide breaks down how the **Home** screen and the **Insights window** (stats dashboard) work together in the Student CRM project. We'll use plain language so you can explain it easily to students who are new to Angular.

---

# 1. What are these screens?

- **Home** is where teachers add students and flip their active/inactive status.
- **Insights** is a dashboard that reads the same list of students and turns it into totals, charts, and filters.
- Both pages live inside one Angular app, so switching between them does **not** reload the browser.

> Think of Home as the "data entry" room and Insights as the "summary" room that always peeks at the same notebook.

---

# 2. Shared toolbox

| Item | Where to find it | Why it matters |
| --- | --- | --- |
| Router links | `src/app/app.component.html` | Links labelled **Home** and **Insights** move between pages without leaving the single-page app. |
| Student service | `src/app/core/student.service.ts` | Stores every student in memory and offers `list()`, `add()`, and `toggleActive()` helper methods. |
| Home component | `src/app/home/home.component.ts` + `.html` | Calls the service to show and change students. |
| Stats component | `src/app/students/student-stats/student-stats.component.ts` + `.html` | Reads from the service, groups the data, and shows the dashboard UI. |

---

# 3. Navigation flow

1. Inside the header, the link `<a routerLink="/students/stats">Insights</a>` tells Angular to swap the page content.
2. Angular looks in `AppRoutingModule` and sees that `/students/stats` should load `StudentStatsComponent`.
3. The router outlet switches to the stats component instantly. No refresh, no data loss.
4. The **Back to Home** button is simply `routerLink="/"`, so students can jump back with one click.

> Tip: Because routing happens in the browser, any typed form values on Home stay put until you leave the page on purpose.

---

# 4. Home in slow motion

1. `HomeComponent` runs `ngOnInit()` → calls `studentService.list()` → stores that array in `this.students`.
2. When the **Add Student** form fires its `(create)` output, `onCreate()` sends the payload to `studentService.add()`.
3. The service returns an updated array. Home replaces `this.students` so the new person shows up immediately.
4. Toggling a student button calls `studentService.toggleActive(id)`, which flips the `active` flag and returns the fresh list again.

Students only need to remember: *"Home always asks the service to do the work, then grabs the updated list."*

---

# 5. Insights in slow motion

1. `StudentStatsComponent` also calls `studentService.list()` when it loads.
2. It runs a helper named `recomputeStats()` that counts:
   - total students
   - active vs. inactive
   - how many students are in each track
3. It watches the router's query string for `?track=science` and keeps that value in `selectedTrack`.
4. The template shows filter chips. Clicking a chip calls `selectTrack(track)`, which updates the query string. The getter `filteredStudents` then returns only the matching students.

> Because filters live in the URL, bookmarking the page keeps the same selection when you come back.

---

# 6. Putting it together

```text
[Home] form submit → StudentService.add() → shared store updates
[Home] toggle active → StudentService.toggleActive() → shared store updates
Navigate to Insights → StudentService.list() → stats recompute from the same store
```

- There is **no special messaging** between Home and Insights. The service is the single source of truth.
- Every time you open Insights, it re-reads the student list, so any changes from Home appear instantly.

---

# 7. Classroom talking points

- Emphasise the role of the service: *"Both components borrow the same clipboard."*
- Show students how navigation is just `routerLink` attributes—no extra JavaScript is required.
- Highlight the benefit of query parameters: they are easy to share or bookmark.
- Encourage learners to trace data in the TypeScript files first, then peek at the HTML to see how the data is displayed.

---

# 8. Quick recap

1. Home and Insights are two components routed inside one Angular app.
2. Both rely on `StudentService`, which owns the student list.
3. Home changes the data; Insights reads and summarises it.
4. The router keeps navigation smooth and remembers filter state through query parameters.

You now have a beginner-friendly story that links the Home actions to the Insights dashboard. Happy teaching!

