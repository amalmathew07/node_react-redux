import delay from './delay';

class CelebApi {
    static getAllCelebs() {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                const response = await fetch('/listceleb', {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                      'token': localStorage.getItem("token")
                    },
                  });
                  const celebResponse = await response.json();
                  if (celebResponse === "Not Authorized") {
                      reject("Not Authorized");
                  } else {
                  const celebs = assembleCelebrities(celebResponse);
                  function assembleCelebrities(celebResponse) {
                    const celebrityDetails = celebResponse.map((celebrity) => {
                        return {
                            id: celebrity._id,
                            celebName: celebrity.celebName,
                            celebStage:celebrity.celebStage,
                        }
                    })
                    return celebrityDetails;
                  }
                  resolve(Object.assign([], celebs));
                }
            }, delay);
        });
    }
    static saveCeleb(celeb) {
        celeb = Object.assign({}, celeb);
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                const response = await fetch('/addceleb', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'token': localStorage.getItem("token")
                    },
                    body: JSON.stringify({ celebName: celeb.celebName, celebStage: celeb.stage }),
                  });
                  const body = await response.text();

                resolve(celeb);
            }, delay);
        });
    }

    static deleteCeleb(celebId) {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
     
                const response = await fetch('/deleteceleb/'+celebId, {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json',
                      'token': localStorage.getItem("token")
                    },
                  });
                  const body = await response.json();
                  if (body !== "Not found") {
                resolve();
                  } else {
                    reject("Not found");
                  }
            }, delay);
        });
    }


    static getCeleb(celebId) {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                const response = await fetch('/getceleb/'+celebId, {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                      'token': localStorage.getItem("token")
                    },
                  });
                  const celebResponse = await response.json();
                  if (celebResponse !== "Not found") {
                         const celeb = {
                            id: celebResponse._id,
                            celebName: celebResponse.celebName,
                            celebStage:celebResponse.celebStage,
                        }

                  resolve(celeb);
                } else {
                    reject("Not found");
                }
            }, delay);
        });
    }


    static loginUser(userData) {
        userData = Object.assign({}, userData);
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json'
                    },
                    body: JSON.stringify({ userName: userData.userName, password: userData.password })
                  });
                  const loginResponse = await response.json();
                  localStorage.setItem("token", loginResponse.token);
                  if (loginResponse.message === "Login Successful") {
                  resolve(loginResponse);
                } else {
                    reject("Login Failed");
                }
            }, delay);
        });
    }
}



export default CelebApi;
