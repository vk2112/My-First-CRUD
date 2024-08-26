document.getElementById('posts').addEventListener('click', () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json()) // Parse the JSON from the response
        .then(data => {

            console.log(data);
            // console.log(data[1], data[1].title);
            // console.log(data[2], data[4].title);

 // Clear the container before adding new posts

            data.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
            const postOver = data.filter((post) => { return post.title.length > 24 });
            const postBelow = data.filter((post) => { return post.title.length <= 24 });

            UiOver(postOver)
            Ui(postBelow)
            console.log('postOver', postOver);

        })
        .catch(error => console.error('Error fetching data:', error));
});


// generating random colors
function randomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// posts UI
const Ui = (data) => {

    const postsContainer = document.getElementById('post-container');
    postsContainer.innerHTML = '';

    data.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';

        // const h1 =document.createElement('h1');
        // h1.textContent = post.title;
        // const p = document.createElement('p');
        // p.textContent = post.body;
        // postElement.appendChild(h1);
        // postElement.appendChild(p);

        postElement.innerHTML = `
        <h2 id="post-title-${post.id}">${post.title}</h2>
        <p id="post-body-${post.id}">${post.body}</p>
        <button class="edit-btn" data-id = ${post.id}>Edit</button>                    
        <button class="delete-btn" data-id = "${post.id}">Delete</button>
    `;

        postElement.style.backgroundColor = randomColor();
        postsContainer.appendChild(postElement);
        postElement.querySelector('.delete-btn').addEventListener('click', function () {
            deletepost(post.id, postElement);

        });

        // Edit post
        postElement.querySelector('.edit-btn').addEventListener('click', function () {
            document.getElementById('edit-form').style.display = 'block';
            document.getElementById('input-title').value = post.title;
            document.getElementById('input-body').value = post.body;
            document.getElementById('update-btn').setAttribute('data-id', post.id);
        });
    });
}

// posts UI
const UiOver = (data) => {

    const postsContainer1 = document.getElementById('post-over24');
    postsContainer1.innerHTML = '';

    data.forEach(post => {
        const postElement1 = document.createElement('div');
        postElement1.className = 'post';

        // const h1 =document.createElement('h1');
        // h1.textContent = post.title;
        // const p = document.createElement('p');
        // p.textContent = post.body;
        // postElement.appendChild(h1);
        // postElement.appendChild(p);

        postElement1.innerHTML = `
        <h2 id="post-title-${post.id}">${post.title}</h2>
        <p id="post-body-${post.id}">${post.body}</p>
        <button class="edit-btn" data-id = ${post.id}>Edit</button>                    
        <button class="delete-btn" data-id = "${post.id}">Delete</button>
    `;
        postElement1.style.backgroundColor = randomColor();
        postsContainer1.appendChild(postElement1);
        postElement1.querySelector('.delete-btn').addEventListener('click', function () {
            deletepost(post.id, postElement1);

        });

        // Edit post
        postElement1.querySelector('.edit-btn').addEventListener('click', function () {
            document.getElementById('edit-form').style.display = 'block';
            document.getElementById('input-title').value = post.title;
            document.getElementById('input-body').value = post.body;
            document.getElementById('update-btn').setAttribute('data-id', post.id);
        });
    });
}

// delete method
function deletepost(postId, postElement) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: 'DELETE',
    })

        .then(response => response.json())
        .then(data => {
            console.log('post deleted', data)
            postElement.remove();
        })
        .catch(error => console.error('error deleting post', error));
}

// Put method to update the post
function updatePost(postId, updateData) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
    })
        .then(response => response.json())
        .then(post => {
            console.log('Post updated', post);

            document.getElementById(`post-title-${postId}`).textContent = post.title;
            document.getElementById(`post-body-${postId}`).textContent = post.body;

            document.getElementById('edit-form').style.display = 'none';
        })
        .catch(error => console.error('Error updating post', error));
}

// Handle the update button click
document.getElementById('update-btn').addEventListener('click', () => {
    const postId = document.getElementById('update-btn').getAttribute('data-id');
    const updatedTitle = document.getElementById('input-title').value;
    const updatedBody = document.getElementById('input-body').value;
    console.log('update all');

    const updateData = {
        title: updatedTitle,
        body: updatedBody,
    };

    updatePost(postId, updateData);
});

// Create-post button handdling

document.getElementById('create-post').addEventListener('click', () => {
    document.getElementById('create-form').style.display = 'block';
})

// submit button handdling

document.getElementById('submit-post').addEventListener('click', () => {
    const newTitle = document.getElementById('new-title').value;
    const newBody = document.getElementById('new-body').value;

    const newPost = {
        title: newTitle,
        body: newBody
    };

    createPost(newPost);
})

// post method

function createPost(postData) {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData),
    })

        .then(response => response.json())
        .then(post => {
            console.log('post created', post);
            Ui(data);


            document.getElementById('create-form').style.display = 'none';
        })

        .catch(error => console.error('error creating post', error))
}
