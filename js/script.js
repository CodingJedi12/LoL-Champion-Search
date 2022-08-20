//console.log('connected');

///////////////////
///VARIABLES
///////////////////

//variable that will be used to store data about the champ that is input
let userChamp;

//attaches jQuery var to id name
const $name = $('#name'); 

//attaches jQuery var to id title
const $title = $('#title');

//attaches jQuery var to id lore
const $lore = $('#lore');

//attaches jQuery var to the input text box
const $input = $('input[type="text"]')

//////////////////
//EVENT LISTENERS
//////////////////

//targets our form html element. on the event, submit, run function handleGetData()
$('form').on('submit', handleGetData);

///////////////////
/////FUNCTIONS
///////////////////

//function to get the data from input and call from api using ajax
function handleGetData(e) {
    //doesnt refresh page on event
    e.preventDefault(); 
    
    //applies the value placed in the text box to the variable userChamp
    userChamp = $input.val();

    //concatenates the champion selected with the url to retrieve the correct object
    const champSpecificURL = 'https://ddragon.leagueoflegends.com/cdn/12.15.1/data/en_US/champion/' + userChamp + '.json';
    //console.log(champSpecificURL);


    $.ajax({
        url: champSpecificURL //ajax call to url created
    }).then(
        (champData) => {
            render(champData); //gets data from the object, passes it to the render() function and runs it
        },
        (error) => {
            console.log('bad request', error); //if error occurs, console.logs the error
        }
    );
}

function render(champData) {
    //console.log('doing something'); //tests to see if render function is running

    //fills the text attached to $name with the data received at data point, id
    $name.text(champData.data[userChamp].id);

    //fills the text attached to $title with the data received at data point, title
    $title.text(champData.data[userChamp].title);

    //fills the text attached to $lore with the data received at data point, lore
    $lore.text(champData.data[userChamp].lore);
}