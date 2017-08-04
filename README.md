### DocumentSigning

#### Installation

1. clone the repository: `git clone https://github.com/jettagozoom/DocumentViewing.git DocumentViewer`
1. cd into the new repository: `cd DocumentViewer`
1. Install the bower packages: `bower install`
1. Run a web server to serve up the app. The http-server from npm woks great.

#### Usage

This sample app is to be used to help understand how the PDFTron WebViewer iFrame lives in a
hosted div on an SPA app. The case shown is very specific to a particular situation in the
Newton app. If other cases show up, another tab will be created to help showcase that particular issue.</p>

The iFrame is created by the PDFTron WebViewer.js file, when the 'mobileRedirect: false'
option is used. This is the option used to keep the WebViewer from redirecting. The redirect
path works fine, as it doesn't use an iframe, but sits totally within a full-screen div on
a redirected page. Unfortunately, there are cases in SPA apps where the viewer must live in
a specific div, therefore forcing the usages of the iFrame (non-redirected) path.</p>

The div in which the PDFTron WebViewer is contained in is named with the CSS id,
"NewtonDocumentViewer". This sample app is responsive, and can be used to test how well the
iframe in the mobile version of PDFTron's MobileReaderControl sits within the "NewtonDocumentViewer"
container. Due to the way PDFTron computes if the page is living on a mobile browser, you
must connect to this sample app from a real mobile device (or if on iOS, use the xcode iOS Simulator).</p>

In addition, the isMobileDevice method, as shown in the v3.0.1 WebViewer.js, does not work
for ie11 desktops. When on ie11, the mobile path is taken, not the desktop path.
To fix this, either 1) find a proper fix for ie11 in the current isMobileDevice method,
or 2) allow the isMobileDevice method to be wrapped, so that the result of the method can be
augmented. It was necessary to override the function to make progress (without rewriting the function).
But, the function needed to be overridden before the WebViewer instance was created.
To help do that, the isMobileDevice function was turned into a static class function rather
than an instance function. Doing this allow the wrapper to be applied before the WebViewer instance was create
(since the isMobileDevice check is used during WebViewer instance creation). Whatever fix is found,
the desired goal is to have something that won't require any editing of the WebViewer.js.</p>

Feel free to enhance and change the application as desired.

