(function() {
    //// WebViewer configuration.

    // Hide toolbar components
    $('#tabs-2').hide();
    $('#prevPage').hide();
    $('#nextPage').hide();
    $('.drop-content').hide();
    $('#layoutModeDropDown').hide();
    $('#toolList').hide();
    $('#fullScreenButton').hide();
    $('#bookmarkButton').hide();

    // Mobile only
    $('#optionsButton').hide();

    $(document).on('viewerLoaded', function() {
        readerControl.onTapHold = function() {};

        // Show the mobile toolbar on startup
        if (typeof readerControl.reshowMenu == 'function') {
            readerControl.reshowMenu();
        }

        // Set the search text highlight color
        if (readerControl.docViewer && typeof readerControl.docViewer.setTextHighlightColor == 'function') {
            var red = 'rgba(255, 0, 0, 0.35)';
            readerControl.docViewer.setTextHighlightColor(red);
        }

        // Show single page (iOS horizontal tablet shows two pages by default, and is not very readable)
        if (typeof readerControl.setPageMode == 'function') {
            readerControl.pageDisplay = readerControl.pageDisplayModes.Single;
            readerControl.setPageMode();
        }
    });

})();
