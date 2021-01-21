document.addEventListener("DOMContentLoaded", () => {
    fetchMonsters()
    monsterForm()
});

  //Data
  const fetchMonsters = () => {
    fetch('http://localhost:3000/monsters/')
    .then(resp => resp.json())
    .then(monsters => monsters.forEach(monster => renderMonster(monster)))
  }

  const postMonster = (monster) => {
    fetch('http://localhost:3000/monsters/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(monster)
    })
    .then(resp => resp.json())
    .then(monster => renderMonster(monster))
  }


  //DOM
  const renderMonster = (monster) => {
    let div = document.getElementById('monster-container')
    let name = document.createElement('h2')
    let age = document.createElement('p')
    let description = document.createElement('p')

    name.textContent = monster.name
    age.textContent = monster.age
    description.textContent = monster.description

    div.append(name, age, description)
  }

  const monsterForm = () => {
    let div = document.getElementById('create-monster')
    let next = document.getElementById('forward')
    let back = document.getElementById('back')
    let form = document.createElement('form')
    let nameInput = document.createElement('input')
    let ageInput = document.createElement('input')
    let descriptionInput = document.createElement('input')
    let btn = document.createElement('button')
    let br = document.createElement('br')

    nameInput.name = "name"
    nameInput.placeholder = "Enter Monster's name"
    ageInput.name = "age"
    ageInput.placeholder = "Enter Monster's age"
    descriptionInput.name = "description"
    descriptionInput.placeholder = "Enter Monster's description"
    btn.textContent = "Create Monster Button"

    form.append(nameInput, ageInput, br, descriptionInput, btn)
    div.appendChild(form)

    form.addEventListener("submit", handleClick)
  }

  //Event Handlers
  const handleClick = (e) => {
    let monster = {
        name: e.target.name.value,
        age: e.target.age.value,
        description: e.target.description.value
    }
    postMonster(monster)
  }