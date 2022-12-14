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

//attaches jquery var to img tag
const $img = $('#champ-image')

//attaches jquery var to ally tag
const $ally = $('#ally-tips')

//attaches jquery var to enemy tag
const $enemy = $('#enemy-tips')

//attaches jquery var to tags tag
const $tags = $('#tags')

//attaches jquery var to info div
const $info = $('#info')
$info.hide();//hides this element

//attaches jquery var to image, name and title div
const $champ = $('#image')
$champ.hide();//hides this element


//////////////////
//EVENT LISTENERS
//////////////////

//targets our form html element. on the event, submit, run function handleGetData()
$('form').on('submit', handleGetData);

//toggles whether info is showing or not
$champ.on('click', hideOrReveal);


///////////////////
/////FUNCTIONS
///////////////////

//function to get the data from input and call from api using ajax
function handleGetData(e) {
    //doesnt refresh page on event
    e.preventDefault(); 
    
    //applies the value placed in the text box to the variable userChamp
    userChamp = $input.val().toLowerCase();
    
    //Capitalizes userChamp and if it is multiple elements, joins them together
    userChamp = capitalizeAndAttach(userChamp);
    
    //concatenates the champion selected with the url to retrieve the correct object
    const champSpecificURL = 'https://ddragon.leagueoflegends.com/cdn/12.15.1/data/en_US/champion/' + userChamp + '.json';
    
    
    //concatenates the champion selected with the url to retrieve the img file
    const imageURL = `http://ddragon.leagueoflegends.com/cdn/12.15.1/img/champion/` + userChamp + `.png`;
    
    $.ajax({
        url: champSpecificURL //ajax call to url created
    }).then(
        (champData) => {
            render(champData); //gets data from the object, passes it to the render() function and runs it
        },
        (error) => {
            alert('Please enter a real champion');//alerts user that they entered something wrong
            console.log('bad request', error); //if error occurs, console.logs the error
            $input.val('');//resets input value to empty
        }
        );    
    }

//renders the champData to the HTML
function render(champData) {
        //console.log('doing something'); //tests to see if render function is running
        
        //fills the text attached to $name with the data received at data point, id
        $name.text(champData.data[userChamp].name);
        
        //fills the text attached to $title with the data received at data point, title
        $title.text(capitalizeEachElement(champData.data[userChamp].title));
        
        //fills the text attached to $lore with the data received at data point, lore
        $lore.text(`Lore: ${champData.data[userChamp].lore}`);
        
        //fills the text attached to $ally with the data received at the data point, allytips
        if (champData.data[userChamp].allytips.length > 0) {
            $ally.text(`Ally Tips: ${champData.data[userChamp].allytips.join(" ")}`)
        }
        //if no ally tips is available, discard
        else if (champData.data[userChamp].allytips.length = " ") {
            $ally.text(' ');
        }

        //fills the text attached to $enemy with the data received at the data point, enemytips
        if (champData.data[userChamp].enemytips.length > 0) {
            $enemy.text(`Enemy Tips: ${champData.data[userChamp].enemytips.join(" ")}`)
        }
        //if no enemy tips is available, discard
        else if (champData.data[userChamp].enemytips.length = " ") {
            $enemy.text(' ');
        }

        //fills the text attached to $enemy with the data received at the data point, enemytips
        $tags.text(`Roles: ${champData.data[userChamp].tags.join(", ")}`)
        
        //pulls img from url
        $img.attr('src', `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${userChamp}_0.jpg` )
        
        //reveals image div
        $champ.show();
        
        
        //resets input box to empty
        $input.val('');
    }

//capitalizes input value and attaches as one string
function capitalizeAndAttach(userChamp) {
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

//capitalizes each substring 
function capitalizeEachElement(userChamp) {
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
    return capWords.join(' ');
}

//hides or reveals the info about the champ on click
function hideOrReveal () {
    if ($info.is(':hidden')) {
        $info.show();
    }
    else if ($info.is(':visible')) {
        $info.hide();
    }
}