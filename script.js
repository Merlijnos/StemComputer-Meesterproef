let partijen = [];
let votes = {};
let container = document.getElementById("container");
let partijCount = 0;
let test = document.createTextNode('Aantal partijen: ' + partijen.length);

let header = document.createElement("header");
header.style.backgroundColor = "lightblue";
let headerText = document.createTextNode("Kies hier uw partij");
header.appendChild(headerText);
container.appendChild(header);

let stemgedeelte = document.createElement("div");
stemgedeelte.style.backgroundColor = "lightgreen";
container.appendChild(stemgedeelte);

alert("Welkom bij de verkiezingen! Voeg hieronder een partij toe om te beginnen met stemmen. Type 'klaar of  'stop' om te stoppen met stemmen.")

function addPartij() {
    let partij = prompt("Voer de naam van de partij in:");
    if (partij === null || partij === "" || partij === "klaar" || partij === "stop") {
        return;
    }
    if (partijen.includes(partij)) {
        alert("Deze partij bestaat al. Voer een andere naam in.");
        addPartij();
        return;
    }
    partijen.push(partij);
    votes[partij] = 0;
    let button = document.createElement("button");
    button.innerText = partij;
    button.addEventListener("click", function() {
        votes[partij]++;
    });
    stemgedeelte.appendChild(button);
    addPartij();
}

addPartij();

let stemmenTellenButton = document.createElement("button");
stemmenTellenButton.innerText = "Stemmen tellen";
stemmenTellenButton.addEventListener("click", function() {
    stemgedeelte.innerHTML = "";
    let resultaat = document.createElement("div");
    let winnaar = Object.keys(votes).reduce((a, b) => votes[a] > votes[b] ? a : b);
    let winnaarTekst = document.createTextNode("Partij met de meeste stemmen: " + winnaar + " (" + votes[winnaar] + ")");
    resultaat.appendChild(winnaarTekst);
    let anderePartijen = document.createElement("il");
    for (let partij in votes) {
        if (partij !== winnaar) {
            let partijTekst = document.createTextNode(partij + " " + votes[partij] + "");
            let partijItem = document.createElement("li");
            partijItem.appendChild(partijTekst);
            anderePartijen.appendChild(partijItem);
        }
    }
    resultaat.appendChild(anderePartijen);
    stemgedeelte.appendChild(resultaat);
    let nieuweStemmenTellenButton = document.createElement("button");
    nieuweStemmenTellenButton.innerText = "Opnieuw stemmen";
    nieuweStemmenTellenButton.addEventListener("click", function() {
        location.reload();
    });
    stemgedeelte.appendChild(nieuweStemmenTellenButton);
});

stemgedeelte.appendChild(stemmenTellenButton);