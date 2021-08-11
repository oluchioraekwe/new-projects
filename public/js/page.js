const weatherForm = document.getElementById("mainForm");
const search = document.getElementById("inputText");
const errorMessageEl = document.getElementById("errorMessage");
const weatherEl = document.getElementById("forecast");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  console.log(location);
  errorMessageEl.textContent = `Message loading...`;
  weatherEl.textContent = "";
  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          errorMessageEl.textContent = data.error;
          weatherEl.textContent = "";
        } else {
          weatherEl.textContent = `${data.forecast}`;
          errorMessageEl.textContent = " ";
          console.log(data.location);
          console.log(data.forecast);
        }
      });
    }
  );
});
