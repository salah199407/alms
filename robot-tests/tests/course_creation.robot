*** Settings ***
Documentation     Test cases for course creation and management
Library           SeleniumLibrary
Resource          ../resources/common.robot
Resource          ../resources/course_resources.robot

*** Variables ***
${BROWSER}        chrome
${URL}            http://localhost:3000
${INSTRUCTOR_EMAIL}    instructor@example.com
${INSTRUCTOR_PASSWORD}    password123

*** Test Cases ***
Login As Instructor
    [Documentation]    Login to the system as an instructor
    Open Browser    ${URL}    ${BROWSER}
    Login To Application    ${INSTRUCTOR_EMAIL}    ${INSTRUCTOR_PASSWORD}
    Wait Until Page Contains    Dashboard

Create New Course
    [Documentation]    Create a new course with basic information
    Click Element    //a[contains(text(), 'Create Course')]
    Wait Until Page Contains    Create a new course
    Fill Course Basic Information
    Click Button    SUBMIT
    Wait Until Page Contains    Course created successfully

Add Course Module
    [Documentation]    Add a new module to the course
    Click Element    //button[contains(text(), 'Add Module')]
    Fill Module Information
    Click Button    Save Module
    Wait Until Page Contains    Module added successfully

Add Section To Module
    [Documentation]    Add different types of sections to a module
    Add Video Section
    Add Text Section
    Add Image Section
    Add Interactive Section
    Wait Until Page Contains    Sections added successfully

Add Quiz To Module
    [Documentation]    Add a quiz to a module
    Click Element    //button[contains(text(), 'Add Quiz')]
    Fill Quiz Information
    Add Quiz Questions
    Click Button    Save Quiz
    Wait Until Page Contains    Quiz added successfully

Add Final Quiz
    [Documentation]    Add a final quiz to the course
    Click Element    //button[contains(text(), 'Add Final Quiz')]
    Fill Final Quiz Information
    Add Final Quiz Questions
    Click Button    Save Final Quiz
    Wait Until Page Contains    Final quiz added successfully

Publish Course
    [Documentation]    Publish the created course
    Click Element    //button[contains(text(), 'Publish Course')]
    Wait Until Page Contains    Course published successfully
    Close Browser 