# Profile Analysis Feature

Waypoint features a proprietary analysis engine that evaluates a student's profile against global college admission standards.

## 1. Scoring Algorithm
The scoring engine (`lib/utils/profile-strength.ts`) calculates a weighted score out of 100 based on six key categories:

| Category | Weight | Max Points | Factors |
|---|---|---|---|
| **Academic Performance** | 30% | 40 | GPA, Course Rigor (AP/IB/Honors), Course Breadth |
| **Standardized Testing** | 20% | 50 | Best SAT or ACT scores |
| **Extracurricular Activities** | 20% | 100 | Quantity, diversity of categories, and total hours |
| **Leadership Experience** | 10% | 100 | Specific roles (President, Captain) and leadership awards |
| **Awards & Honors** | 10% | 100 | Quantity and recognition level (School to International) |
| **Projects & Research** | 10% | 100 | Research, internships, and independent projects |

## 2. College Readiness Levels
Based on the overall score, the system assigns a readiness level:
- **Highly Competitive**: 85 - 100
- **Competitive**: 70 - 84
- **Developing**: 50 - 69
- **Needs Work / Early Development**: < 50

## 3. Counselor Overrides
Counselors have the authority to manually override the automated score (`app/api/counselor/profile-override/`).
- **Reasoning**: Counselors must provide a justification for the override.
- **Visibility**: The adjusted score is clearly marked as "Counselor Adjusted" in the student dashboard.
- **Audit**: All overrides are tracked with the name of the counselor and the timestamp.

## 4. Personalized Recommendations
The analysis page (`app/(dashboard)/student/analysis/`) provides a list of actionable strengths and weaknesses.
- **Strengths**: Categories where the student scores ≥ 80.
- **Weaknesses**: Categories where the student scores < 60.
- **Action Items**: Dynamic recommendations (e.g., "Join at least 3-5 meaningful extracurricular activities" or "Take more AP courses").

## Technical Implementation
- **Logic**: Centralized in `lib/utils/profile-analysis-detailed.ts`.
- **UI**: Uses the `ProgressBar` component and expandable detail sections for transparency.
- **Data**: Fetches all related student models (Activities, Transcripts, etc.) to ensure a holistic calculation.
