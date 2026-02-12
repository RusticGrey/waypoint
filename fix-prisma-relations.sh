#!/bin/bash

# Waypoint Prisma Relation Fix Script
# This script automatically fixes all camelCase relation names to PascalCase

set -e  # Exit on error

echo "======================================"
echo "Waypoint Prisma Relation Fix Script"
echo "======================================"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from your Waypoint project root."
    exit 1
fi

if [ ! -d "prisma" ]; then
    echo "❌ Error: prisma directory not found. Are you in the Waypoint project?"
    exit 1
fi

echo "✅ Found Waypoint project"
echo ""

# Create backup
BACKUP_DIR="backups/before-prisma-fix-$(date +%Y%m%d-%H%M%S)"
echo "📦 Creating backup at: $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"
cp -r lib "$BACKUP_DIR/" 2>/dev/null || true
cp -r app "$BACKUP_DIR/" 2>/dev/null || true
echo "✅ Backup created"
echo ""

echo "🔧 Applying fixes..."
echo ""

# Function to replace in file
replace_in_file() {
    local file=$1
    local find=$2
    local replace=$3
    
    if [ -f "$file" ]; then
        # Use different sed syntax for macOS vs Linux
        if [[ "$OSTYPE" == "darwin"* ]]; then
            sed -i '' "s/$find/$replace/g" "$file"
        else
            sed -i "s/$find/$replace/g" "$file"
        fi
    fi
}

# Function to fix all files in a directory
fix_directory() {
    local dir=$1
    
    if [ ! -d "$dir" ]; then
        echo "⚠️  Directory $dir not found, skipping..."
        return
    fi
    
    echo "📁 Fixing files in $dir..."
    
    # Find all .ts and .tsx files
    find "$dir" -type f \( -name "*.ts" -o -name "*.tsx" \) | while read file; do
        echo "  → $(basename $file)"
        
        # Fix include statements - one-to-one relations
        replace_in_file "$file" "personal_profile:" "PersonalProfile:"
        replace_in_file "$file" "academic_profile:" "AcademicProfile:"
        replace_in_file "$file" "profile_override:" "ProfileOverride:"
        
        # Fix include statements - one-to-many relations
        replace_in_file "$file" "activities:" "Activity:"
        replace_in_file "$file" "achievements:" "Achievement:"
        replace_in_file "$file" "project_experiences:" "ProjectExperience:"
        replace_in_file "$file" "test_scores:" "TestScore:"
        replace_in_file "$file" "transcripts:" "Transcript:"
        replace_in_file "$file" "target_colleges:" "TargetCollege:"
        replace_in_file "$file" "college_applications:" "CollegeApplication:"
        replace_in_file "$file" "meetings:" "Meeting:"
        replace_in_file "$file" "meeting_logs:" "MeetingLog:"
        replace_in_file "$file" "profile_goals:" "ProfileGoal:"
        replace_in_file "$file" "profile_comments:" "ProfileComment:"
        replace_in_file "$file" "change_logs:" "ChangeLog:"
        
        # Fix cross-model relations in includes
        # More specific patterns to avoid false positives
        replace_in_file "$file" "include: { user:" "include: { User:"
        replace_in_file "$file" "  user:" "  User:"
        replace_in_file "$file" "include: { student:" "include: { Student:"
        replace_in_file "$file" "  student:" "  Student:"
        replace_in_file "$file" "  coordinator:" "  Coordinator:"
        replace_in_file "$file" "  college:" "  College:"
        replace_in_file "$file" "overridden_by_user:" "User:"
        
        # Fix field access (dot notation)
        replace_in_file "$file" "\.personal_profile" ".PersonalProfile"
        replace_in_file "$file" "\.academic_profile" ".AcademicProfile"
        replace_in_file "$file" "\.profile_override" ".ProfileOverride"
        replace_in_file "$file" "\.activities" ".Activity"
        replace_in_file "$file" "\.achievements" ".Achievement"
        replace_in_file "$file" "\.project_experiences" ".ProjectExperience"
        replace_in_file "$file" "\.test_scores" ".TestScore"
        replace_in_file "$file" "\.transcripts" ".Transcript"
        replace_in_file "$file" "\.target_colleges" ".TargetCollege"
        replace_in_file "$file" "\.college_applications" ".CollegeApplication"
        replace_in_file "$file" "\.meetings" ".Meeting"
        replace_in_file "$file" "\.profile_goals" ".ProfileGoal"
        replace_in_file "$file" "\.change_logs" ".ChangeLog"
        
        # Fix nested user/student access patterns
        replace_in_file "$file" "student\.user\." "student.User."
        replace_in_file "$file" "\.student\.user\." ".Student.User."
        replace_in_file "$file" "app\.student\.user\." "app.Student.User."
        replace_in_file "$file" "override\.overridden_by_user\." "override.User."
    done
}

# Fix all directories
fix_directory "lib/utils"
fix_directory "app/api"
fix_directory "app/(dashboard)"
fix_directory "app/(auth)"
fix_directory "components"

echo ""
echo "✅ All fixes applied!"
echo ""

# Regenerate Prisma client
echo "🔄 Regenerating Prisma client..."
npx prisma generate

echo ""
echo "======================================"
echo "✅ FIXES COMPLETE!"
echo "======================================"
echo ""
echo "Backup location: $BACKUP_DIR"
echo ""
echo "Next steps:"
echo "1. Test the app: npm run dev"
echo "2. If issues occur, restore from backup:"
echo "   cp -r $BACKUP_DIR/* ."
echo "3. When working, commit the changes:"
echo "   git add -A"
echo "   git commit -m 'Fix: Update Prisma relation names to PascalCase'"
echo ""
