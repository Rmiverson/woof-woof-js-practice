document.addEventListener('DOMContentLoaded', () => {
   loadJson()
   
})

const loadJson = () => {
   fetch('http://localhost:3000/pups')
   .then(resp => resp.json())
   .then(json => renderPupList(json))
}

const patchPup = (pup) => {
   fetch(`http://localhost:3000/pups/${pup.id}`, {
      method: 'PATCH',
      headers: {
         'Content-Type':'application/json',
     },
     body: JSON.stringify(pup)
   })
   .then(resp => resp.json())
   .then(json => loadPup(json))
   .catch(error => console.log(error))
}

const renderPupList = (pups) => {
   const div = document.getElementById('dog-bar')
   div.innerHTML = ""

   addListeners(pups)
   pups.forEach( pup => {
      const span = document.createElement('span')

      span.innerHTML = pup.name
      span.id = pup.id

      div.appendChild(span)

      span.addEventListener('click', () => loadPup(pup))
   })
}

const loadPup = (pup) => {
   const div = document.getElementById('dog-info')
   div.innerHTML = ""

   const h2 = document.createElement('h2')
   const img = document.createElement('img')
   const btn = document.createElement('button')

   h2.innerHTML = pup.name
   img.src = pup.image

   if (pup.isGoodDog) {
      btn.textContent = 'Good Dog!'  
   } else {
      btn.textContent = 'Bad Dog!!!'
   }
 
   div.append(img, h2, btn)

   btn.addEventListener('click', () => togglePup(pup))
}

const togglePup = (pup) => {
   // console.log()
   const div = document.getElementById('dog-info')
   const btn = div.querySelector('button')
   // console.log(pup.isGoodDog)

   if (pup.isGoodDog) {
      btn.textContent = 'Bad Dog!!!'
      pup.isGoodDog = false
   } else {
      btn.textContent = 'Good Dog!'
      pup.isGoodDog = true
   }
   // console.log(pup.isGoodDog)
   
   patchPup(pup)
}

const addListeners = (pups) => {
   const filterBtn = document.getElementById('good-dog-filter')

   filterBtn.addEventListener('click', () => {
      if (filterBtn.textContent === 'Filter good dogs: OFF') {
         console.log('on')
         filterBtn.textContent = 'Filter good dogs: ON'
         pups = pups.filter(pup => pup.isGoodDog === true)
         renderPupList(pups)
      } else if (filterBtn.textContent === 'Filter good dogs: ON') {
         console.log('off')
         filterBtn.textContent = 'Filter good dogs: OFF'
         renderPupList(pups)
      }
   })
}
