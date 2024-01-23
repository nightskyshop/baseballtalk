export default function ProfileImage({ url, width = 40, height = 40 }) {
  return (
    <img
      src={url}
      width={width}
      height={height}
      alt="Profile Image"
    />
  )
}