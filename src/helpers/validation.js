export function isFileTypeValid(file) {
  const fileTypes = ['jpg', 'jpeg', 'png'];

  let extension = file.name.split('.').pop().toLowerCase();
  let size = file.size;


  console.log('Fileinfo', size, extension);
  console.log(size / 1024 < 4000);
  console.log(fileTypes.includes(extension));
  //Check file size is less than 4 mb and valid file type
  if( (size / 1024 < 4000) && fileTypes.includes(extension) ) {
    console.log('valid');
    return true;
  } else {
    return false;
  }

}

export function isValidSmashUp(smashUp) {
  console.log('PAYLOAD', smashUp);
  if(smashUp.show1 && smashUp.show2 ) {
    return true;
  } else {
    return false;
  }
}
