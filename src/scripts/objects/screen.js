const screen = {
  userProfile: document.querySelector(".profile-data"),
  renderUser(user) {
        this.userProfile.innerHTML = `
                                    <div class="info">
                                        <img src="${user.avatarUrl}" alt="foto de perfil del usuario" />
                                        <div class="data">
                                            <h1>${user.name ?? "no tiene nombre cadastrado 😭"}</h1>
                                            <p>${user.bio ?? "no tiene bio cadastrado 😭"}</p>
                                            <p>Seguidores ${user.followers} 👥</p>
                                            <p>Siguiendo ${user.following} 👣</p>
                                           
                                        </div>
                                    </div>`;

        let repositoriesItens = ''
        user.repositories.forEach(repo => {
            const forks = repo.forks ?? 0;
            const stargazers = repo.stargazers_count ?? 0;
            const watchers = repo.watchers ?? 0;
            const language = repo.language ?? ' ';

            repositoriesItens +=`<li><a href="${repo.html_url}" target="_blank"> <spam class="namerepo">${repo.name}</spam><br>
            <ul class="detalles">
            <li>🍴 ${forks ?? "sim Forks 😭"}</li>
            <li>⭐ ${stargazers} </li>
            <li>👀 ${watchers}</li>
            <li>💠 ${language}</li>
            </ul></a></li>`;
            
        });


        if(user.repositories.length > 0){
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositorios</h2>
                                                <ul>${repositoriesItens}</ul>
                                           </div>`
        }
    
        let eventList = '';
        let messages = '';

        user.eventsList.forEach(event => {

            if(event.payload.commits){
                event.payload.commits.forEach(elemnt => {
                    messages = `${elemnt.message}`;
                })
            }
            eventList += `<li class="eventList"><p>${event.repo.name}<spm class="commit">- ${messages}</spm></p></li>`;
        }
        )

        this.userProfile.innerHTML += `<div class="eventos">
                                        <h2>Eventos</h2>
                                        <ul class="ult">${eventList}</ul>
                                      </div>`


        

    },
    renderNotFound(){
        this.userProfile.innerHTML = "<h3>Usuario no encontrado</h3>"
    }
    


  }
  


export { screen };
