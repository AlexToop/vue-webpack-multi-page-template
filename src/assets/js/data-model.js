const common = require("./common");
const ENDPOINT = "https://u4bqqkp4rd.execute-api.eu-west-2.amazonaws.com/Prod";

function xhrWithCallback(httpMethod, url, callback, data, extraCallback) {
  console.log("API request sent.");
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", function() {
    if (this.readyState === 4) {
      callback(this);
      try {
        extraCallback(this);
      } catch (err) {}
    }
  });
  xhr.onerror = function() {
    alert("An error occurred");
  };
  xhr.open(httpMethod, url);
  xhr.setRequestHeader("Content-Type", "text/json");
  xhr.setRequestHeader("Accept", "*/*");
  xhr.send(data);
}

function removeEvent(eventIndex) {
  const token = gapi.auth2
    .getAuthInstance()
    .currentUser.get()
    .getAuthResponse(true).id_token;
  const data = `{\"index\":\"${eventIndex}\", \"token\":\"${token}\"}`;

  function callback() {
    v2StorageCall();
  }

  xhrWithCallback("DELETE", `${ENDPOINT}/updateStorageV2/`, callback, data);
}

function addEvent(title, date) {
  const token = gapi.auth2
    .getAuthInstance()
    .currentUser.get()
    .getAuthResponse(true).id_token;
  const data = `{\"newDate\":\"${title}&&&${date}\", \"token\":\"${token}\"}`;

  function callback() {
    v2StorageCall();
  }

  xhrWithCallback("PUT", `${ENDPOINT}/updateStorageV2/`, callback, data);
}

function checkTodo(id) {
  const token = gapi.auth2
    .getAuthInstance()
    .currentUser.get()
    .getAuthResponse(true).id_token;
  const data = `{\"checked\":\"${id}\", \"token\":\"${token}\"}`;

  function callback(event) {
    const parsedDataObject = JSON.parse(event.response).data;
    console.log("check event is updating page with info:", parsedDataObject);
    const todoData = new CustomEvent("todoData", { detail: parsedDataObject });
    const eventsData = new CustomEvent("eventsData", {
      detail: parsedDataObject
    });
    const noteData = new CustomEvent("noteData", { detail: parsedDataObject });
    document.dispatchEvent(todoData);
    document.dispatchEvent(eventsData);
    document.dispatchEvent(noteData);
  }
  xhrWithCallback("PUT", `${ENDPOINT}/updateStorageV2/`, callback, data);
}

function removeTodo(todoIndex) {
  const token = gapi.auth2
    .getAuthInstance()
    .currentUser.get()
    .getAuthResponse(true).id_token;
  const data = `{\"index\":\"${todoIndex}\", \"token\":\"${token}\", \"type\":\"todo\"}`;
  function callback(event) {
    const parsedDataObject = JSON.parse(event.response).data;
    console.log("remove todo is updating page with info:", parsedDataObject);
    const todoData = new CustomEvent("todoData", { detail: parsedDataObject });
    const eventsData = new CustomEvent("eventsData", {
      detail: parsedDataObject
    });
    const noteData = new CustomEvent("noteData", { detail: parsedDataObject });
    document.dispatchEvent(todoData);
    document.dispatchEvent(eventsData);
    document.dispatchEvent(noteData);
  }
  xhrWithCallback("DELETE", `${ENDPOINT}/updateStorageV2/`, callback, data);
}

function addTodo(title) {
  const token = gapi.auth2
    .getAuthInstance()
    .currentUser.get()
    .getAuthResponse(true).id_token;
  const data = `{\"newTodo\":\"Pending&&&${title}\", \"token\":\"${token}\"}`;
  function callback(event) {
    const parsedDataObject = JSON.parse(event.response).data;
    console.log("add todo is updating page with info:", parsedDataObject);
    const todoData = new CustomEvent("todoData", { detail: parsedDataObject });
    // const eventsData = new CustomEvent('eventsData', { detail: parsedDataObject })
    // const noteData = new CustomEvent('noteData', { detail: parsedDataObject })
    document.dispatchEvent(todoData);
    // document.dispatchEvent(eventsData)
    // document.dispatchEvent(noteData)
  }
  xhrWithCallback("PUT", `${ENDPOINT}/updateStorageV2/`, callback, data);
}

function createAccount(username, firstname, lastname, password) {
  let data = {
    username,
    firstname,
    lastname,
    password
  };
  data = JSON.stringify(data);
  function callback(data) {
    let response = JSON.parse(data.response).response;
    if (response === "Account already exists") {
      alert("Username already exists.");
    } else {
      alert("Account created, please now log in.");
    }
  }
  xhrWithCallback("PUT", `${ENDPOINT}/createAccount/`, callback, data);
}

function v2StorageCall(appCallback) {
  const token = gapi.auth2
    .getAuthInstance()
    .currentUser.get()
    .getAuthResponse(true).id_token;
  let data = {
    token
  };
  data = JSON.stringify(data);
  function callback(data) {
    let response = JSON.parse(data.response).data;

    const parsedDataObject = response.Items[0];
    console.log(
      "forced get user data populating page with data:",
      parsedDataObject
    );
    const todoData = new CustomEvent("todoData", { detail: parsedDataObject });
    const eventsData = new CustomEvent("eventsData", {
      detail: parsedDataObject
    });
    const noteData = new CustomEvent("noteData", { detail: parsedDataObject });
    document.dispatchEvent(todoData);
    document.dispatchEvent(eventsData);
    document.dispatchEvent(noteData);
  }
  xhrWithCallback(
    "POST",
    `${ENDPOINT}/getStorageV2/`,
    callback,
    data,
    appCallback
  );
}

function updateNote(note, callback) {
  const token = gapi.auth2
    .getAuthInstance()
    .currentUser.get()
    .getAuthResponse(true).id_token;
  const noteSanity1 = note.replace(/\n/g, "#!*%$%*!#");
  const noteSanity2 = noteSanity1.replace(/\\/g, "#!*%$$%*!#");
  const noteSanity3 = noteSanity2.replace(/\"/g, "#!*%%*!#");
  const noteSanity4 = noteSanity3 === "" ? "#!*%*!#" : noteSanity3;
  const data = `{\"noteUpdate\":\"${noteSanity4}\", \"token\":\"${token}\"}`;
  xhrWithCallback("PUT", `${ENDPOINT}/updateStorageV2/`, callback, data);
}

module.exports = {
  removeEvent,
  addEvent,
  checkTodo,
  removeTodo,
  addTodo,
  updateNote,
  createAccount,
  v2StorageCall
};
