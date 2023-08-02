import { getUser } from './src/scripts/services/user.js'
import { getRepositories } from './src/scripts/services/repositories.js'
import { getEvents } from './src/scripts/services/events.js'

import { user } from './src/scripts/objects/user.js'
import { screen } from './src/scripts/objects/screen.js'

document.getElementById("btn-search").addEventListener("click", () => {
  const userName = document.getElementById("input-search").value;
  if (validateEmptyInput(userName)) return;
  getUserData(userName);
});

document.getElementById("input-search").addEventListener("keyup", (e) => {
  const userName = e.target.value;
  const key = e.which || e.keyCode;
  const isEnterKeyPressed = key === 13;

  if (isEnterKeyPressed) {
    if (validateEmptyInput(userName)) return;
    getUserData(userName);
  }
});

async function getUserData(userName) {
  const userResponse = await getUser(userName);

  if (userResponse.message === "Not Found") {
    screen.renderNotFound();
    return;
  }

  const repositoriesResponse = await getRepositories(userName);

  const eventList = await getEvents(userName);

  // console.log(repositoriesResponse)
  // console.log(eventList)

  user.setInfo(userResponse);

  user.setRepositories(repositoriesResponse);

  user.setEvents(eventList);

  screen.renderUser(user);
}

function validateEmptyInput(userName) {
  if (userName.lenght === 0) {
    alert("Preencha o campo com o nome do usuario do GitHub");
    return true;
  }
}
