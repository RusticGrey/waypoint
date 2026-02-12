#!/bin/bash

# Waypoint College Counseling - Automated Casing Fix Script
# Fixes PascalCase relations → camelCase and snake_case fields → camelCase

set -e

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║     Waypoint College Counseling - Casing Fix Script           ║"
echo "║     Converts PascalCase relations & snake_case fields         ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -d "app" ] || [ ! -d "lib" ]; then
    echo -e "${RED}Error: Must run from project root (containing app/ and lib/)${NC}"
    exit 1
fi

# Create backup
echo -e "${BLUE}Step 1: Creating backup...${NC}"
timestamp=$(date +%Y%m%d_%H%M%S)
backup_dir="backup_${timestamp}"
mkdir -p "$backup_dir"
cp -r app "$backup_dir/" 2>/dev/null || true
cp -r lib "$backup_dir/" 2>/dev/null || true
cp -r components "$backup_dir/" 2>/dev/null || true
echo -e "${GREEN}✓ Backup created in $backup_dir/${NC}"
echo ""

# Function to fix a file
fix_file() {
    local file="$1"
    
    # Skip if file doesn't exist
    [ ! -f "$file" ] && return
    
    # Create temp file
    temp_file="${file}.tmp"
    
    # Apply all fixes
    sed \
        -e 's/PersonalProfile: true/personalProfile: true/g' \
        -e 's/AcademicProfile: true/academicProfile: true/g' \
        -e 's/User: true/user: true/g' \
        -e 's/Student: true/student: true/g' \
        -e 's/Coordinator: true/coordinator: true/g' \
        -e 's/Activity: true/activities: true/g' \
        -e 's/Achievement: true/achievements: true/g' \
        -e 's/Transcript: true/transcripts: true/g' \
        -e 's/ProjectExperience: true/projectExperiences: true/g' \
        -e 's/TestScore: true/testScores: true/g' \
        -e 's/TargetCollege: true/targetColleges: true/g' \
        -e 's/CollegeApplication: true/collegeApplications: true/g' \
        -e 's/Meeting: true/meetings: true/g' \
        -e 's/ProfileGoal: true/profileGoals: true/g' \
        -e 's/ProfileOverride: true/profileOverride: true/g' \
        -e 's/ChangeLog: true/changeLogs: true/g' \
        -e 's/College: true/college: true/g' \
        -e 's/\.PersonalProfile/.personalProfile/g' \
        -e 's/\.AcademicProfile/.academicProfile/g' \
        -e 's/\.User/.user/g' \
        -e 's/\.Student/.student/g' \
        -e 's/\.Coordinator/.coordinator/g' \
        -e 's/\.Activity/.activities/g' \
        -e 's/\.Achievement/.achievements/g' \
        -e 's/\.Transcript/.transcripts/g' \
        -e 's/\.ProjectExperience/.projectExperiences/g' \
        -e 's/\.TestScore/.testScores/g' \
        -e 's/\.TargetCollege/.targetColleges/g' \
        -e 's/\.CollegeApplication/.collegeApplications/g' \
        -e 's/\.Meeting/.meetings/g' \
        -e 's/\.ProfileGoal/.profileGoals/g' \
        -e 's/\.ProfileOverride/.profileOverride/g' \
        -e 's/\.ChangeLog/.changeLogs/g' \
        -e 's/\.first_name/.firstName/g' \
        -e 's/\.last_name/.lastName/g' \
        -e 's/\.password_hash/.passwordHash/g' \
        -e 's/\.organization_id/.organizationId/g' \
        -e 's/\.created_at/.createdAt/g' \
        -e 's/\.updated_at/.updatedAt/g' \
        -e 's/\.user_id/.userId/g' \
        -e 's/\.graduation_year/.graduationYear/g' \
        -e 's/\.current_grade/.currentGrade/g' \
        -e 's/\.coordinator_id/.coordinatorId/g' \
        -e 's/\.primary_coordinator_id/.primaryCoordinatorId/g' \
        -e 's/\.profile_completion_pct/.profileCompletionPct/g' \
        -e 's/\.student_id/.studentId/g' \
        -e 's/\.preferred_name/.preferredName/g' \
        -e 's/\.date_of_birth/.dateOfBirth/g' \
        -e 's/\.current_school/.currentSchool/g' \
        -e 's/\.school_location/.schoolLocation/g' \
        -e 's/\.parent_name/.parentName/g' \
        -e 's/\.parent_email/.parentEmail/g' \
        -e 's/\.parent_phone/.parentPhone/g' \
        -e 's/\.curriculum_type/.curriculumType/g' \
        -e 's/\.grading_system_type/.gradingSystemType/g' \
        -e 's/\.current_gpa/.currentGpa/g' \
        -e 's/\.activity_name/.activityName/g' \
        -e 's/\.grade_levels/.gradeLevels/g' \
        -e 's/\.hours_per_week/.hoursPerWeek/g' \
        -e 's/\.weeks_per_year/.weeksPerYear/g' \
        -e 's/\.achievement_type/.achievementType/g' \
        -e 's/\.grade_level/.gradeLevel/g' \
        -e 's/\.date_achieved/.dateAchieved/g' \
        -e 's/\.recognition_level/.recognitionLevel/g' \
        -e 's/\.verifiable_link/.verifiableLink/g' \
        -e 's/\.experience_type/.experienceType/g' \
        -e 's/\.start_date/.startDate/g' \
        -e 's/\.end_date/.endDate/g' \
        -e 's/\.is_ongoing/.isOngoing/g' \
        -e 's/\.role_title/.roleTitle/g' \
        -e 's/\.skills_learned/.skillsLearned/g' \
        -e 's/\.project_link/.projectLink/g' \
        -e 's/\.mentor_name/.mentorName/g' \
        -e 's/\.mentor_email/.mentorEmail/g' \
        -e 's/\.test_type/.testType/g' \
        -e 's/\.test_name/.testName/g' \
        -e 's/\.test_date/.testDate/g' \
        -e 's/\.composite_score/.compositeScore/g' \
        -e 's/\.section_scores/.sectionScores/g' \
        -e 's/\.college_id/.collegeId/g' \
        -e 's/\.target_category/.targetCategory/g' \
        -e 's/\.application_status/.applicationStatus/g' \
        -e 's/\.application_deadline/.applicationDeadline/g' \
        -e 's/\.decision_deadline/.decisionDeadline/g' \
        -e 's/\.essay_status/.essayStatus/g' \
        -e 's/\.supplements_status/.supplementsStatus/g' \
        -e 's/\.recommendation_status/.recommendationStatus/g' \
        -e 's/\.test_scores_sent/.testScoresSent/g' \
        -e 's/\.application_portal_link/.applicationPortalLink/g' \
        -e 's/\.decision_received_date/.decisionReceivedDate/g' \
        -e 's/\.meeting_date/.meetingDate/g' \
        -e 's/\.duration_minutes/.durationMinutes/g' \
        -e 's/\.meeting_type/.meetingType/g' \
        -e 's/\.topics_discussed/.topicsDiscussed/g' \
        -e 's/\.action_items/.actionItems/g' \
        -e 's/\.next_meeting_date/.nextMeetingDate/g' \
        -e 's/\.student_mood/.studentMood/g' \
        -e 's/\.goal_type/.goalType/g' \
        -e 's/\.target_value/.targetValue/g' \
        -e 's/\.current_value/.currentValue/g' \
        -e 's/\.completed_at/.completedAt/g' \
        -e 's/\.override_score/.overrideScore/g' \
        -e 's/\.override_reason/.overrideReason/g' \
        -e 's/\.overridden_by/.overriddenBy/g' \
        -e 's/\.overridden_at/.overriddenAt/g' \
        -e 's/\.change_type/.changeType/g' \
        -e 's/\.entity_type/.entityType/g' \
        -e 's/\.entity_id/.entityId/g' \
        -e 's/\.field_name/.fieldName/g' \
        -e 's/\.old_value/.oldValue/g' \
        -e 's/\.new_value/.newValue/g' \
        -e 's/\.changed_at/.changedAt/g' \
        -e 's/\.acceptance_rate/.acceptanceRate/g' \
        -e 's/\.avg_gpa/.avgGpa/g' \
        -e 's/\.avg_sat/.avgSat/g' \
        -e 's/\.avg_act/.avgAct/g' \
        -e 's/\.ranking_us_news/.rankingUsNews/g' \
        -e 's/\.is_active/.isActive/g' \
        -e "s/'first_name'/'firstName'/g" \
        -e "s/'last_name'/'lastName'/g" \
        -e "s/'user_id'/'userId'/g" \
        -e "s/'student_id'/'studentId'/g" \
        -e "s/'organization_id'/'organizationId'/g" \
        -e "s/'graduation_year'/'graduationYear'/g" \
        -e "s/'current_grade'/'currentGrade'/g" \
        -e 's/first_name:/firstName:/g' \
        -e 's/last_name:/lastName:/g' \
        -e 's/user_id:/userId:/g' \
        -e 's/student_id:/studentId:/g' \
        -e 's/graduation_year:/graduationYear:/g' \
        "$file" > "$temp_file"
    
    # Replace original file
    mv "$temp_file" "$file"
}

