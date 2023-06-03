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

