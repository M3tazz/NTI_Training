const myBut = document.getElementById("but");
const three = document.getElementById("posts");

myBut.addEventListener("click", async () => {
  try {
    const data = await fetch("https://jsonplaceholder.typicode.com/posts");
    const Posts = await data.json();
    // console.log(Posts);
    const lastFivePosts = Posts.slice(-5);
    // console.log(lastFivePosts);
    three.innerHTML = "";
    let i = 1;
    lastFivePosts.forEach((x) => {
      const li = document.createElement("div");
      li.innerHTML = `
        <p>Post ${i++}</p>
        <li>${x.userId}</li>
        <li>${x.title}</li>
        <li>${x.body}</li>
        ---------------------------------------------------------------------------------------------------------
        `;
      three.appendChild(li);
    });
  } catch (error) {
    console.error(error);

    three.innerHTML =
      "<li style={{color:red}}>⚠️ Posts could not be loaded</li>";
  }
});
