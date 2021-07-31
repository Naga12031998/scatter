import { useState, useCallback, useRef, useEffect, ReactElement } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Button from "./Button";
import Spinner from "./Spinner";
import ReactModal from "./Modal";
import "../App.css";

const ImageComponent = (): ReactElement => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const imgRef = useRef<any>(null);
  const previewCanvasRef = useRef<any>(null);
  const [crop, setCrop] = useState<any>({
    unit: "%",
    aspect: 4 / 3,
  });
  const [completedCrop, setCompletedCrop] = useState<any>(null);

  const onLoad = useCallback((img): void => {
    imgRef.current = img;
  }, []);

  const handleEditClick = (): void => {
    setIsLoading(false);
    setIsEdit(true);
  };

  const handleSaveClick = (): void => {
    setIsLoading(true);
    setTimeout(() => {
      setIsEdit(false);
    }, 2000);
  };

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image: any = imgRef.current;
    const canvas: any = previewCanvasRef.current;
    const crop: any = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

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
  }, [completedCrop]);

  if (!isEdit) {
    return (
      <div className="containerStyle">
        <img
          src="https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__480.jpg"
          alt="not-cropped"
          width="900px"
          height="500px"
        />
        <div>
          <Button text="Edit" onClick={() => handleEditClick()} />
        </div>
        <ReactModal
          isModalOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="containerStyle">
      <div style={{ width: "500px", height: "400px" }}>
        <ReactCrop
          src="https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__480.jpg"
          onImageLoaded={onLoad}
          crop={crop}
          onChange={(c: any) => setCrop(c)}
          onComplete={(c: any) => setCompletedCrop(c)}
        />
      </div>
      <div>
        <canvas
          ref={previewCanvasRef}
          style={{
            width: Math.round(completedCrop?.width ?? 0),
            height: Math.round(completedCrop?.height ?? 0),
          }}
        />
      </div>
      <div>
        {isLoading ? <Spinner /> : <></>}
        <Button text="save" onClick={() => handleSaveClick()} />
      </div>
    </div>
  );
};

export default ImageComponent;
