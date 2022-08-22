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

    //Capitalizes userChamp and if it is multiple elements, joins them together
    userChamp = capitalize(userChamp);
    
    //concatenates the champion selected with the url to retrieve the correct object
    const champSpecificURL = 'https://ddragon.leagueoflegends.com/cdn/12.15.1/data/en_US/champion/' + userChamp + '.json';
    //console.log(champSpecificURL);

    const imageURL = `http://ddragon.leagueoflegends.com/cdn/12.15.1/img/champion/` + userChamp + `.png`;
    // console.log(imageURL)

    $('img').remove();

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
    $.ajax({
        url: imageURL //ajax call to url
    }).then (
        (data) => {
            renderTwo(data);
        },
        (error) => {
            console.log('bad request', error); //if error occurs, console.logs the error
        }
    )
    $input.val('');
}


function render(champData) {
    //console.log('doing something'); //tests to see if render function is running

    //fills the text attached to $name with the data received at data point, id
    $name.text(champData.data[userChamp].id);

    //fills the text attached to $title with the data received at data point, title
    $title.text(champData.data[userChamp].title);

    //fills the text attached to $lore with the data received at data point, lore
    $lore.text(champData.data[userChamp].lore);

    // console.log(champData.data[userChamp].image.full);
}
function renderTwo(data) {
    const imageURL = `http://ddragon.leagueoflegends.com/cdn/12.15.1/img/champion/` + userChamp + `.png`;
    //console.log(imageURL)
    $('main').prepend(`<img src="${imageURL}"/>`);
}

//capitalizes input value
function capitalize(userChamp) {
    //splits the string into an array of substrings based upon a space
    let words = userChamp.split(' ');
    //declares an empty array
    let capWords = [];
    //for each element in the string entered, we take the first letter of the element and upper case it, then slice it back in and return the rest of the array behind it
    words.forEach(element => { 
        capWords.push(element[0].toUpperCase() + element.slice(1, element.length));
        
    });
    //console.log(capWords.join(''));
    //return the array made as a joined string
    return capWords.join('');
}


//Need to pull a blurb that funnels into the lore when clicked
//Need to pull ally tips
//Need to pull enemy tips
//Need to pull tags
//Need to pull info