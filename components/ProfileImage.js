export default function ProfileImage({ url, width = 40, height = 40 }) {
  return (
    <img
      src={url.startsWith("http") ? url : `data:image/png;base64,${url}`}
      width={width}
      height={height}
      alt="Profile Image"
    />
  )
}