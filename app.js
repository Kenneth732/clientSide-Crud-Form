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


