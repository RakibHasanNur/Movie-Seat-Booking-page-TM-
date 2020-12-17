// slecting all the elements
const container = document.querySelector('.conataier');
const seats = document.querySelectorAll('.row .seat:not(.occupied)'); 
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
// + or pasreInt makes the value type a number
let ticketPrice = parseInt(movieSelect.value); 

populateUI();
// set selected movie index and price to local storge
function setMovieData (movieIndex, moviePrice){
	localStorage.setItem('selectedMovieIndex', movieIndex);
	localStorage.setItem('selectedMoviePrice', moviePrice);
}
// updating total and count
var updateSelectedCount =  ()=> {
	const selectedSeats = document.querySelectorAll('.row>.seat.selected');
	const seatsIndex = [...selectedSeats].map(function(seat){
		// return the index of current seat
		return [...seats].indexOf(seat);
	})
	// setting items to local storage
	localStorage.setItem('selected seats', JSON.stringify(seatsIndex));

	const selectedSeatsCount = selectedSeats.length; 
	count.innerText = selectedSeatsCount; 
	total.innerText = selectedSeatsCount * ticketPrice;  
}
// get data from local storage and populate UI
function populateUI(){
	const selectedSeats = JSON.parse(localStorage.getItem('selected seats'));
	if (selectedSeats !== null && selectedSeats.length>0){
		seats.forEach(function(seat, index){
			if(selectedSeats.indexOf(index) >-1){
				seat.classList.add('selected');
			}
		})
	}
	const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
	if (selectedMovieIndex !== null){
		movieSelect.selectedIndex = selectedMovieIndex;
	}
}
// movie select event to change price when selecting different movies
movieSelect.addEventListener('change', e =>{
	// if value change then changing ticket price
	ticketPrice = parseInt(e.target.value);
	// then updating it with the changed price
	updateSelectedCount(); 
	setMovieData(e.target.selectedIndex, e.target.value);
})
// click event to change the classes
container.addEventListener('click', e =>{
	if (
		e.target.classList.contains('seat') && !e.target.classList.contains('occupied'))
	{
		e.target.classList.toggle('selected');
	}

	updateSelectedCount();
})
// initial count and total set
updateSelectedCount();