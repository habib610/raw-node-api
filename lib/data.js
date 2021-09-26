/* Title: 'Writing Data '
* Author: habib610
* Description: Saving user data functionalities
* Date: 25/09/21
*/

// dependencies 
const fs = require('fs')
const path = require('path')

// module scaffolding 
const lib = {}


// base directory of data folder
lib.baseDir = path.join(__dirname, '/../.data/')

lib.create = (dir, file, data, callback)=> {
    fs.open(lib.baseDir+dir+'/'+file+'.json', 'wx', (err, fileDescriptor)=> {
        if(!err && fileDescriptor) {
            // convert data to string
            const stringData = JSON.stringify(data)
            // write data to file and close file as well
            fs.writeFile(fileDescriptor, stringData, (err2)=> {
                if(!err2) {
                    fs.close(fileDescriptor, (err3)=> {
                        if(!err3){
                            callback(false)
                        } else{
                            callback("Error closing new file")
                        }
                    })
                } else{
                    callback("Error to write data")
                }
            })
        } else{
            callback("There was an error file already exists")
        }
    })
}


// read file
lib.read = (dir, file, callback)=> {
    fs.readFile(lib.baseDir+dir+'/'+file+'.json', 'utf8', (err, data)=> {
        callback(err, data)
    })
}


// update existing file
lib.update = (dir, file, data, callback) => {
    // file open for writing
    fs.open(`${lib.basedir + dir}/${file}.json`, 'r+', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            // convert the data to string
            const stringData = JSON.stringify(data);

            // truncate the file
            fs.ftruncate(fileDescriptor, (err1) => {
                if (!err1) {
                    // write to the file and close it
                    fs.writeFile(fileDescriptor, stringData, (err2) => {
                        if (!err2) {
                            // close the file
                            fs.close(fileDescriptor, (err3) => {
                                if (!err3) {
                                    callback(false);
                                } else {
                                    callback('Error closing file!');
                                }
                            });
                        } else {
                            callback('Error writing to file!');
                        }
                    });
                } else {
                    callback('Error truncating file!');
                }
            });
        } else {
            console.log(`Error updating. File may not exist`);
        }
    });
};

// delete existing file
lib.delete = (dir, file, callback) => {
    // unlink file
    fs.unlink(`${lib.basedir + dir}/${file}.json`, (err) => {
        if (!err) {
            callback(false);
        } else {
            callback(`Error deleting file`);
        }
    });
};



module.exports = lib