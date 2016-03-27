$(function() {

  var categories = [{name: "General Spending", id: "general"},{name: "Living Expenses", id: "living"},{name: "Food", id: "food"},{name: "Health & Wellness", id: "health"},
  {name: "Automotive", id: "automotive"}, {name: "Income", id: "income"}]
  var option = '';
  
  for (var i = 0; i < categories.length; i++) {
    option += '<option value="' + categories[i].id + '">' + categories[i].name + '</option>';
  }
  $('#category').append(option);

  $("#submit").click(function() {
    console.log("Clicked")
    var description = $("#description").val(),
      date = $("#description").val(),
      amount = $("#description").val(),
      category = $("#description").val();

    callURL("http://localhost:3000/expenses/create?description=" + description + "&amount=" + amount + "&category=" + category + "&date=" + date);

  });

  function callURL(url) {
    jQuery.ajax({
      url: url,
      dataType: "html"
    }).done(function(responseText) {
      console.log(responseText)
    })
  }

});