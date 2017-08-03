docSignApp.controller('PreviewersCtrl', ['$rootScope', '$scope', '$sce', function($rootScope, $scope, $sce) {
    $rootScope.selectedPage = 'previewers';

    $scope.docs = [
        {name:"JohnCoOfferLetter-tokens.docx"},
        {name:"OfferLetterTemplate-valid.docx"},
        {name:"Abner Marsh.doc"},
        {name:"Ace Ventura.docx"},
        {name:"Albus Dumbledore.doc"},
        {name:"Alfred Hitchcock.docx"},
        {name:"Allen Ginsberg.docx"},
        {name:"Amber Von Tussle.docx"},
        {name:"Amelia Earhardt11.doc"},
        {name:"Atticus Finch.docx"},
        {name:"Axl Rose.docx"},
        {name:"Becky Thatcher.docx"},
        {name:"Buddy Garrity.docx"},
        {name:"Carrie Bradshaw.docx"},
        {name:"Charlie Chaplin.docx"},
        {name:"Cheech Marin.docx"},
        {name:"Clark Kent.doc"},
        {name:"Claude Rains.doc"},
        {name:"Coco Chanel.docx"},
        {name:"David Hasslehoff.doc"},
        {name:"David Starsky.doc"},
        {name:"Hanna Marin.doc"},
        {name:"James T Kirk.doc"},
        {name:"Jane Fonda.doc"},
        {name:"Jay Gatsby.doc"},
        {name:"Jeff Goldblum.docx"},
        {name:"Jerry McGuire.docx"},
        {name:"Jerry Seinfield.docx"},
        {name:"Jessica Rabbit.doc"},
        {name:"Judi Dench.docx"},
        {name:"LionelMessi.docx"},
        {name:"Lucius Leftfoot.docx"},
        {name:"Luke Skywalker.doc"},
        {name:"MC Hammer.docx"},
        {name:"Magnus ver Magnusson.doc"},
        {name:"Margaret Trudeau.docx"},
        {name:"Mia Hamm.docx"},
        {name:"Miles Davis.doc"},
        {name:"Robert Paulson.docx"},
        {name:"Rocky Balboa.doc"},
        {name:"Scarlett Ohara.doc"},
        {name:"Seth Cohen.doc"},
        {name:"Shane Falco.docx"},
        {name:"Tom Ford.doc"},
        {name:"Tom Sawyer.docx"},
        {name:"Vict Frankenstein.doc"},
        {name:"Walter White.docx"},
        {name:"Wyatt Earp.docx"},
        {name:"Yuri Zhivago.doc"}
    ];
    $scope.selected = $scope.docs[14];

    $scope.providers = [
        {name:"Google Viewer"},
        {name:"Office Apps Viewer"}
    ];
    $scope.provider = $scope.providers[0];

    $scope.getUrl = function() {
        var url = "";
        if ($scope.provider.name === "Google Viewer") {
            url = "http://docs.google.com/gview?" +
                "url=http://jettagozoom.github.io/Portfolio/docs/" + $scope.selected.name + "&embedded=true";
        } else if ($scope.provider.name === "Office Apps Viewer") {
            url = "http://view.officeapps.live.com/op/view.aspx?" +
                "src=http://jettagozoom.github.io/Portfolio/docs/" + $scope.selected.name;
        }

        return $sce.trustAsResourceUrl(url);
    };

    var startTime = new Date().getTime();
    $scope.startTimer = function() {
        startTime = new Date().getTime();
    };
    window.iframeLoaded = function() {
        var end = new Date().getTime();
        var time = end - startTime;
        console.log("Finished Loading iFrame: " + time + "ms");
        //checkIframeLoaded();
    };

}]);

