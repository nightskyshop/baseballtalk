export default function FiletoBase64(file) {
  if (type(file) == Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        resolve(reader.result);
      }
  
      reader.readAsDataURL(file);
  
      reader.onerror = reject;
    });
  } else {
    return new Promise((resolve, reject) => {
      resolve("..");
    });
  }
}