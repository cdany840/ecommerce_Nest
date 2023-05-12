import { v4 as uuidv4 } from 'uuid';

export const renameImage = (req, file, callback) => {

    const name = "Avatar";
    const extension = file.originalname.split('.').pop();
    const randomName = uuidv4();

    const fileName = `${name}.${extension}`;
    const uniqueFileName = `${name}-${randomName}${fileName}`;

    callback(null, uniqueFileName);

}

export const fileFilter = (req, file, callback) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|git)$/))
        return callback(new Error('Invalid format type'), false);
    
    callback(null, true);
}