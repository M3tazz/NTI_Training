const myBut = document.getElementById("but");
const three = document.getElementById("users");

myBut.addEventListener("click", async () => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Request failed: " + response.status);
      }
      return response.json();
    })
    .then((users) => {
      const myUsers = users.slice(0, 3);
      // // console.log(myUsers);
      let i = 1;
      myUsers.forEach((x) => {
        //   // x.name , x.username , x.email
        const li = document.createElement("div");
        li.innerHTML = `
            <p>User ${i++}</p>
            <li>${x.name}</li>
            <li>${x.username}</li>
            <li>${x.email}</li>
            ---------------------------
          `;
        three.appendChild(li);
      });
    })
    // then catch
    .catch((error) => {
      console.error(error);
      three.innerHTML = '<li style="color:red">⚠️ Could not load users</li>';
    });
});
