document.addEventListener('DOMContentLoaded', function(e) {

    /*******************************
     * First I will retrieve all
     * reviews from the database
     *******************************/
    getReviews();

    /******************************
     * Now I will add listners for
     * my from.
     ******************************/

    let form = document.getElementById('postReview');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let title = form.elements['title'].value;
        let content = form.elements['content'].value;
        let score = form.elements['score'].value;

        let request = new XMLHttpRequest();

        request.addEventListener('load', function(e){
            if ( request.status === 200 ) {
                console.log("Created a review");
                
                let result = JSON.parse(request.responseText);
                newReview = "";

                newReview += "<p class='mainTextBox blackBack'>";

                newReview += result.title + ":<br><br>";
                newReview += result.content + "<br><br>";
                newReview += "Score " + result.score + "/10";

                newReview += "</p>";

                let body = document.getElementById('reviews').innerHTML;

                document.getElementById('reviews').innerHTML = newReview + body;
            } else {
                console.log("Review creaton failed.");
            }
        });

        request.open('POST', '/createReview', true);
        request.setRequestHeader('Content-type', 'application/json');
        request.send(JSON.stringify({title: title, content: content, score: score}));
    });
});

function getReviews() {
    let request = new XMLHttpRequest();

    request.addEventListener('load', function(e){
        if ( request.status === 200 ) {
            console.log("Retrieved reviews");

            let reviews = JSON.parse(request.responseText);
            let formatedList = "";

            for ( i in reviews.list ) {
                formatedList += "<p class='mainTextBox blackBack'>";

                formatedList += reviews.list[i].title + ":<br><br>";
                formatedList += reviews.list[i].content + "<br><br>";
                formatedList += "Score " + reviews.list[i].score + "/10";

                formatedList += "</p>";
            }

            document.getElementById('reviews').innerHTML = formatedList;
        } else {
            console.log("Failed to get reviews");
        }
    });

    request.open('GET', '/getReviews', true);
    request.send();
}