# Fix all TypeScript and TSX files
echo -e "${BLUE}Step 2: Fixing relation names (PascalCase → camelCase)...${NC}"
file_count=0

for dir in app lib components; do
    if [ -d "$dir" ]; then
        while IFS= read -r -d '' file; do
            fix_file "$file"
            ((file_count++))
        done < <(find "$dir" -type f \( -name "*.ts" -o -name "*.tsx" \) -print0)
    fi
done

echo -e "${GREEN}✓ Fixed $file_count files${NC}"
echo ""

# Verify fixes
echo -e "${BLUE}Step 3: Verifying fixes...${NC}"

# Check for remaining issues
echo -e "${YELLOW}Checking for remaining PascalCase relations...${NC}"
issues=0

for pattern in "PersonalProfile: true" "AcademicProfile: true" "User: true" "Activity: true"; do
    count=$(grep -r "$pattern" app lib components 2>/dev/null | wc -l | tr -d ' ')
    if [ "$count" -gt 0 ]; then
        echo -e "${RED}  Found $count instances of '$pattern'${NC}"
        ((issues++))
    fi
done

echo -e "${YELLOW}Checking for remaining snake_case fields...${NC}"
for pattern in "\.first_name" "\.last_name" "\.user_id" "\.student_id"; do
    count=$(grep -r "$pattern" app lib components 2>/dev/null | wc -l | tr -d ' ')
    if [ "$count" -gt 0 ]; then
        echo -e "${RED}  Found $count instances of '$pattern'${NC}"
        ((issues++))
    fi
done

if [ $issues -eq 0 ]; then
    echo -e "${GREEN}✓ No obvious issues found!${NC}"
else
    echo -e "${YELLOW}⚠ Found some patterns that may need manual review${NC}"
fi

echo ""
echo -e "${BLUE}Step 4: Summary${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✓ Backup created:${NC} $backup_dir/"
echo -e "${GREEN}✓ Files processed:${NC} $file_count"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "1. Review changes: git diff (if using git)"
echo "2. Test locally: npm run dev"
echo "3. Check all features work"
echo "4. Build: npm run build"
echo "5. Deploy to Vercel"
echo ""
echo -e "${YELLOW}To restore backup if needed:${NC}"
echo "  rm -rf app lib components"
echo "  cp -r $backup_dir/app $backup_dir/lib $backup_dir/components ."
echo ""
echo -e "${GREEN}Automated fixes complete!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
