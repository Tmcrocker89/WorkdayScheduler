let now = moment().format('dddd, MMMM Do');
let dateEl = $("#dateAndTime");

dateEl.text(now)

$(document).on("click", ".btn", function()
{
    console.log($(this).siblings("input").val())

})
