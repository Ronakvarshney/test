import multer from "multer";
import path from "path";

// disk storgae setup
const storgae  = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file ,cb) => {
        const name = `${Date.now()}-${file.originalname}`;
        cb(null, name);
    }
});

// allowing / accepting all files
const files = (req , file , cb) =>{
    cb(null,true);
}

const upload = multer({storage, files});

export default upload;

