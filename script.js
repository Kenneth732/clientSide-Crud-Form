document.querySelector('#form-list').addEventListener('submit', (e) => {
    e.preventDefault(); 

    let newData = {
        name: e.target.name.value,
        image: e.target.image.value,
        description: e.target.description.value,
        donation: 0
    }
    renderOnePhoto(newData);
    handlePost(newData)
});

function renderOnePhoto(photo){
    let card = document.createElement('li');
    card.className = 'card';
    card.innerHTML = `
    <div class="image-list">
      <img src="${photo.image}" class="users">
    </div>
    <br>
    <div class="content">
        <h4>${photo.name}</h3>
            <p>
               $ <span class="donation-count">${photo.donation}</span> Donations
            </p>
            <br>
            <p>${photo.description}</p>
            <hr>
    </div>
    <div class="buttons">
        <button id="donate">Donate $10</button>
        <button id="set_free">Set free</button>
    </div>
      `;
      card.querySelector('#donate').addEventListener('click', () =>{
        photo.donation += 10
        card.querySelector('span').textContent = photo.donation
        handleUpdate(photo)
      });

      document.querySelector('#photo-list').appendChild(card)
}

function handleGetAll(){
    fetch('http://localhost:3000/dataRender')
    .then((res) => res.json())
    // .then(userData => userData.map(user => handleRender(user)))
    .then(userData => userData.forEach(user => renderOnePhoto(user)))
    .catch(error => console.error(error))
}

function handlePost(newData){
    fetch('http://localhost:3000/dataRender', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify(newData)
    }).then((res) => res.json())
    .then(userData => console.log(userData));
}

function handleUpdate(newData){
    fetch(`http://localhost:3000/photoData/${newData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': "application/json"
        },
        body:JSON.stringify(photoObj)
    }).then((res) => res.json()).then((photo) => console.log(photo))
}

function handleDelete(id){
    fetch(`http://localhost:3000/picData/${id}`, {
        method: 'DELETE',
        headers:{
            'Content-Type' : 'application/json'
        }
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Failed to delete photo data');
        }
        return response.json();
    })
    .then((data) => {
        console.log('Photo data deleted successfully:', data);
        // remove the deleted card from the DOM
        const cardToRemove = document.querySelector(`li[data-id="${id}"]`);
        if (cardToRemove) {
            cardToRemove.remove();
        }
    })
    .catch((error) => {
        console.error('Failed to delete photo data:', error);
    });
}

function handleInitialize(){
    handleGetAll();
}
handleInitialize();