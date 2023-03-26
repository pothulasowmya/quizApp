const questions=[
    {
        question:"What command is used to start the React local development server?",
        answers:[
            {text:"npm run dev",correct:false},
            {text:"npm serve",correct:false},
            {text:"npm start",correct:true},
            {text:"npm build",correcr:false},
        ]
    },
    {
        question:"Where is the correct place to insert a JavaScript?",
        answers:[
            {text:"The <head> section",correct:false},
            {text:"The <body Section",correct:false},
            {text:"Both the <head> section and the <body> section are correct",correct:true},
            {text:"None of the above",correct:false},
        ]
    },
    {
        question:"How to write an IF statement in JavaScript?",
        answers:[
            {text:"if(i == 5)",correct:true},
            {text:"if i = 5",correct:false},
            {text:"if i = 5 then",correct:false},
            {text:"if i == 5 then",correct:false},
        ]
    },
    {
        question:"Which event occurs when the user clicks on an HTML element?",
        answers:[
            {text:"onmouseover",correct:false},
            {text:"onchange",correct:false},
            {text:"onclick",correct:true},
            {text:"onmouseclick",correct:false},
        ]
    },
    {
        question:"Which operator is used to assign a value to a variable?",
        answers:[
            {text:"*",correct:false},
            {text:"x",correct:false},
            {text:"=",correct:true},
            {text:"-",correct:false},
        ]
    }
];
const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}
function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}


function showScore(){
    resetState();
    questionElement.innerHTML=`you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Start Again";
    nextButton.style.display="block";
}


function handleNext(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNext();
    }else{
        startQuiz();
    }
})
startQuiz();