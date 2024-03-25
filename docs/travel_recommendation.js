let parentDiv = document.createElement('div');
parentDiv.id = 'parentDiv';
parentDiv.style.position = 'fixed';
parentDiv.style.top = '100px';
parentDiv.style.right = '50px';
parentDiv.style.backgroundColor = 'rgba(81, 80, 80, 1)';
parentDiv.style.display = 'flex';
parentDiv.style.flexDirection = 'column';
parentDiv.style.justifyContent = 'center';
parentDiv.style.alignItems = 'center';
parentDiv.style.borderColor = 'black';
parentDiv.style.borderStyle = 'solid'; 

async function checkForKeyword() {
    event.preventDefault();

    if (parentDiv.firstChild) {
        clearResults();
    }

    let userInput = document.getElementById('search').value;
    
    if (/^[a-zA-Z]+$/.test(userInput)) {
        userInput = userInput.toLowerCase();
    } 
    else {
        alert('Invalid input. Please enter only alphabetic characters.');
        return;
    }

    let response = await fetch('travel_recommendation_api.json');
    let data = await response.json(); 

    // check if beach is in input
    if (userInput.includes('beach')) {
            data.beaches.forEach(element => {
            let beachDiv = document.createElement('div');

            let img = document.createElement('img');
            img.src = element.imageUrl;
            img.style.width = '500px';
            img.style.height = '300px';
            beachDiv.appendChild(img);

            let p = document.createElement('p');
            p.innerHTML = element.name + ': ' + element.description;
            p.style.color = 'white';
            p.style.width = '500px';
            p.style.paddingLeft = '10px';
            beachDiv.appendChild(p);

            parentDiv.appendChild(beachDiv);
        });
    }
    else if (userInput.includes('temple')) {
        data.temples.forEach(element => {
            let templeDiv = document.createElement('div');

            let img = document.createElement('img');
            img.src = element.imageUrl;
            img.style.width = '500px';
            img.style.height = '300px';
            templeDiv.appendChild(img);

            let p = document.createElement('p');
            p.innerHTML = element.name + ': ' + element.description;
            p.style.color = 'white';
            p.style.width = '500px';
            p.style.paddingLeft = '10px';
            templeDiv.appendChild(p);

            parentDiv.appendChild(templeDiv);
        });
        
    }
    else if (userInput.includes('country')) {

        let firstCountryIndex = Math.floor(Math.random() * data.countries.length);
        let secondCountryIndex;
        do {
            secondCountryIndex = Math.floor(Math.random() * data.countries.length);
        } while (secondCountryIndex === firstCountryIndex);

        let firstCountry = data.countries[firstCountryIndex];
        let firstCityIndex = Math.floor(Math.random() * firstCountry.cities.length);
        let firstCity = firstCountry.cities[firstCityIndex];

        let secondCountry = data.countries[secondCountryIndex];
        let secondCityIndex = Math.floor(Math.random() * secondCountry.cities.length);
        let secondCity = secondCountry.cities[secondCityIndex];

        [firstCity, secondCity].forEach(city => {
            let cityDiv = document.createElement('div');

            let img = document.createElement('img');
            img.src = city.imageUrl;
            img.style.width = '500px';
            img.style.height = '300px';
            cityDiv.appendChild(img);

            let p = document.createElement('p');
            p.innerHTML = city.name + ': ' + city.description;
            p.style.color = 'white';
            p.style.width = '500px';
            p.style.paddingLeft = '10px';
            cityDiv.appendChild(p);

            parentDiv.appendChild(cityDiv);
        });
    }
    else {
        alert('Your keyword is unknown! Sorry!');
        return;
    }

    document.body.appendChild(parentDiv);
}

function clearResults() {
    let parentDiv = document.getElementById('parentDiv');

    if(!parentDiv) {
        return;
    }

    while (parentDiv.firstChild) {
        parentDiv.removeChild(parentDiv.firstChild);
    }
}

document.getElementById('clearbtn').addEventListener('click', clearResults);

document.getElementById('searchbtn').addEventListener('click', checkForKeyword);