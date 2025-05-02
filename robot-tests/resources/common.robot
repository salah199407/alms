*** Settings ***
Documentation     Common resources for all tests
Library           SeleniumLibrary

*** Variables ***
${DEFAULT_TIMEOUT}    10s

*** Keywords ***
Wait For Element And Click
    [Arguments]    ${locator}
    Wait Until Element Is Visible    ${locator}    ${DEFAULT_TIMEOUT}
    Click Element    ${locator}

Wait For Element And Input Text
    [Arguments]    ${locator}    ${text}
    Wait Until Element Is Visible    ${locator}    ${DEFAULT_TIMEOUT}
    Input Text    ${locator}    ${text}

Wait For Element And Get Text
    [Arguments]    ${locator}
    Wait Until Element Is Visible    ${locator}    ${DEFAULT_TIMEOUT}
    ${text}    Get Text    ${locator}
    [Return]    ${text} 