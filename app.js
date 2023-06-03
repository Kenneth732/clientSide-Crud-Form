document.querySelector('#form').addEventListener('submit', async (e) => {
    e.preventDefault();
    try{
        let newObj = {
            name: e.target.name.value,
            image: e.target.image.value,
            description: e.target.description.value,
            donation: 0
        }
        const newUser = await handlePost(newObj)
        handleRenderOneUser(newObj)
    }catch(error){
        console.error(error)
        alert(`An error occurred: ${error}`);
    }
});


async function handleRenderOneUser(user){
    try{
        let card = document.querySelector('div')
        card.className = 'card'
        card.innerHTML = `
        <div class="image-list">
          <img src="${user.image}" class="users">
        </div>
        <br>
        <div class="content">
            <h4>${user.name}</h3>
            <p class="text-gray-700 text-base">
              $ <span class="donation-count">${user.donation}</span> :Donation
            </p>
                <br>
                <p>${user.description}</p>
                <hr>
        </div>
        <div class="buttons">
            <button id="donate">Donate $10</button>
            <button id="set_free">Set free</button>
        </div>
          `;
          document.querySelector('#user-list').appendChild(card);
    }catch(error){
        console.error(error)
        alert(`An error occurred: ${error}`);
    }
}

async function handleFetch(){
    try{
        const response = await fetch('http://localhost:3000/dataRender')
        if(! response.ok){
            throw Error('Failed to fetch user data.')
        }
        const userData = await response.json()
        userData.forEach((user) => handleRenderOneUser(user))
    } catch (error) {
        console.error(error);
        alert(`An error occurred: ${error}`);
    }
}

async function handlePost(newObj){
    try{
        const response = await fetch(`http://localhost:3000/dataRender`, {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify(newObj)
        }); if(! response.ok){
            throw new Error('Failed to adopt user.');
        }
        const user = await response.json();
        return user;
    } catch (error) {
        console.error(error);
        alert(`An error occurred: ${error}`);
      }
}

async function handleUpdate(newObj){
    try{
        const response = await fetch(`http://localhost:3000/dataRender/${newObj.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },body:JSON.stringify(newObj)
        });
        if(response.ok){
            throw new Error('Failed to adopt user.');
        }
    } catch (error) {
        console.error(error);
        alert(`An error occurred: ${error}`);
      }
}

async function handleDelete(id){
    try{
        const response = await fetch(`http://localhost:3000/dataRender/${id}`, {
            method: 'DELETE'
        });
        if (response.ok){
            throw new Error('Failed to delete user.');
        }
    } catch (error) {
        console.error(error);
        alert(`An error occurred: ${error}`);
      }
}