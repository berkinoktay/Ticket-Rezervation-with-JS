const buyButton = document.querySelector('#buy')
const resetButton = document.querySelector('#reset')
const total = document.querySelector('.total')
const select = document.querySelector('#movie')
const option = document.querySelector('#movie option')
const price = 28
const sitcont = document.querySelector('.sit-container')
const sits = sitcont.querySelectorAll('.sit:not(.selected)')
let sitsArray = []
let moviesArray = [
   { movie: 'film1', price: 28, reserved: [] },
   { movie: 'film2', price: 32, reserved: [] },
   { movie: 'film3', price: 40, reserved: [] },
]

sits.forEach(sit => {
   sitsArray.push(sit)
});

loadSits()
// option.addEventListener('change', function () {
//    loadSits()
//    console.log('asdas')
// })
function selectOption() {
   const selectIndex = moviesArray.map(function (e) {
      return e.movie
   }).indexOf(`${select.value}`)
   return selectIndex
}

function loadSits() {
   sitsArray.forEach(sitClear => {
      sitClear.classList.remove('reserved')
   })
   total.innerHTML = `<span>1</span> adet koltuk için hesaplanan ücret <span>${moviesArray[selectOption()].price}</span>TL`
   moviesArray[selectOption()].reserved = getReservedLS()
   moviesArray[selectOption()].reserved.forEach(index => {
      sits[index].classList.add('reserved')
   })
}
buyButton.addEventListener('click', buy)
resetButton.addEventListener('click', reset)

sitcont.addEventListener('click', function (e) {
   if (e.target.classList.contains('sit') && !e.target.classList.contains('reserved')) {
      e.target.classList.toggle('selected')
      const selectedSit = sitcont.querySelectorAll('.sit.selected')
      const toplam = selectedSit.length * moviesArray[selectOption()].price

      total.innerHTML = `<span>${selectedSit.length}</span> adet koltuk için hesaplanan ücret <span>${toplam}</span>TL`
   }
})

function buy() {
   const selectedSit = sitcont.querySelectorAll('.sit.selected')
   selectedSit.forEach(selected => {
      selected.classList.remove('selected')
      selected.classList.add('reserved')
   });

   const reservedArray = []
   const reservedSit = sitcont.querySelectorAll('.sit.reserved')

   reservedSit.forEach(reserved => {
      reservedArray.push(reserved)
   })


   let reservedSitIndex = reservedArray.map(function (reserved) {
      return sitsArray.indexOf(reserved)
   })

   moviesArray.forEach(movie => {
      if (movie == select.value) {
         console.log(movie)
      }
   });

   moviesArray[selectOption()].reserved = reservedSitIndex
   setReservedLS()

   total.innerHTML = `<span>1</span> adet koltuk için hesaplanan ücret <span>${moviesArray[selectOption()].price}</span>TL`
}
function reset() {

   moviesArray[selectOption()].reserved = []
   setReservedLS()
   const selectedSit = sitcont.querySelectorAll('.sit.selected')
   const reservedSit = sitcont.querySelectorAll('.sit.reserved')
   selectedSit.forEach(selected => {
      selected.classList.remove('selected')
   });
   reservedSit.forEach(reserved => {
      reserved.classList.remove('reserved')
   });
   total.innerHTML = `<span>1</span> adet koltuk için hesaplanan ücret <span>${moviesArray[selectOption()].price}</span>TL`

}

function setReservedLS() {

   localStorage.setItem('reservedSitIndex', JSON.stringify(moviesArray))
}
function getReservedLS() {
   if (localStorage.getItem('reservedSitIndex') === null) {
      localStorage.setItem('reservedSitIndex', JSON.stringify([]))
   } else {
      if (JSON.parse(localStorage.getItem('reservedSitIndex'))[selectOption()].reserved === null) {
         moviesArray[selectOption()].reserved = []
      } else {
         moviesArray[selectOption()].reserved = JSON.parse(localStorage.getItem('reservedSitIndex'))[selectOption()].reserved
      }
   }

   return moviesArray[selectOption()].reserved
}


