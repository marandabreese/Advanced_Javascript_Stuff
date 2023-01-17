const http = require('http');
const events = require('events');
const formidable = require('formidable');
const eventTest = new events.EventEmitter();
const fs = require('fs');
const nodemailer = require('nodemailer');


const server = http.createServer((req, res) => {
    if (req.url == '/fileupload') {
        let form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            let oldPath = files.filetoupload.filepath;
            let newPath = '/Users/marandabreese/Documents/' + files.filetoupload.originalFilename;
            console.log(newPath);
            fs.rename(oldPath, newPath, function(err) {
                if (err) throw err;
                res.write('File uploaded and moved!');
                res.end();
            })
        })
    } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        return res.end();
    }
})


let newEvent = function() {
    console.log('You can use Node!');
}

eventTest.on('You did it!', newEvent);
eventTest.emit('You did it!');

server.listen(4242, () => {
    console.log('You did it!');
})