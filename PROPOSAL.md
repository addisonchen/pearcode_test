    My project idea is to recreate CoderPad. My goal is to create a web
application that will allow mulitple users to work on a file at the same time.
I will be working alone on this project. Users will be able to create accounts,
create files, and save files. When working on a file, other users can jump in
and work on the same file at the same time. This application is not intended to
replace an IDE, instead it will be used as a collaborative test or scratch
workspace. 

    The API that I plan to use is Judge0. Judge0 accepts submission POSTs with
source code, a language, a callback url, compiler options, stdin, cpu time
limit, memory limit, and more. For this project I will just be using the source
code, language, and callback url options.  Once Judge0 recieves the submission
POST, it responds with a token. Users can check the status of a submission
using a GET with the correct token.

    Once Judge0 has run the code, it PUTs the results to the callback url.
This callback url allows my phoenix application to recieve the results without
having to poll the Judge0 server while waiting for a result.  The results
include stdout, stderr, The Judge0 server is hosted on my VPS. It is in a
docker-compose container. Although it is hosted locally, Judge0 offers
configurations for a authorization token. This token has been configured and is
required to access the API.

    One realtime behavior of my application will be the collaborative coding.
When users add to the document, other users will see what is being typed live.
Depending on time, a conflict-free replicated data type may be implemented to
handle multiple users typing at the same time.

    Another realtime behavior of my application will be live descriptions of
who is currently typing. This will be implemented using Phoenix's Presence
module. This module allows Phoenix to track processes across the cluster. In my
case, when a user types, the Presence module will track the user or users who
are typing. When a user stops typing (unfocuses the text area), the Presence
module will let all the other users know that the typing user is no longer
typing.

    Besides users, my postgres database will store files and file ownership.
The files table will include the code, the language id for Judge0, and the
owner. The file ownership table will allow users to share files with other
users without sending a link. This file could also be used to set permissions
for files, where the owners can keep files private except for other users they
share the file with.

    The something neat of my project is the inclusion of Presence. The benefit
of Presence is that there does not have to be a module for a shared editing
space. Presence handles tracking who is working on a file, who is typing, and
what the file contains. The main goal is to track live typing activity. If time
allows I would also like to use Presence or a custom conflict-free replicated
data type implementation to deal with conflic resolution when multiple users
modify the code at one time.

    My first experiment focused on getting Judge0 running on my VPS. I was able
to get the server running, and learned a lot about how Docker works. I then
created a simple react page that would allow a user to write a block of code,
then execute it on the Judge0 server. I was able to allow users to select a
language and view the results. One challange will be handling formatting in the
textarea.

    My second experiment involved setting up the Phoenix Presence module. I
learned how to implement a Presence module as well as include it in my sockets
and channels. This allowed me to have multiple users work on the same file,
show what other users were working on that file at the same time, and show who
is typing live.

    I expect the users of my app will be software developers. It will be a
great tool for remote teaching, as well as remote collaboration on simple
projects.

    For those teaching, they will likely want to create files with some starter
code. During lessons they would then be able to share the files with students.
The students and the teacher would be able to collaborate and complete the file
together. The teacher can see which student is typing to track how well each
student is picking up topics as well as track participation.

    For quick tests and trying simple ideas where opening an IDE, installing a
language, or dealing with compilers is overkill, my web application will be
perfect. With remote work, developers will be able to easily share their quick
notes and scratch files with others who will be able to mark comments or make
changes easily.
