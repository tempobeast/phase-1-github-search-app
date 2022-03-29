document.addEventListener('DOMContentLoaded', () => {
    
    
    
    let form = document.querySelector("#github-form")
    console.log(form)
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        let search = e.target[0].value
        searchFunction(search)
    })

    function searchFunction (userName) {
        fetch(`https://api.github.com/search/users?q=${userName}`, {
            method: 'GET',
            header: {
                "Accept": "application/vnd.github.v3+json"
            }
        })
        .then (resp => resp.json())
        .then (data => (createList(data)))
    }

    function createList(data) {
        console.log(data.items)
        let userList = document.querySelector('#user-list')
        for (let user of data.items) {
            let userCard = document.createElement('li')
            userCard.innerText = `Name: ${user.login}, ID: ${user.id}, URL: ${user.url}`
            userCard.addEventListener('click', () => {
                fetch(`https://api.github.com/users/${user.login}/repos`, {
                    method: 'GET',
                    header: {
                        "Accept": "application/vnd.github.v3+json"
                    }
                })
                .then (resp => resp.json())
                .then (data => createRepoList(data))
                
            })
            userList.appendChild(userCard)
        }

    }

    function createRepoList(userLogin) {
        let repoListElement = document.querySelector('#repos-list')
        for (let repo of userLogin) {
            let repoElement = document.createElement('li')
            repoElement.innerText = `This repo's name is ${repo.name} and it is written in ${repo.language}. It can be found at ${repo.full_name}`
            repoListElement.appendChild(repoElement)
        }
    }
    


})