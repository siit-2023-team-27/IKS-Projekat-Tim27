import {AfterContentInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnChanges {
  @Input() images: string[] = [];

  selectedImages: string[] = [];
  imageMapping: { [base64: string]: string } = {};

  @Output() selectedImagesOutput = new EventEmitter<string[]>();

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images'] && !changes['images'].firstChange) {
      this.selectedImages = this.images;
      this.selectedImages = this.selectedImages.map(i => i.split("/")[1])
      console.log(this.selectedImages);
      this.selectedImagesOutput.emit(this.selectedImages);
    }
    }

  onFileSelected(event: any) {
    const file:File = event.target.files[0];
    const fileName = file.name;
    this.selectedImages.push(fileName);
    this.selectedImagesOutput.emit(this.selectedImages);

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        // @ts-ignore
        const base64String = e.target.result as string;
        // @ts-ignore
        this.images.push(e.target.result as string);
        console.log(this.images);
        this.imageMapping[base64String] = fileName;
      };

      reader.readAsDataURL(file);
    }
  }

  removeImage(event: any, base64String: string): void {

    const index= this.images.indexOf(base64String);
    if (index !== -1) {
      this.images.splice(index, 1);
    }
    const indexS= this.selectedImages.indexOf(base64String.split("/")[1]);
    if (indexS !== -1) {
      this.selectedImages.splice(indexS, 1);
    }

    const fileName = this.imageMapping[base64String];

    if (fileName) {
      const selectedImageIndex = this.selectedImages.indexOf(fileName);
      const imageIndex = this.images.indexOf(base64String);

      if (selectedImageIndex !== -1) {
        this.selectedImages.splice(selectedImageIndex, 1);
        this.selectedImagesOutput.emit(this.selectedImages);
      }

      if (imageIndex !== -1) {
        this.images.splice(imageIndex, 1);
      }

    }
  }

}
