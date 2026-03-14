export const generatePostImagePlaceholder = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const image = new Image();

      image.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");

          if (!context) {
            throw new Error("Canvas context topilmadi");
          }

          const maxSide = 24;
          const scale = Math.min(
            1,
            maxSide / Math.max(image.naturalWidth, image.naturalHeight),
          );

          canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
          canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));

          context.filter = "blur(2px)";
          context.drawImage(image, 0, 0, canvas.width, canvas.height);

          resolve({
            blurDataUrl: canvas.toDataURL("image/jpeg", 0.35),
            width: image.naturalWidth || null,
            height: image.naturalHeight || null,
          });
        } catch (error) {
          reject(error);
        }
      };

      image.onerror = () => reject(new Error("Rasm preview qilinmadi"));
      image.src = String(reader.result || "");
    };

    reader.onerror = () => reject(new Error("Rasm o'qilmadi"));
    reader.readAsDataURL(file);
  });
