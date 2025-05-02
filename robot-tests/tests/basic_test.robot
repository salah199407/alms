*** Settings ***
Documentation     Basic test cases for the e-learning system
Library           SeleniumLibrary
Resource          ../resources/common.robot

*** Variables ***
${BROWSER}        chrome
${URL}            http://localhost:3000

*** Test Cases ***
Open Application
    [Documentation]    Test that the application opens successfully
    Open Browser    ${URL}    ${BROWSER}
    Title Should Be    ODC LMS
    Close Browser

*** Keywords ***
Login To Application
    [Arguments]    ${username}    ${password}
    Input Text    id=username    ${username}
    Input Password    id=password    ${password}
    Click Button    id=login-button 