let now = moment().format('dddd, MMMM Do');
let currentHour = moment().format('ha');
let dateEl = $("#dateAndTime");
let storedSchedule = localStorage.getItem("schedule");
let pulledSchedule = JSON.parse(localStorage.getItem("schedule"))
let schedule = (pulledSchedule !== null) ? pulledSchedule : 
[{
        hour1:'',
        hour2:'',
        hour3:'',
        hour4:'',
        hour5:'',
        hour6:'',
        hour7:'',
        hour8:'',
        hour9:'',

    }];

let scheduleLength = Object.keys(schedule[0]).length;
dateEl.text(now)

//runs the function when the page loads
$(document).ready(function()
{
    //loads all saved elements and inserts them into the values of the text elements.
    for(let i = 1; i < scheduleLength + 1; i++)
    $(`#hour${i}`).children("input").val(schedule[0][`hour${i}`])
    //loops threw and check if the text value (time) is past future or present and sets the class based on what it is
    for(let i=1; i <= 10; i++){
        let hourId = $(`#hour${i}`).children('div').text();
        //subtracts 1 hour from current time
        let hourBefore = moment().subtract(1,'hour').format('ha');
        //adds 1 hour from current time
        let hourAfter = moment().add(1,'hour').format('ha')
        //checks if the hourId is between the hour before and hour after, if so it is the current hour.
        //had to do this becuase the .isSame would not work on just the hour.
        let isCurrent = moment(hourId, 'ha').isBetween(moment(hourBefore, 'ha'), moment(hourAfter, 'ha'))
        let isBefore = moment(hourId, 'ha').isBefore();
        let isAfter = moment(hourId, 'ha').isAfter();
        if(isCurrent)
        {
            $(`#hour${i}`).children("input").addClass("present")
        }
        else if(isBefore)
        {
            $(`#hour${i}`).children("input").addClass("past")
        }
        else
        {
            $(`#hour${i}`).children("input").addClass("future")
        }
    }
})

$(document).on("click", ".btn", function()
{
    let parrentID = $(this).parent().attr('id');
    schedule[0][parrentID] = $(this).siblings("input").val()
    localStorage.setItem('schedule', JSON.stringify(schedule))


})

