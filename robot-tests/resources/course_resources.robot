*** Settings ***
Documentation     Course creation and management resources
Library           SeleniumLibrary

*** Variables ***
${COURSE_TITLE}        Advanced Web Development
${COURSE_CATEGORY}     Web Development
${COURSE_LEVEL}        Advanced
${COURSE_LANGUAGE}     English
${COURSE_DESCRIPTION}  A comprehensive course on modern web development
${MODULE_TITLE}        Introduction to React
${SECTION_TITLE}       React Basics
${QUIZ_TITLE}          Module 1 Quiz
${FINAL_QUIZ_TITLE}    Final Assessment

*** Keywords ***
Fill Course Basic Information
    Input Text    id=title    ${COURSE_TITLE}
    Select From List By Value    id=category    ${COURSE_CATEGORY}
    Select From List By Value    id=level    ${COURSE_LEVEL}
    Select From List By Value    id=primaryLanguage    ${COURSE_LANGUAGE}
    Input Text    id=description    ${COURSE_DESCRIPTION}

Fill Module Information
    Input Text    id=moduleTitle    ${MODULE_TITLE}
    Input Text    id=moduleDescription    Introduction to React concepts and fundamentals

Add Video Section
    Click Element    //button[contains(text(), 'Add Video')]
    Input Text    id=videoTitle    Video: React Introduction
    Input Text    id=videoUrl    https://example.com/video1
    Click Button    Save Video

Add Text Section
    Click Element    //button[contains(text(), 'Add Text')]
    Input Text    id=textTitle    Text: React Basics
    Input Text    id=textContent    This section covers the basic concepts of React...
    Click Button    Save Text

Add Image Section
    Click Element    //button[contains(text(), 'Add Image')]
    Input Text    id=imageTitle    Image: React Architecture
    Choose File    id=imageFile    ${CURDIR}/images/react-architecture.png
    Click Button    Save Image

Add Interactive Section
    Click Element    //button[contains(text(), 'Add Interactive')]
    Input Text    id=interactiveTitle    Interactive: React Components
    Input Text    id=interactiveContent    <div>Interactive content here</div>
    Click Button    Save Interactive

Fill Quiz Information
    Input Text    id=quizTitle    ${QUIZ_TITLE}
    Input Text    id=quizDescription    Test your knowledge of React basics
    Input Text    id=passingScore    70

Add Quiz Questions
    Add Multiple Choice Question
    Add True False Question
    Add Short Answer Question

Add Multiple Choice Question
    Click Button    Add Question
    Select From List By Value    id=questionType    multiple_choice
    Input Text    id=questionText    What is React?
    Input Text    id=option1    A JavaScript library
    Input Text    id=option2    A programming language
    Input Text    id=option3    A database
    Input Text    id=option4    An operating system
    Click Element    id=correctOption1
    Click Button    Save Question

Add True False Question
    Click Button    Add Question
    Select From List By Value    id=questionType    true_false
    Input Text    id=questionText    React is a framework
    Click Element    id=correctAnswerFalse
    Click Button    Save Question

Add Short Answer Question
    Click Button    Add Question
    Select From List By Value    id=questionType    short_answer
    Input Text    id=questionText    What is JSX?
    Input Text    id=correctAnswer    JavaScript XML
    Click Button    Save Question

Fill Final Quiz Information
    Input Text    id=finalQuizTitle    ${FINAL_QUIZ_TITLE}
    Input Text    id=finalQuizDescription    Final assessment for the course
    Input Text    id=finalPassingScore    80

Add Final Quiz Questions
    Add Multiple Choice Question
    Add True False Question
    Add Short Answer Question 