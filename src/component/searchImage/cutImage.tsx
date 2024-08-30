import { useState} from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import { preview } from './previewImage';

import 'react-image-crop/dist/ReactCrop.css';
import './cutImage.css'

let cutImage:any = null;
let cutCount:number = 0;

function countReset(){
    cutCount = 0;
}

function openDialog(img:any) {
    if(cutCount == 0){
        cutImage = img as string;
        cutCount++;
    }
    let image:any = document.getElementById("cutImage");
    image.src = cutImage;
    let cutDialog: any = document.getElementById("cutDialog");
    cutDialog.showModal();
}

function closeDialog() {
    let cutDialog: any = document.getElementById("cutDialog");
    cutDialog.close();
  }

function ImageCropper(){
    const [crop, setCrop] = useState<Crop>();
    // const [image, setImage] = useState<string>('');


    const onCropComplete = (crop: Crop) => {

        const image:any = document.getElementById("cutImage");
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');
    
        if (!ctx) return;
    
        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );

        const croppedImage = canvas.toDataURL('image/jpeg');

        let upload_img:any = document.getElementById("upload_img");
        upload_img.src = croppedImage;

        fetch(croppedImage)
            .then((res) => res.blob())
            .then((blob) => {
                const newFile = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' });
                preview.setFileAfterCut(newFile);
            });
    };
  
    return (
        <div>
            <ReactCrop
            crop={crop}
            onChange={setCrop}
            onComplete={onCropComplete}
            >
            <img id="cutImage" src={''}/>
            </ReactCrop>
            <i
          id="closeBtn"
          className="fa-solid fa-x"
          onClick={closeDialog}
        ></i>
        </div>
    );
  }
  export const imgCut = {ImageCropper,openDialog,countReset};
