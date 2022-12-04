import React from "react";
import {SurveyCreator, SurveyCreatorComponent} from "survey-creator-react";
import "survey-core/survey.i18n.js";
import "survey-creator-core/survey-creator-core.i18n.js";
import "survey-core/defaultV2.css";
import "survey-creator-core/survey-creator-core.css";
// import "./index.css";
function SurveyComponent() {
  if(typeof window !== 'undefined') {
  const creatorOptions = {};
  const creator = new SurveyCreator(creatorOptions);
  // Automatically save survey definition on changing. Hide "Save" button
  creator.isAutoSave = true;
  // Show state button here
  creator.showState = true;
  var localStorageName = "SaveLoadSurveyCreatorExample";
  // Setting this callback will make visible the "Save" button
  creator.saveSurveyFunc = function (saveNo, callback) { // save the survey JSON
    console.log(creator.text);
    // You can store in your database JSON as text: creator.text  or as JSON: creator.JSON
    window.localStorage.setItem(localStorageName, creator.text);
    // We assume that we can't get error on saving data in local storage
    // Tells creator that changing (saveNo) saved successfully.
    // Creator will update the status from Saving to saved
    callback(saveNo, true);
    //console.log(creator.JSON)
    // saveSurveyJson(
      //     "https://your-web-service.com/",
      //     creator.JSON,
      //     saveNo,
      //     callback
      // );
  }
  var defaultJSON = {
    pages: [
      {
        name: 'page1',
        elements: [
          {
            type: 'text',
            name: "Question1"
          }
        ]
      }
    ]
  };
  creator.text = window.localStorage.getItem(localStorageName) || JSON.stringify(defaultJSON);
  // If you get JSON from your database then you can use creator.JSON property
  // creator.JSON = yourJSON;
  return (<SurveyCreatorComponent creator={creator}/>);
  }
  return <></>
}

// function saveSurveyJson(url, json, saveNo, callback) {
//   const request = new XMLHttpRequest();
//   request.open('POST', url);
//   request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
//   request.addEventListener('load', () => {
//       callback(saveNo, true);
//   });
//   request.addEventListener('error', () => {
//       callback(saveNo, false);
//   });
//   request.send(JSON.stringify(json));
// }

export default SurveyComponent;