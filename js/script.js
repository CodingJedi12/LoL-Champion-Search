//console.log('connected');
const mainInfoURL = 'http://ddragon.leagueoflegends.com/cdn/12.15.1/data/en_US/champion.json';

let userChamp;
const $name = $('#name');
const $title = $('#title');
const $lore = $('#lore');
const $input = $('input[type="text"]')

$('form').on('submit', handleGetData);

//url for specific champion that user has selected or input

function handleGetData(e) {
    e.preventDefault();
    
    userChamp = $input.val();

    const champSpecificURL = 'https://ddragon.leagueoflegends.com/cdn/12.15.1/data/en_US/champion/' + userChamp + '.json';

    //console.log(champSpecificURL);
    $.ajax({
        url: champSpecificURL
    }).then(
        (champData) => {
            render(champData);
        },
        (error) => {
            console.log('bad request', error);
        }
    );
}

function render(champData) {
    console.log('doing something');
    console.log(champData.data[userChamp].id);
    $name.text(champData.data[userChamp].id);
    $title.text(champData.data[userChamp].title);
    $lore.text(champData.data[userChamp].lore);
}