document.addEventListener('DOMContentLoaded', getNamesFromDb)

function getNamesFromDb() {
  fetch("  http://localhost:3000/dogs")
    .then(res => res.json())
    .then(data => {
      data.forEach(elem => {

        let tables = document.getElementById('table-body')
        let tr = document.createElement('tr')
        let tdName = document.createElement('td')
        let tdBreed = document.createElement('td')
        let tdSex = document.createElement('td')
        let tdBtn = document.createElement('td')
        let btn = document.createElement('button')


        tdName.innerText = elem.name
        tdBreed.innerText = elem.breed
        tdSex.innerText = elem.sex
        btn.innerText = "Edit Dog"
        tdBtn.appendChild(btn)
        tr.appendChild(tdName)
        tr.appendChild(tdBreed)
        tr.appendChild(tdSex)
        tr.appendChild(tdBtn)
        tables.appendChild(tr)

        btn.addEventListener('click', () => {
          let myForm = document.querySelector('form')
          myForm.addEventListener('submit', (e) => {
            e.preventDefault()

            let nameToUpdate = document.getElementById('name')
            let breedToUpdate = document.getElementById('breed')
            let sexToUpdate = document.getElementById('sex')
            let url = "http://localhost:3000/dogs/"
            fetch(`${url}${elem.id}`, {
                method: "PATCH",
                headers: {
                  "Content-type": "application/json",
                  Accept: 'application/json'
                },
                body: JSON.stringify({
                  name: nameToUpdate.value,
                  breed: breedToUpdate.value,
                  sex: sexToUpdate.value
                })
              })
              .then(data => console.log(data))
          })
        })
      })
    })
}