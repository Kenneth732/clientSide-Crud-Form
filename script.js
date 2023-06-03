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

