const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_NAME;

export const getCloudinaryImage = (
  publicId,
  options = "f_auto,q_auto"
) =>
  `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${options}/${publicId}`;