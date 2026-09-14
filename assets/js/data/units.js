/* ============ CONTENT DATA ============ */

const UNITS = {
  gs: {
    id:'gs', title:'Getting Started', subtitle:'Classroom English & Basic Vocabulary', icon:'🚀', color:'blue',
    vocab: [
      ['below','למטה','in a lower position','Write your answer below the question.'],
      ['complete','להשלים','finish something','Please complete the task.'],
      ['dictionary','מילון','a book with word meanings','Look up the word in a dictionary.'],
      ['find out','לגלות','discover information','Read the sign to find out what it says.'],
      ['instructions','הוראות','directions on how to do something','Read the instructions carefully.'],
      ['opposite','הפך','completely different','The opposite of hot is cold.'],
      ['raise','להרים','move something up','Raise your hand, please.'],
      ['repeat','לחזור','say or do again','Please repeat the sentence.'],
      ['spell','לאיית','say or write the letters of a word','Can you spell your name?'],
      ['vocabulary','אוצר מילים','words you know in a language','We learn new vocabulary every lesson.'],
      ['conversation','שיחה','a talk between people','Listen to the conversation.'],
      ['correct','נכון','right, with no mistakes','Choose the correct answer.'],
      ['describe','לתאר','say what something is like','Describe the picture.'],
      ['document','מסמך','a written or printed paper','Put the document in the folder.'],
      ['example','דוגמה','something that shows a rule','Give an example of a color.'],
      ['first name','שם פרטי','your personal name','Write your first name here.'],
      ['folder','תיקייה','a cover for keeping papers','Open your folder.'],
      ['guess','לנחש','give an answer without being sure','Guess the answer.'],
      ['keyboard','מקלדת','the keys used to type','Type your name on the keyboard.'],
      ['quiz','בוחן','a short test','We have a quiz today.'],
      ['surname','שם משפחה','your family name','Write your surname here.'],
      ['task','משימה','a piece of work to do','Complete the task.']
    ],
    matchWords: ['raise','dictionary','complete','repeat','spell','vocabulary'],
    practiceQ: [
      {p:"Read the sign to ___ what it says.", o:["find out","raise","guess"], a:"find out"},
      {p:"We learn new ___ in our English lessons.", o:["vocabulary","folder","opposite"], a:"vocabulary"},
      {p:"Can you please ___ your name for me?", o:["spell","raise","describe"], a:"spell"},
      {p:"The teacher wants us to ___ five sentences.", o:["complete","guess","below"], a:"complete"},
      {p:"Put the ___ in the folder.", o:["document","example","quiz"], a:"document"},
      {p:"I always ___ my hand before I speak.", o:["raise","spell","repeat"], a:"raise"},
      {p:"Which sentence uses \"repeat\" correctly?", o:["Please repeat the sentence.","Please repeat your chair.","Please repeat your pencil."], a:"Please repeat the sentence."},
      {p:"Which sentence uses \"spell\" correctly?", o:["Can you spell the word?","Can you spell the folder?","Can you spell the quiz?"], a:"Can you spell the word?"},
      {p:"Which sentence uses \"describe\" correctly?", o:["Describe the picture.","Describe the keyboard's color loudly.","Describe the dictionary shape."], a:"Describe the picture."},
      {p:"Which sentence uses \"guess\" correctly?", o:["Guess the answer.","Guess your surname now.","Guess the folder color."], a:"Guess the answer."}
    ],
    classroom:{
      pairs:[
        ["Raise your hand.","תרימו את היד"],["Complete the task.","תשלימו את המשימה"],
        ["Listen to the conversation.","הקשיבו לשיחה"],["Spell the word.","אייתו את המילה"],
        ["Read the instructions.","קראו את ההוראות"],["Open your folder.","פתחו את התיקייה"],
        ["Write your surname.","כתבו את שם המשפחה"],["Guess the answer.","נחשו את התשובה"]
      ],
      situational:[
        {p:"A student wants to answer a question. What should the teacher say?", o:["Raise your hand.","Open your folder.","Spell your surname."], a:"Raise your hand."},
        {p:"The teacher wants students to look up a word's meaning. What should she say?", o:["Use a dictionary.","Complete the task.","Guess the answer."], a:"Use a dictionary."},
        {p:"The teacher wants students to say something again. What should she say?", o:["Repeat, please.","Raise your hand.","Open your folder."], a:"Repeat, please."}
      ]
    },
    sentenceBuilder:{
      items:[
        {words:["hand","your","raise","please"], correct:"please raise your hand"},
        {words:["the","task","complete"], correct:"complete the task"},
        {words:["conversation","the","listen","to"], correct:"listen to the conversation"},
        {words:["your","first","write","name"], correct:"write your first name"}
      ],
      freeWord:'dictionary'
    },
    speaking:[
      "What is your first name?","What is your surname?","What languages do you speak?",
      "What is your favorite color?","What is your favorite food?","What is your favorite number?",
      "What is your best friend's first name?","Describe your best friend."
    ],
    writing:{ prompt:"Write 4 sentences about yourself.", starters:["My first name is ___.","My surname is ___.","I like ___.","My favorite ___ is ___."] },
    challenge:{
      situations:[
        {p:"You don't understand what the teacher said. What can you say?", o:["Can you repeat, please?","Open your folder.","Guess the answer."], a:"Can you repeat, please?"},
        {p:"The teacher wants you to write your family name. Which word means family name?", o:["surname","first name","folder"], a:"surname"},
        {p:"You don't know what a word means. What can you use?", o:["a dictionary","a quiz","a task"], a:"a dictionary"}
      ],
      vocabPower:['task','folder','quiz','describe'],
      createPrompt:"Write 2–3 things you like to do at school. Use: \"I like to...\""
    },
    finalQuiz:[
      {type:'mc', p:"Please ___ your hand.", o:["raise","spell","guess"], a:"raise"},
      {type:'mc', p:"We learn new ___ in class.", o:["vocabulary","opposite","folder"], a:"vocabulary"},
      {type:'mc', p:"Can you ___ your name?", o:["spell","raise","guess"], a:"spell"},
      {type:'mc', p:"What is the Hebrew meaning of \"dictionary\"?", o:["מילון","תיקייה","משימה"], a:"מילון"},
      {type:'mc', p:"A student wants to answer. What should the teacher say?", o:["Raise your hand.","Spell your surname.","Open your folder."], a:"Raise your hand."},
      {type:'mc', p:"What does \"surname\" mean?", o:["family name","first name","a short test"], a:"family name"},
      {type:'mc', p:"Put the words in the correct order: the / task / complete", o:["Complete the task.","Task complete the.","The complete task."], a:"Complete the task."},
      {type:'mc', p:"Put the words in the correct order: conversation / the / listen / to", o:["Listen to the conversation.","To the conversation listen.","Conversation listen to the."], a:"Listen to the conversation."},
      {type:'open', p:"What is your favorite color?"},
      {type:'open', p:"Write one sentence using the word \"folder\"."}
    ]
  },

  japan: {
    id:'japan', title:'A Trip to Japan (Unit 1)', subtitle:'Vocabulary • Grammar • Reading • Writing', icon:'🗾', color:'orange',
    vocab: [
      ['afraid','פוחד','feeling fear','I am afraid of dogs.'],
      ['glad','שמח','happy about something','I\'m glad you like it.'],
      ['leave','להשאיר','let something stay behind','Please leave your shoes at the door.'],
      ['order','להזמין','ask for something','You can order food at a restaurant.'],
      ['team','קבוצה','a group who play or work together','I love my football team.'],
      ['anything','כל דבר','any thing at all','I can\'t see anything in the dark.'],
      ['hit','להכות','strike something','He can hit the ball far.'],
      ['love','לאהוב','like very much','I love ice cream.'],
      ['pick','לבחור','choose something','Pick a color you like.'],
      ['island','אי','land surrounded by water','Japan is an island.'],
      ['million','מיליון','1,000,000','More than five million people live there.'],
      ['popular','פופולרי','liked by many people','Football is a popular sport.'],
      ['about','בערך','approximately','I wake up at about seven o\'clock.'],
      ['famous','מפורסם','known by many people','She is a famous singer.'],
      ['reason','סיבה','why something happens','What is the reason for the change?'],
      ['several','כמה','more than two, but not many','I have several books.'],
      ['thousand','אלף','1,000','The stadium has a thousand seats.'],
      ['clever','חכם','smart','The girl is very clever.'],
      ['mountain','הר','a very high hill','There\'s snow on the mountain.'],
      ['return','לחזור','come back','The monkeys return to the mountain.'],
      ['still','עדיין','continuing until now','She is still in bed.'],
      ['decide','להחליט','choose after thinking','I decided to buy the blue hat.'],
      ['nature','טבע','the natural world','The movie is about nature.'],
      ['the cold','הקור','cold weather','The monkeys enjoy the cold.']
    ],
    matchWords: ['island','popular','afraid','glad','team','million'],
    practiceQ:[
      {p:"I can't see ___ because it's dark.", o:["anything","several","famous"], a:"anything"},
      {p:"Japan is an ___.", o:["island","reason","team"], a:"island"},
      {p:"Football is a very ___ sport.", o:["popular","clever","still"], a:"popular"},
      {p:"I'm ___ you like my new shirt.", o:["glad","afraid","decide"], a:"glad"},
      {p:"There are ___ cookies on the plate.", o:["several","million","mountain"], a:"several"},
      {p:"The man is ___. Everybody knows him.", o:["famous","popular","clever"], a:"famous"},
      {p:"Which sentence uses \"afraid\" correctly?", o:["I'm afraid of dogs.","I'm afraid of the folder.","I'm afraid of dictionary."], a:"I'm afraid of dogs."},
      {p:"Which sentence uses \"popular\" correctly?", o:["Football is popular in Israel.","Football is popular the cold.","Football is popular island."], a:"Football is popular in Israel."},
      {p:"Which sentence uses \"order\" correctly?", o:["You can order food at a restaurant.","You can order the mountain.","You can order clever."], a:"You can order food at a restaurant."},
      {p:"Which sentence uses \"clever\" correctly?", o:["The girl is clever.","The girl is clever homework.","The girl is clever quiz."], a:"The girl is clever."}
    ],
    grammar:{
      toBe:[
        {p:"She ___ a tall girl.", o:["am","is","are"], a:"is"},
        {p:"I ___ a good student.", o:["am","is","are"], a:"am"},
        {p:"We ___ in the same class.", o:["is","are","am"], a:"are"},
        {p:"The boys ___ at school.", o:["is","are","am"], a:"are"},
        {p:"It ___ not my notebook.", o:["am","is","are"], a:"is"}
      ],
      toHave:[
        {p:"I ___ a nice teacher.", o:["have","has","am"], a:"have"},
        {p:"Ofek ___ a new computer.", o:["have","has","is"], a:"has"},
        {p:"They ___ brown hair.", o:["have","has","are"], a:"have"},
        {p:"My friend and I ___ homework.", o:["has","have","am"], a:"have"}
      ],
      questions:[
        {p:"___ you from England?", o:["Am","Is","Are"], a:"Are"},
        {p:"___ it cold outside?", o:["Am","Is","Are"], a:"Is"},
        {p:"___ is your name?", o:["What","Who","When"], a:"What"},
        {p:"___ is the test?", o:["Who","When","What"], a:"When"},
        {p:"___ is my pencil?", o:["Where","Why","Who"], a:"Where"},
        {p:"___ are your friends?", o:["What","Who","Where"], a:"Who"}
      ],
      detective:[
        {wrong:"He are afraid.", right:"He is afraid."},
        {wrong:"They is at school.", right:"They are at school."},
        {wrong:"I is glad.", right:"I am glad."},
        {wrong:"She have a dog.", right:"She has a dog."},
        {wrong:"Japan are an island.", right:"Japan is an island."}
      ]
    },
    sentenceBuilder:{
      items:[
        {words:["Japan","island","is","an"], correct:"japan is an island"},
        {words:["afraid","dogs","I","am","of"], correct:"i am afraid of dogs"},
        {words:["team","my","love","I"], correct:"i love my team"},
        {words:["very","popular","Japan","is"], correct:"japan is very popular"}
      ],
      freeWord:'island'
    },
    reading:{
      passage:"Maya is twelve years old. She loves animals. She has a small dog. His name is Rex. Rex is brown and white. He has big ears. Maya is very glad when she plays with him.",
      find:"How old is Maya?",
      tf:{p:"Maya has a cat.", a:false},
      choose:{p:"What color is Rex?", o:["Black","Brown and white","Green"], a:"Brown and white"},
      think:"Why do you think Maya likes Rex?"
    },
    speaking:[
      "Are you afraid of anything?","What country would you like to visit?","Who is your best friend?",
      "What sport is popular in your school?","Do you have a pet?","What places do you love?",
      "Are you glad when school finishes?"
    ],
    writing:{ prompt:"Write 4–5 sentences about a friend.", starters:["My friend's name is ___.","He / She is ___ years old.","He / She has ___.","He / She loves ___.","We ___ together."] },
    challenge:{
      detective:[
        {wrong:"Japan are an island.", right:"Japan is an island."},
        {wrong:"People is friendly.", right:"People are friendly."},
        {wrong:"She have a dog.", right:"She has a dog."},
        {wrong:"They is glad.", right:"They are glad."}
      ],
      vocabPower:['popular','island','love','million'],
      createPrompt:"Imagine you are going on a trip to Japan. Write three things you would like to do. Use: \"I would like to...\""
    },
    finalQuiz:[
      {type:'mc', p:"What is the Hebrew meaning of \"island\"?", o:["אי","הר","אלף"], a:"אי"},
      {type:'mc', p:"What is the Hebrew meaning of \"popular\"?", o:["פופולרי","עדיין","סיבה"], a:"פופולרי"},
      {type:'mc', p:"I can't see ___ because it's dark.", o:["anything","several","famous"], a:"anything"},
      {type:'mc', p:"Football is a very ___ sport.", o:["popular","clever","still"], a:"popular"},
      {type:'mc', p:"She ___ my friend.", o:["am","is","are"], a:"is"},
      {type:'mc', p:"They ___ homework.", o:["has","have","am"], a:"have"},
      {type:'mc', p:"___ you from Israel?", o:["Am","Is","Are"], a:"Are"},
      {type:'mc', p:"Put in order: Japan / island / is / an", o:["Japan is an island.","Island is an Japan.","An Japan is island."], a:"Japan is an island."},
      {type:'mc', p:"(Reading) What color is Rex?", o:["Black","Brown and white","Green"], a:"Brown and white"},
      {type:'open', p:"Write one sentence about a friend using the word \"has\"."}
    ]
  }
};

const BADGE_DEFS = [
  {id:'vocabMaster', icon:'⭐', label:'Vocabulary Master'},
  {id:'sentenceBuilderB', icon:'⭐', label:'Sentence Builder'},
  {id:'grammarDetective', icon:'⭐', label:'Grammar Detective'},
  {id:'readingExplorer', icon:'⭐', label:'Reading Explorer'},
  {id:'englishSpeaker', icon:'⭐', label:'English Speaker'},
  {id:'englishWriter', icon:'⭐', label:'English Writer'},
  {id:'unitCompletedGs', icon:'🏆', label:'Getting Started — Completed'},
  {id:'unitCompletedJapan', icon:'🏆', label:'A Trip to Japan — Completed'}
];

export { UNITS, BADGE_DEFS };
