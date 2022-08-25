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
  var currentDateStr = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`
  
  //push to dummy data array  
  var randomPost = {
    'user': randomUser,
    'title': randomTitle,
    'body': randomBody,
    'date': currentDateStr, 
    'isRendered': false,
  }
  dummyData.push(randomPost)
}

//generates post every 1 second in the background upon site load
setInterval(function() {
  generateDummyPost();
}, 1000)

const updateButton = document.getElementById('update');
updateButton.addEventListener('click', function() {
  renderPosts(dummyData)
});

//render a single post given a post object
function renderPost(postObj) {
  var post = document.createElement('div');
  post.classList.add('post')

  //create child divs for each obj key
  var user = document.createElement('div');
  var title = document.createElement('div');
  var date = document.createElement('div');
  var body = document.createElement('div');

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
  for (var i = arr.length-1; i >= 0; i--) {
    //if object not already rendered, render it
    if (arr[i].isRendered === false) {
      renderPost(arr[i]);
    }
  }
}

renderPosts(dummyData)


// function renderPost() {
//   var post = document.createElement('div');
//   post.classList.add('post')
// }
// {
//   'body': body.value,
// }

// timeline.appendChild(post)

function addPost () {
  var newPost = {
    'user': document.getElementById('user').value,
    'title': document.getElementById('title').value,
    'date': document.getElementById('date').value,
    'body': document.getElementById('body').value,
    'isRendered': false,
  }
  
  dummyData.push(newPost);
  renderPost(newPost);

  document.getElementById('user').value = ''
  document.getElementById('title').value = ''
  document.getElementById('date').value = ''
  document.getElementById('body').value = ''
}

var submit = document.getElementById('submit');
submit.addEventListener('click', () => {
  addPost()
});
//on post button click
//save user input to an object, add it to dummydata
//render that object to dom (call renderPosts)
//reset the input fields

