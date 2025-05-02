*** Settings ***
Documentation     Test cases for course content management
Library           SeleniumLibrary
Resource          ../resources/common.robot
Resource          ../resources/course_resources.robot

*** Variables ***
${BROWSER}        chrome
${URL}            http://localhost:3000
${INSTRUCTOR_EMAIL}    instructor@example.com
${INSTRUCTOR_PASSWORD}    password123

*** Test Cases ***
Login And Navigate To Course
    [Documentation]    Login and navigate to course management
    Open Browser    ${URL}    ${BROWSER}
    Login To Application    ${INSTRUCTOR_EMAIL}    ${INSTRUCTOR_PASSWORD}
    Wait Until Page Contains    Dashboard
    Click Element    //a[contains(text(), 'My Courses')]
    Click Element    //div[contains(text(), '${COURSE_TITLE}')]

Manage Course Modules
    [Documentation]    Test module management functionality
    Add New Module
    Edit Existing Module
    Delete Module
    Reorder Modules

Manage Module Sections
    [Documentation]    Test section management within modules
    Add Multiple Sections
    Edit Section Content
    Delete Section
    Reorder Sections

Manage Module Quizzes
    [Documentation]    Test quiz management within modules
    Create Module Quiz
    Edit Quiz Questions
    Delete Quiz
    Preview Quiz

Manage Final Quiz
    [Documentation]    Test final quiz management
    Create Final Quiz
    Edit Final Quiz Settings
    Add Final Quiz Questions
    Preview Final Quiz

*** Keywords ***
Add New Module
    Click Element    //button[contains(text(), 'Add Module')]
    Fill Module Information
    Click Button    Save Module
    Wait Until Page Contains    Module added successfully

Edit Existing Module
    Click Element    //div[contains(text(), '${MODULE_TITLE}')]/../button[contains(text(), 'Edit')]
    Input Text    id=moduleTitle    Updated ${MODULE_TITLE}
    Click Button    Save Changes
    Wait Until Page Contains    Module updated successfully

Delete Module
    Click Element    //div[contains(text(), 'Updated ${MODULE_TITLE}')]/../button[contains(text(), 'Delete')]
    Click Button    Confirm Delete
    Wait Until Page Contains    Module deleted successfully

Reorder Modules
    Drag And Drop    //div[contains(text(), 'Module 1')]    //div[contains(text(), 'Module 2')]
    Wait Until Page Contains    Modules reordered successfully

Add Multiple Sections
    Add Video Section
    Add Text Section
    Add Image Section
    Add Interactive Section

Edit Section Content
    Click Element    //div[contains(text(), 'Video: React Introduction')]/../button[contains(text(), 'Edit')]
    Input Text    id=videoTitle    Updated Video Title
    Click Button    Save Changes
    Wait Until Page Contains    Section updated successfully

Delete Section
    Click Element    //div[contains(text(), 'Updated Video Title')]/../button[contains(text(), 'Delete')]
    Click Button    Confirm Delete
    Wait Until Page Contains    Section deleted successfully

Reorder Sections
    Drag And Drop    //div[contains(text(), 'Text Section')]    //div[contains(text(), 'Video Section')]
    Wait Until Page Contains    Sections reordered successfully

Create Module Quiz
    Click Element    //button[contains(text(), 'Add Quiz')]
    Fill Quiz Information
    Add Quiz Questions
    Click Button    Save Quiz
    Wait Until Page Contains    Quiz added successfully

Edit Quiz Questions
    Click Element    //div[contains(text(), '${QUIZ_TITLE}')]/../button[contains(text(), 'Edit')]
    Click Element    //div[contains(text(), 'What is React?')]/../button[contains(text(), 'Edit')]
    Input Text    id=questionText    What is React.js?
    Click Button    Save Changes
    Wait Until Page Contains    Question updated successfully

Delete Quiz
    Click Element    //div[contains(text(), '${QUIZ_TITLE}')]/../button[contains(text(), 'Delete')]
    Click Button    Confirm Delete
    Wait Until Page Contains    Quiz deleted successfully

Preview Quiz
    Click Element    //div[contains(text(), '${QUIZ_TITLE}')]/../button[contains(text(), 'Preview')]
    Wait Until Page Contains    Quiz Preview
    Close Browser

Create Final Quiz
    Click Element    //button[contains(text(), 'Add Final Quiz')]
    Fill Final Quiz Information
    Add Final Quiz Questions
    Click Button    Save Final Quiz
    Wait Until Page Contains    Final quiz added successfully

Edit Final Quiz Settings
    Click Element    //div[contains(text(), '${FINAL_QUIZ_TITLE}')]/../button[contains(text(), 'Edit')]
    Input Text    id=finalPassingScore    85
    Click Button    Save Changes
    Wait Until Page Contains    Final quiz updated successfully

Preview Final Quiz
    Click Element    //div[contains(text(), '${FINAL_QUIZ_TITLE}')]/../button[contains(text(), 'Preview')]
    Wait Until Page Contains    Final Quiz Preview
    Close Browser 