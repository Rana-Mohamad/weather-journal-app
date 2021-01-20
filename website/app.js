// Personal API Key for OpenWeatherMap API
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&appid=b628750aa39ad54a724a19fa24fd091e';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);
//Function called by event listener
function performAction(event){
  //get user input values
  const newZip = document.getElementById('zip').value;
  const feeling = document.getElementById('feelings').value;

  getWeather(baseURL, newZip, apiKey)
  .then(function(data) {
    //add data to POST request
    postData('/add', { temp: data.main.temp, date: newDate, response: feeling });
  })
  .then(function() {
    updateUI();
  });
};
/* Function to GET Web API Data*/
const getWeather = async (baseURL, newZip, apiKey) => {
  const res = await fetch(baseURL+newZip+apiKey);

  try {
    const data = await res.json();
    return data;
  }
  catch(error) {
    console.log("error", error);
  };
};

/* Function to POST data */
const postData = async ( url = '' , data = {} ) => {
  const req = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  try {
    const newData = await req.json();
    return newData
  }
  catch(error) {
    console.log('error', error);
  };
}

/* Function to GET Project Data */
//update user interface
const updateUI = async () => {
  const req = await fetch('/all');
  try {
    const allData = await req.json();
    document.getElementById('temp').innerHTML = "temperature: "+ allData.temp;
    document.getElementById('date').innerHTML = "date: "+ allData.date;
    document.getElementById('content').innerHTML = "feeling: "+allData.response;
  }
  catch(error) {
    console.log('error', error);
  };
};
