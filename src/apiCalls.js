const fetchCalls = {

  callFitLitData(endPoint) {
    return fetch(`http://localhost:3001/api/v1/${endPoint}`)
      .then(response => response.json())
      .then(data => data)
      .catch((error) => this.displayErrorMessage(error));
  },

  postNewData(endPoint, body) {
    return fetch(`http://localhost:3001/api/v1/${endPoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    })
      .then((res) => 
        this.checkForErrors(res))
      .catch((error) => this.displayErrorMessage(error, endPoint));
  },

  checkForErrors(res) {
    if (!res.ok) {
      throw new Error("Please make sure all Fields are filled out");
    }
    return res.json();
  },

  displayErrorMessage(error, endPoint) {
    const postErrorActivity = document.querySelector(".post-error-activity");
    const errorField = document.querySelector('.js-error');

    if (endPoint === 'activity') {
      postErrorActivity.innerText = `${err} -Please check back later.`
    }
    if (endPoint === 'sleep') {
      errorField.innerHTML = `${err} -Please check back later.`
    }
  },


};

export default fetchCalls;
