const apiURL = "https://api.github.com/users/";
const main = document.querySelector(".main");
const btn = document.querySelector(".btn");
const input = document.querySelector("#user");
const errorElement = document.querySelector(".error");

const createUserCard = (user) => {
  const now = new Date(user.created_at);
  const options = { month: "long" };
  const date = `${now.getDate()}`.padStart(2, 0);
  const month = new Intl.DateTimeFormat("en-US", options).format(now);
  const year = now.getFullYear();

  main.classList.remove("display");
  // if (errorElement.contains("display")) {
  //   errorElement.classList.remove("display");
  // }

  const HTMLCard = `
        <img class="userImg" src=${user.avatar_url} alt="" />
        <div class="user-info">
          <div class="info">
            <h2 class="userName">${user.name}</h2>
            <h3 class="joining-date">${date} ${month} ${year}</h3>
          </div>
          <p class="bio">${
            user.bio == null ? "This profile has no bio" : user.bio
          }</p>
          <div class="stats">
            <div class="stat">
              <h3 class="stat-detail">Repos</h3>
              <h3 id="repo">${user.public_repos}</h3>
            </div>
            <div class="stat">
              <h3 class="stat-detail">Followers</h3>
              <h3 id="followers">${user.followers}</h3>
            </div>
            <div class="stat">
              <h3 class="stat-detail">Following</h3>
              <h3 id="following">${user.following}</h3>
            </div>
          </div>
          <div class="social-handles">
            <div class="socials">
              <img src="assets/icon-location.svg" alt="" />
              <h3>${user.location}</h3>
            </div>
            <div class="socials">
              <img src="assets/icon-twitter.svg" alt="" />
              <h3>${
                user.twitter_username == null
                  ? "Not available"
                  : user.twitter_username
              }</h3>
            </div>
            <div class="socials">
              <img src="assets/icon-website.svg" alt="" />
              <h3>${user.blog.length <= 0 ? "Not avaialable" : user.blog}</h3>
            </div>
            <div class="socials">
              <img src="assets/icon-company.svg" alt="" />
              <h3>${user.company == null ? "Not available" : user.company}</h3>
            </div>
          </div>
        </div>
  `;
  main.innerHTML = HTMLCard;
};

//Searching User
btn.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const user = input.value;
    const response = await fetch(apiURL + user);
    const data = await response.json();
    console.log(data);
    if (errorElement.classList.contains("display")) {
      errorElement.classList.add("display");
      createUserCard(data);
    } else {
      createUserCard(data);
    }
    // createUserCard(data)
    input.value = "";
  } catch (error) {
    console.log(error.message);
    errMsg();
  }
});

// Error class
const errMsg = () => {
  errorElement.classList.remove("display");
  errorElement.textContent = "No result";
};
