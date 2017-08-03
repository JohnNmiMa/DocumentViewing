### DocumentSigning
This app is to be used to help test, explore and understand various SAAS document signing services. At the moment,
DocuSign is the only service being tested.
        
1. Begin by going the the Admin tab, and enter in the pertinent information. You will need to enter your
   demo IntegrationKey to talk to the DocuSign API. You will also need a demo account, with a Username and password
   to be able to login to the DocuSign API. The IntegratorKey and password is used to make DocuSign API calls,
   and is stored in SessionStorage for use by the other tabs. The password is replaced with the DocuSign apiPassword
   as soon as the account is logged into. Close the tab to remove any reference to this data.
            
2. The DocuSign API does not support CORS requests, so you will need to fake out your browser to do
   Cross Origin requests. For the Chrome browser, the <em>CORS Toggle</em> extension does a fine job. Simply
   install the extension use these settings in the extensions:
            
  * Access-Control-Allow-Origin: *</li>
  * Access-Control-Allow-Headers:Content-Type,X-DocuSign-Authentication</li>

3. Once the login creadentials are entered, go to the DocuSign tab. The first thing you will want to do is
   login. After that, you will be able to display account info, list all DocuSign account templates and
   envelopes. The API response will be displayed below the button interface.
               
  The <em>Send Envelope Using Server Template</em> button implements the <em>Send an Envelope
  from a Template</em> workflow. To use that workflow, you will need to:
               
  * create a DocuSign template. This can be done by setting up a template in the DocuSign Template UI on the DocuSign account page.
    Once the template is setup, you can click the <em>Templates</em> button to get its information. You can select
    which template to use by editing the <code>ds_templates[0]</code> variable used in the
    <code>docusignLib.js/envelopeUsingServerTemplate()</code> function.</li>
  
  * Be sure to enter a real email address in the function, so that you can see the workflow in operation.</li>
            
  Once a template exists, clicking the <em>Send Envelope Using Server Template</em> button will
  create a new DocuSign envelope. Each person listed in the envelop will be requested to sign or view
  the document.</p>

  * Next Steps:
  
    1. Implement ability to create new accounts.</li>
    1. Implement ability to select from different accounts.</li>
    1. Implement the <em>Creating an Envelope from a Document</em> workflow.</li>

Feel free to enhance and change the application as desired.
