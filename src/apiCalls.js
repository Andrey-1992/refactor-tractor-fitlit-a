const fetchCalls = {

  callFitLitData(endPoint) {
    return fetch(`http://localhost:3001/api/v1/${endPoint}`)
      .then(response => response.json())
      .then(data => data)
      .catch((error) => this.displayErrorMessage(error));
      // .catch(err => console.error(err))
  },

  postNewData(endPoint, body) {
    return fetch(`http://localhost:3001/api/v1/${endPoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    })
      // .then(response => response.json())
      // .then(confirmation => console.log("this is the new object that have been POSTED:", confirmation));
    .then((res) => this.checkForErrors(res))
    .catch((error) => this.displayErrorMessage(error));
  },

  displayErrorMessage(error) {
  const postErrorActivity = document.querySelector(".post-error-activity");
  const message =
    error.message === "Failed to fetch"
      ? "Somthing went worng, Please check your internet"
      : error.message;
  postErrorActivity.innerText = message;
  },

checkForErrors(res) {
  if (!res.ok) {
    throw new Error("Please make sure all Fields are filled out");
  }
  return res.json();
}

};

export default fetchCalls;
