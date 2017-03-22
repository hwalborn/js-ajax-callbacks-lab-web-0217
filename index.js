function handlebarsSetup() {
  //put any handlebars setup in here
  Handlebars.registerPartial("userDetails", $("#user-details-partial").html())
}

$(document).ready(function (){
  handlebarsSetup()
});

function searchRepositories(){
  search = "https://api.github.com/search/repositories?q=" + document.getElementById("searchTerms").value
  $.get(search, (response) =>{
    const src = document.getElementById("repository-template").innerHTML
    const template = Handlebars.compile(src)
    const repoList = template(response.items)
    $("#results").html(repoList)
  }).fail(displayError())
}

function displayError(){
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}


function showCommits(el) {
  url = `https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`
  $.get(url, (response) => {
    const src = document.getElementById("commit-template").innerHTML
    const template = Handlebars.compile(src)
    const commitList = template(response)
    $("#details").html(commitList)
  })
}

/////Handlebar Partial/////
document.addEventListener("DOMContentLoaded", function(event) {
  Handlebars.registerPartial("userDetails", document.getElementById("user-details-partial").innerHTML)
});
