document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const added = document.querySelector('#added');
    const clr = document.querySelector('#clear');

    const responseDataDiv = document.getElementById('responseDataDiv');

    const savedResponses = JSON.parse(localStorage.getItem('responses')) || [];
    displayAllResponses(savedResponses);

    form.addEventListener('submit', function (x) {
        x.preventDefault();
        const name = document.querySelector('.p-name').value;
        const description = document.querySelector('.p-description').value;
        const link = document.querySelector('.p-link').value;
        const image = document.querySelector('.p-image').value;
        
        if (name === '' || description === '' || link === '' || image === '') {
            added.innerHTML = 'Please Fill All Data!'; 
            added.style.color = 'red';  
        } else {
            added.innerHTML = 'Project Added';
            added.style.color = 'green';  

            const formData = {
                name: name,
                description: description,
                link: link,
                image: image
            };

            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                saveResponseData(data);
                displayAllResponses(savedResponses);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    });

    clr.addEventListener('click', function () {
        alert('Are You Sure!');
        localStorage.removeItem('responses');
        savedResponses.length = 0;
        displayAllResponses(savedResponses);
        added.innerHTML = 'All Projects Cleared';
        added.style.color = 'red';
    });

    function displayAllResponses(responses) {
        responseDataDiv.innerHTML = ''; // Clear current content
        responses.forEach(data => {
            responseDataDiv.innerHTML += `
                <a href="${data.link}">
                    <div class="pp-box border d-flex mb-5">
                        <div class="child-1 me-5 m-1">
                            <img class="p-img" src="${data.image}" alt="${data.name} image">
                        </div>
                        <div class="child-2 m-1 ms-5">
                            <h1>${data.name}</h1>
                            <p>${data.description}</p>
                        </div>
                    </div>
                </a>
            `;
        });
    }

    function saveResponseData(data) {
        savedResponses.push(data);
        localStorage.setItem('responses', JSON.stringify(savedResponses));
    }
});

    
