let followersCount;
let profilePic;
let name;
let repositoriesCount;

document.getElementById("followButton").addEventListener("click", function () {
    
    const inputElement = document.getElementById("githubUrl")

    const userName = inputElement.value;

    const githubUrl = `https://api.github.com/users/${userName}`

   
    const xhr = new XMLHttpRequest();
    xhr.open('GET', githubUrl);
    xhr.onreadystatechange = function () {
        console.log(xhr.readyState);
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                followersCount = data.followers;
                profilePic = data.avatar_url;
                name = data.name;
                repositoriesCount = data.public_repos;
                console.log(data);


                updateDOM();
            } else {
                console.error('Error fetching GitHub data:', xhr.statusText);
            }
        }
    };
    xhr.send();
});


function updateDOM() {
    document.getElementById("profile").innerHTML = `<img src="${profilePic}" alt="Profile Picture" width="100%" >`;
    document.getElementById("name").innerText = `Name: ${name}`;
    document.getElementById("followers").innerText = `Followers: ${followersCount}`;
    document.getElementById("repo").innerText = `Public Repositories: ${repositoriesCount}`;
}
