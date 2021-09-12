// <!-- <div class="div-wrapper">
// <div class="quiz-score-wrapper">
//     <div class="quiz-h1-wrapper">
//         <h1>The Quiz App</h1>
//     <div class="quiz">
//         <form action="">
//             <p>What is the capital of India</p>
//             <label for=""><input type="radio" name="option" value="option1" id="">India</label> <br>
//             <label for=""><input type="radio" name="option" value="option1" id="">Pune</label> <br>
//             <label for=""><input type="radio" name="option" value="option1" id="">Chandigarh</label> <br>
//             <label for=""><input type="radio" name="option" value="option1" id="">Delhi</label> <br>
//         </form>
//     </div>
//     </div>
//     <div class="score">
//         <p>Score</p>
//         <h3>0/5</h3>
//     </div>

// </div>
// </div>

let quiz = $(".quiz")

function renderQuiz(data, index) {
    let form = $("<div>")
    form.addClass("quizes")
    let qno = index +1
    let question = $("<p>")
    question.html("Q"+qno+". "+data.question)
    
    
    options = []
    labelName = data.options
    for (let i = 0; i < labelName.length; i++) {

        var inputLabel = $("<div>")
        inputLabel.addClass("input-label-wrapper")

        var input = $("<input>")
        input.attr("id","qno"+qno+i)
            //instead of using attr we can write in this way

        input.attr("name", qno)
        input.attr("type", "radio")
        input.attr("data-value",labelName[i])
        input.prop("required",true)


        var label = $("<label>")
        labelFor = "qno"+qno+i
        label.attr("for",labelFor)
        label.addClass("label")
        label.text(labelName[i])


        var divider = $("<div>") 
        divider.addClass("divider")

        options.push(inputLabel)
        console.log(options)

        inputLabel.append(input, label)
    }
    quiz.append(form)
    form.append(question, inputLabel, options, divider)
}

function submitQuiz(resp){
    selectedans = []
    console.log(resp[0].answer)
    $(".submit").click(function(){
      $('.quiz').find("input[type=radio]:checked").each(function() {
        var value = $(this).attr('data-value');
        selectedans.push(value)
      })
      validate(selectedans,resp)
    })
  }

function validate(ans, data){
    let score = 0
    for(let i=0; i<data.length; i++){
      if(ans[i] == data[i].options[data[i].answer - 1]){
          score++
      }
    }
    $(".score h3").html(score + " / "+ data.length)

}


$.get("https://5d76bf96515d1a0014085cf9.mockapi.io/quiz", function (response) {
    for (let i = 0; i <response.length; i++) {
        renderQuiz(response[i],i)
    }
    const submitBtn = $("<button>")
    submitBtn.addClass("submit")
    submitBtn.text("Submit")
    quiz.append(submitBtn)
    submitQuiz(response)
})
