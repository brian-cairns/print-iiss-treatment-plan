const params = new URLSearchParams(window.location.search)
for (const [key, value] of params) { let id = value; }

//Show animation 
for (let i = 1; i < 4; i++) {
    document.getElementById(`mainSection${1}`).style.display = "none";
}

for (let i = 1; i < 5; i++) {
    document.getElementById(`section${i}`).style.display = "none";
}

for (let i = 1; i < 5; i++) {
    for (let j = 1; j < 4; j++) {
        document.getElementById(`goal${j}-${i}`).style.display = 'none';
        document.getElementById(`timeline${j}-${i}`).style.display = 'none'
    }
}

for (let i = 1; i = 6; i++) {
    document.getElementById(`date${i}`).style.display = 'none'
    document.getElementById(`time${i}`).style.display = 'none'
    document.getElementById(`total${i}`).style.display = 'none'
    document.getElementById(`services${i}`).style.display = 'none'
}

//fetch data
const url = 'https://pffm.azurewebsites.net/getForms'
const query = {
    form: 'familyTrainingMeeting',
    itemId: id 
}
const header = {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*"
}

fetch(url, {
    method: "GET",
    headers: header,
    body: JSON.stringify(query)
})
    .then(response => response.json())
    .then(data => populatePage(data))
    .catch(console.error)

async function populatePage(data) {
    document.getElementById('dob').innerHTML = data.dob;
    document.getElementById('email').innerHTML = data.email;
    document.getElementById('address').innerHTML = data.address;
    document.getElementById('phone').innerHTML = data.phone;
    document.getElementById('city').innerHTML = data.city;
    document.getElementById('state').innerHTML = data.state;
    document.getElementById('zip').innerHTML = data.zip;
    document.getElementById('clientName').innerHTML = data.clientName;
    document.getElementById('start').innerHTML = data.start;
    document.getElementById('end').innerHTML = data.end;
    document.getElementById('sixMonth').innerHTML = data.sixMonth;
    document.getElementById('review').innerHTML = data.review;
    let len = data.goals.length
    for (let i = 0; i < len; i++) {
        document.getElementById(`section${i + 1}`).style.display = "block";
        document.getElementById(`mainGoal${i + 1}`).innerHTML = data.goals[i].goalName;
        document.getElementById(`needs${i + 1}`).innerHTML = data.goals[i].needs;
        document.getElementById(`progress${i + 1}`).innerHTML = data.goals[i].progress;
        document.getElementById(`notes${i + 1}`).innerHTML = data.goals[i].notes;
        for (let j = 0; j < data.goals[i].objectives.length; j++) {
            document.getElementById(`goal${j + 1}-${i + 1}`).innerHTML = data.goals[i].objectives[j];  
            document.getElementById(`goal${j + 1}-${i + 1}`).style.display = 'inline'
            if(!data.goals[i].objectives[j]) {j = data.goals[i].objectives.length}
        }
        for (let j = 0; j < data.goals[i].objectives.length; j++) {
            document.getElementById(`timeline${j + 1}-${i + 1}`).innerHTML = data.goals[i].responsiblePersonTimeline[j];  
            document.getElementById(`timeline${j + 1}-${i + 1}`).style.display = 'inline'
            if(!data.goals[i].responsiblePersonTimeline[j]) {j=data.goals[i].objectives.length}
        }
    }
    showPage()
}

function showPage() {
    document.getElementById('loadingAnimation').style.display = 'none'
    for (let i = 1; i < 4; i++) {
        document.getElementById(`mainSection${1}`).style.display = "block"
    }
}

let printToPDF = document.getElementById('printToPDF')
printToPDF.addEventListener('click', (e) = {})

let exit = document.getElementById('exit') 
exit.addEventListener('click', (e) => {
    history.back()
})

//send notices to 3