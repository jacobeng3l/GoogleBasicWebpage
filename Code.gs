/**
  * The central method which responds to HTML server requests
  * Simply creates an html page based off of the index page which is returned to the user
  */
function doGet() {
  return HtmlService
      .createTemplateFromFile('Index')
      .evaluate()
      .setTitle('My Window!');         //sets the title for the window 
}

/**
  * A test method that is used which simply returns a set of data. 
  */
function getData() {
  return [12, 11, 10, 4];
}

/**
  * A useful method which will count all of the files inside of the google drive
  * Requires permissions to access google drive 
  */
function countFiles() { 
  var totes = 0;        // variable that stores the count of files 
  
  // Do Main Folder
  var files = DriveApp.getRootFolder().getFiles();
  var folders = DriveApp.getRootFolder().getFolders();
  // counts all files inside of root folder
  while (files.hasNext()){
    files.next();
    totes++; 
  }
  
  // Do Rest of Folders through recursion. 
  while (folders.hasNext())
    totes = explore(folders.next(), totes); 
  
  // Finish 
  return totes;
}

/**
  * The helper method for file counter which actually recuses. 
  */
function explore(folder, totes) {
  var files  = folder.getFiles();
  while(files.hasNext()) {
    files.next();        // go through files and increment counter 
    totes++
  }
  var folders = folder.getFolders(); 
  while(folders.hasNext())
    totes = explore(folders.next(), totes); 
  return totes; 
}
