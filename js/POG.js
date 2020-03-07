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
        document.getElementById("crd_back").addEventListener("click",flip_back);
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
    document.getElementById("crd_back").removeEventListener("click",flip_back);

    document.querySelector('.card').classList.toggle('is-flipped',true);

    // Clear the container of cards 
    

    var url = "https://db.ygoprodeck.com/api/v6/randomcard.php";
    var callback = process_card;

    // get the cards
    getJSONP(url,callback); // card 1 
    getJSONP(url,callback); // card 2    
    
}

function flip_back()
{
    remove_children("div_img");
    console.log("back flip");
    document.querySelector('.card').classList.toggle('is-flipped',false);

}

function setup()
{
    document.getElementById("crd_front").addEventListener("click",draw);
    document.getElementById("crd_back").addEventListener("click",flip_back);

}

// ""Entry Point""
setup();

