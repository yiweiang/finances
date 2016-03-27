$(function() {

  initializeOptions();

  $("#submit").click(function() {
    console.log("Clicked")
    var description = $("#description").val(),
      date = $("#date").val(),
      amount = $("#amount").val(),
      category = $("#category").val();

    callURL("http://" + window.location.host + "/expenses/create?description=" + description + "&amount=" + amount + "&category=" + category + "&date=" + date, function(responseText) {      
      console.log(responseText)
      $("#statusMessage").html(responseText)
      console.log("Amount: " + responseText.amount)
    });

    $("#date").val("");
    $("#amount").val("");
    $("#description").val("");

  });

  function initializeOptions() {
    var categories = [{ name: "General Spending", id: "general" }, { name: "Living Expenses", id: "living" }, { name: "Food", id: "food" }, { name: "Health & Wellness", id: "health" },
      { name: "Automotive", id: "automotive" }, { name: "Income", id: "income" }]
    var option = '';

    for (var i = 0; i < categories.length; i++) {
      option += '<option value="' + categories[i].id + '">' + categories[i].name + '</option>';
    }
    $('#category').append(option);
  }

  function callURL(url, callback){
    jQuery.ajax({
      url: url,
      dataType: "html"
    }).done(function(responseText) {
      callback(responseText)
    })
  }

});