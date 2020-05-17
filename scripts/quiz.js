var start = document.querySelector("#start");
var quiz = document.querySelector("#quiz");
var question = document.querySelector("#question");
var qImg = document.querySelector("#qImg");
var choiceA = document.querySelector("#A");
var choiceB = document.querySelector("#B");
var choiceC = document.querySelector("#C");
var choiceD = document.querySelector("#D");
var timer = document.querySelector("#timer");

var questions = [
    {
        question : "What tag is used to underline a word or line of text?",
        choiceA : "li",
        choiceB : "ul",
        choiceC : "s",
        choiceD : "u",
        correct : "D"
    },{
        question : "What tag is used to define a list item (in a bulleted list)",
        choiceA : "ul",
        choiceB : "s",
        choiceC : "u",
        choiceD : "li",
        correct : "D"
    },{
        question : "What tag is used to define an unordered list that is bulleted?",
        choiceA : "li",
        choiceB : "s",
        choiceC : "ul",
        choiceD : "u",
        correct : "C"
    },{
        question : "What tag is used to define a hyperlink, or link to another page?",
        choiceA : "strong",
        choiceB : "em",
        choiceC : "blockquote",
        choiceD : "a",
        correct : "D"
    },{
        question : "What tag is used to define a container for an external app or plug-in?",
        choiceA : "caption",
        choiceB : "embed",
        choiceC : "!DOCTYPE",
        choiceD : "code",
        correct : "B"
    },{
        question : "What tag defines a division or the beginning/end of an individual section in an HTML document?",
        choiceA : "table",
        choiceB : "div",
        choiceC : "meta",
        choiceD : "img",
        correct : "B"
    },{
        question : "What tag is used to specify a line of text that is no longer correct (it used to be the strike tag, but that no longer works in HTML5)?",
        choiceA : "s",
        choiceB : "s",
        choiceC : "ul",
        choiceD : "u",
        correct : "A"
    },{  
        question : "What tag defines the body of the HTML document, and usually includes all the contents such as the text, hyperlinks, images, tables, lists, and more?",
        choiceA : "head",
        choiceB : "body",
        choiceC : "br",
        choiceD : "title",
        correct : "B"
    },{
        question : "What tag is used to define – and place – an interactive button in an HTML document?",
        choiceA : "footer",
        choiceB : "button",
        choiceC : "td",
        choiceD : "clickfield",
        correct : "B"
    },{
        question : "What tag is required in all HTML documents, and is used to define the title?",
        choiceA : "head",
        choiceB : "br",
        choiceC : "title",
        choiceD : "body",
        correct : "C"
    }
];
var score = false;
var index;
var questionAmmount = 9;
var currentQuestion = 0;
var currentScore = 0;
var interval = 1000
var timeleft;
var prevScore;
var downloadTimer = setInterval(function(){
  if(timeleft <= 0){
    clearInterval(downloadTimer);
  } else {
    document.getElementById("countdown").innerHTML = "Time:" + timeleft;
  }
  timeleft -= 1;
}, interval);


function renderQuestion(){
    let q = questions[currentQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click",startQuiz);


function startQuiz(){
    document.getElementById('start').style="display: none"
    renderQuestion();
    document.getElementById('quiz').style.display = "block";
    timeleft = 90;
    document.getElementById('leaderboardButton').style="display: none"
}

function checkAnswer(answer){
    if( answer == questions[currentQuestion].correct){
        answerIsCorrect();
    }else{
        answerIsWrong();
    }
    
    if(currentQuestion < questionAmmount){
        currentQuestion++;
        renderQuestion();
    }else{
        currentScore = timeleft;
        scoreRender();
    }
}


function answerIsCorrect(){
    document.getElementById('wrong').style.display='none'; 
    document.getElementById('right').style.display='none';
    document.getElementById('right').style.display='block';
    setTimeout(function(){ document.getElementById('right').style.display='none'; }, 2000);
}


function answerIsWrong(){
    timeleft -= 10;
    if (timeleft < 0){
        timeleft = 0;
        currentScore = 0;

    }
    document.getElementById('wrong').style.display='none'; 
    document.getElementById('right').style.display='none';
    document.getElementById('wrong').style.display='block';
    setTimeout(function(){ document.getElementById('wrong').style.display='none'; }, 2000);
   
}

function scoreRender(){
    if (timeleft <= 0)
    {
       timeleft = 0
       currentScore = timeleft;
    }
    
    if (currentScore > prevScore){
        index = 1;

    }
    else
    {
        index = -1;
    }
        
    clearInterval(downloadTimer); 
    quiz.style.display = "none";
    document.getElementById('score').style.display='block'; 
    document.getElementById("score").innerHTML = "Your Score is:" + timeleft;
    document.getElementById('label').style.display='block';
    document.getElementById('name').style.display='block';
    document.getElementById('scoreButton').style.display='block';
}

function saveScore() {
    var table = document.getElementById("scoreboard");
    var row = table.insertRow(index);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = document.getElementById("name").value;
    cell2.innerHTML = timeleft;
    score = true;

    document.getElementById('score').style.display='none'; 
    document.getElementById('label').style.display='none';
    document.getElementById('name').style.display='none';
    document.getElementById('scoreButton').style.display='none';

    document.getElementById('scoreboard').style.display='block';
    document.getElementById('backButton').style.display='block';
  }


  function back() {

    document.getElementById('score').style.display='none'; 
    document.getElementById('label').style.display='none';
    document.getElementById('name').style.display='none';
    document.getElementById('scoreButton').style.display='none';
    document.getElementById('backButton').style.display='none'; 
    document.getElementById('scoreboard').style.display='none';

    document.getElementById('start').style.display = "block";
    document.getElementById('leaderboardButton').style.display='block';
    currentQuestion = 0;
    prevScore = currentScore;
    interval = 1000
    timeleft;
    setInterval(function(){
        if(timeleft <= 0){
          clearInterval(downloadTimer);
        } else {
          document.getElementById("countdown").innerHTML = "Time:" + timeleft;
        }
        timeleft -= 1;
      }, interval);
  }

  function leaderboard() {
      if (score == true){
        
        document.getElementById('score').style.display='none'; 
        document.getElementById('label').style.display='none';
        document.getElementById('name').style.display='none';
        document.getElementById('scoreButton').style.display='none';
        document.getElementById('start').style.display='none';
        document.getElementById('leaderboardButton').style.display='none';

        document.getElementById('scoreboard').style.display='block';
        document.getElementById('backButton').style.display='block';
       
      }
      else{

        alert("There are no Scores!");
      }
    
  }


  













