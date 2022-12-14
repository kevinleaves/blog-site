//dummy data
var dummyData = [
  {
  'user': 'kevin',
  'title': 'sunday recap',
  'body': 'hooped, went to whole foods, worked on app',
  'date': '08/14/22',
  'isRendered': false,
  },
  {
  'user': 'kenny',
  'title': 'king of the court was sick',
  'body': 'i crossed han up so bad lol.',
  'date': '08/14/22',
  'isRendered': false,
  },
  {
  'user': 'timmy',
  'title': 'sunday is for chillin',
  'body': 'went to the beach 2day it\'s whateva',
  'date': '08/14/22',
  'isRendered': false,
  },
  {
  'user': 'han',
  'title': 'i can\'t shoot a jumpshot going right',
  'body': 'i kept getting blocked today',
  'date': '08/14/22',
  'isRendered': false,
  },
  {
  'user': 'roger',
  'title': 'good games today',
  'body': 'pull-up jumpshot lookin NICE',
  'date': '08/14/22',
  'isRendered': false,
  },      
]

let callCount = 0

//function to create randomly generated dummy posts every 1 second
function generateDummyPost() {
  
  //create word banks
  var users = ['timmy', 'kenny', 'roger', 'han', 'george', 'hao', 'kevin', 'johnny',
  'gianna', 'courtney', 'cindy', 'amanda', 'steven', 'saad'
  ]
  
  var adjectives = ['beautiful', 'magestic', 'tragic', 'fun', 'exciting', 'splendid',
  'fantastic', 'tiring', 'unlucky', 'melancholy', 'supercalifragilisticexpialidocious'
  ]

  var subjects = ['timmy', 'kenny', 'roger', 'han', 'george', 'hao', 'kevin',
  'he', 'she', 'they', 'those guys', 'those girls',
  ]

  var verbs = ['crossed over', 'threw', 'drank', 'sipped', 'ate', 'walked',
  'ran', 'wrote', 'read', 'held', 'spun', 'lifted', 'saw',
  ]

  var objects = ['basketball', 'football', 'apple', 'banana', 'book', 'cup of water', 'bottle',
  'sandwich', 'bird', 'cat', 'Mickey Mouse', 'dog', 'television', 'fire',
  ]

  //generate random user using word banks
  var randomUser = users[Math.floor(Math.random() * users.length)]
  
  //generate random title using word banks
  var randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)]
  var randomTitle = `today was ${randomAdjective}`

  //generate random body string using word banks
  var randomSubject = subjects[Math.floor(Math.random() * subjects.length)]
  var randomVerb = verbs[Math.floor(Math.random() * verbs.length)]
  var randomObj = objects[Math.floor(Math.random() * objects.length)]
  var randomBody = `${randomTitle} because ${randomSubject} ${randomVerb} the ${randomObj}.`

  //date is current date whenever the site is accessed
  var currentDate = new Date(Date());
  var currentDateStr = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}\
   - ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`
  
  //push to dummy data array  
  var randomPost = {
    'user': randomUser,
    'title': randomTitle,
    'body': randomBody,
    'date': currentDateStr, 
    'isRendered': false,
  }
  dummyData.push(randomPost)
  callCount++
}


//generates post every 1 second in the background upon site load
setInterval(function() {
  generateDummyPost();
}, 1000)

const updateButton = document.getElementById('update');
updateButton.addEventListener('click', function() {
  renderPosts(dummyData);
  console.log('callcount before: ', callCount)
  callCount = 0;
  console.log('callcount after: ', callCount)
});

//render a single post given a post object
function renderPost(postObj) {
  var post = document.createElement('div');
  post.classList.add('post')

  //create child divs for each obj key
  var user = document.createElement('div');
  user.classList.add('postUser');
  user.addEventListener('click', (event) => {
    console.log(event)
    //clears timeline
    var timeline = document.getElementById('timeline');
    timeline.replaceChildren();

    //filters dummyData according to the value of the username clicked
    var filtered = dummyData.filter(postObj => postObj.user === event.target.innerHTML);
    console.log(filtered)
    console.log(dummyData)
    //flips rendered flag to false
    for (var i = 0; i < filtered.length; i++) {
      filtered[i].isRendered = false;
      console.log(filtered[i])
    }
    
    //iterate through filtered dummyData and renders every post
    renderPosts(filtered);
  })
  
  var title = document.createElement('div');
  title.classList.add('postTitle');

  var date = document.createElement('div');
  date.classList.add('postDate');

  var body = document.createElement('div');
  body.classList.add('postBody');

  //populate all divs with text content
  user.textContent = postObj.user;
  title.textContent = postObj.title;
  date.textContent = postObj.date;
  body.textContent = postObj.body;
  
  //add children to post
  post.appendChild(user)
  post.appendChild(title)
  post.appendChild(date)
  post.appendChild(body)

  //append post to timeline
  timeline.prepend(post);

  //once rendered, flip the value to true
  postObj.isRendered = true;
}

//renders dummyData to DOM
function renderPosts(arr) {
  for (var i = 0; i < arr.length; i++) {
    //if object not already rendered, render it
    if (arr[i].isRendered === false) {
      renderPost(arr[i]);
    }
  }
}

//initial rendering of dummyData
renderPosts(dummyData)

function addPost () {
  //save user input to an object
  var newPost = {
    'user': document.getElementById('user').value,
    'title': document.getElementById('title').value,
    'date': document.getElementById('date').value,
    'body': document.getElementById('body').value,
    'isRendered': false,
  }

  //add it to dummydata
  dummyData.push(newPost);

  //render the newly created post
  renderPost(newPost);
  
  //reset all input fields
  document.getElementById('user').value = ''
  document.getElementById('title').value = ''
  document.getElementById('date').value = ''
  document.getElementById('body').value = ''
}

//on post button click, call addPost
var submit = document.getElementById('submit');
submit.addEventListener('click', () => {
  addPost()
});


//make logo render all posts again on click
//event handler for h1
var logo = document.querySelector('h1')
logo.addEventListener('click', () => {
  //clear timeline
  var timeline = document.getElementById('timeline');
  timeline.replaceChildren();

  //flip all rendered dummydata to false  
  for (var i = 0; i < dummyData.length; i++) {
    dummyData[i].isRendered = false;
  }

  //re-render all dummydata
  renderPosts(dummyData)
});


//show the update button only after 10 new tweets are created
function checkUpdateButton() {
  if (callCount < 10) {
    updateButton.style.visibility = 'hidden'
  } else {
    updateButton.style.visibility = 'visible'
  }
  console.log(callCount)
}

setInterval(() => {
  checkUpdateButton(), 1000;
})












