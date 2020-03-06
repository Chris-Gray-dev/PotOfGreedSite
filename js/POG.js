function getJSONP(url,callback) 
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', url, true);
    xmlhttp.onreadystatechange = function() 
    {
        if (xmlhttp.readyState == 4)
        {
            if(xmlhttp.status == 200) 
            {
                var obj = JSON.parse(xmlhttp.responseText);
                callback(obj)
            }
        }
    };
    xmlhttp.send(null);
}

function display_image(img)
{
    var ratio = 5;
    const init_h = 89;
    const init_w = 62;
    var elem = document.createElement("img");
    elem.src = img;
    elem.width = ratio * init_w;
    elem.height = ratio * init_h;
    document.getElementById("div_img").appendChild(elem);

    // check to see if the image is the second card drawn, if it is then renable the draw ability
    if(document.getElementById("div_img").childElementCount == 2)
    {
        document.getElementById("btn_draw").disabled = false;
    }
    
}

function process_card(card)
{
    var img = card.card_images[0]["image_url"];
    display_image(img);
    console.log(img);
}

function remove_children(id)
{
    var children = document.getElementById(id).innerHTML = '';
}

function draw()
{
    document.getElementById("btn_draw").disabled = true;
    // Clear the container of cards 
    remove_children("div_img");

    var url = "https://db.ygoprodeck.com/api/v6/randomcard.php";
    var callback = process_card;

    // get the cards
    getJSONP(url,callback); // card 1 
    getJSONP(url,callback); // card 2    
    
}

function setup()
{
    document.getElementById("btn_draw").addEventListener("click", draw);
}

// ""Entry Point""
setup();

