import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Dimensions, ImageCroppedEvent, ImageTransform} from 'ngx-image-cropper';
import {ProductImage} from '@product/model';

@Component({
    selector: 'app-product-picture-chooser',
    templateUrl: './product-picture-chooser.component.html',
    styleUrls: ['./product-picture-chooser.component.scss']
})
export class ProductPictureChooserComponent implements OnInit {
    @Input() show = false;
    @Input() picture!: ProductImage;
    @Output() showChange = new EventEmitter<boolean>();
    pictureChoosed = false;
    imageChangedEvent: any = '';
    croppedImage: any = '';
    canvasRotation = 0;
    scale = 1;
    showCropper = false;
    containWithinAspectRatio = false;
    transform: ImageTransform = {};

    ngOnInit() {
        if (!this.picture.isEmpty) {
            this.croppedImage = this.picture.content;
            this.pictureChoosed = true;
        }
    }

    cropperReady($event: Dimensions) {
        // cropper ready
    }

    loadImageFailed() {
        // show message
    }

    fileChangeEvent(event: any): void {
        this.pictureChoosed = true;
        this.imageChangedEvent = event;
    }

    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
    }

    imageLoaded() {
        this.showCropper = true;
    }

    rotateLeft() {
        this.canvasRotation--;
        this.flipAfterRotate();
    }

    rotateRight() {
        this.canvasRotation++;
        this.flipAfterRotate();
    }

    close(): void {
        this.pictureChoosed = false;
        this.showChange.emit(false);
    }

    zoomOut(): void {
        this.scale -= .1;
        this.transform = {
            ...this.transform,
            scale: this.scale
        };
    }

    zoomIn(): void {
        this.scale += .1;
        this.transform = {
            ...this.transform,
            scale: this.scale
        };
    }

    save(): void {
        this.picture.isEmpty = false;
        this.picture.path = this.croppedImage.split(',')[1];
        this.picture.content = this.croppedImage;
        this.close();
    }

    private flipAfterRotate() {
        const flippedH = this.transform.flipH;
        const flippedV = this.transform.flipV;
        this.transform = {
            ...this.transform,
            flipH: flippedV,
            flipV: flippedH
        };
    }
}
