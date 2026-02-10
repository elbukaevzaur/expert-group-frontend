export function FavoriteSvg(props) {
    return(
          <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path id="icn / favorite" d="M0 0h24v24H0z" fill="none"></path>
    <g id="Group 5" fill={props.fill || props.color || "#272323"} fillRule="nonzero">
      <path
        id="Vector 25"
        d="M19.273 1H4.727A.72.72 0 0 0 4 1.71v12.774c0 .392.326.71.727.71a.72.72 0 0 0 .728-.71V2.419h13.09v18.67l-6.195-3.324a.74.74 0 0 0-.7 0L5.454 21.09v-4.122a.72.72 0 0 0-.728-.71.72.72 0 0 0-.727.71v5.322c0 .25.136.483.357.611a.74.74 0 0 0 .72.01L12 19.198l6.922 3.715a.74.74 0 0 0 .72-.011.71.71 0 0 0 .358-.611V1.71a.72.72 0 0 0-.727-.71"
      ></path>
      <path
        id="Vector 26"
        d="M10.273 6c.401 0 .727-.448.727-1s-.326-1-.727-1H7.727C7.326 4 7 4.448 7 5s.326 1 .727 1z"
      ></path>
    </g>
  </svg>
    )
}