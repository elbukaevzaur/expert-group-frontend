export function ArrowLeftSvg(props) {
  return (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="13"
    height="22"
    fill="none"
    viewBox="0 0 13 22"
    {...props}
  >
    <path
      id="Vector"
      fill={props.fill || "#FFF"}
      fillOpacity="1"
      fillRule="evenodd"
      d="M.51 12.22 10.5 22l2.5-2.45L4.26 11 13 2.44 10.5 0 .51 9.77a1.727 1.727 0 0 0 0 2.45"
    ></path>
  </svg>
  )
}

export function ArrowRightSvg(props) {
    return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="22"
      fill="none"
      viewBox="0 0 13 22"
      {...props}
      style={{ transform: 'rotate(180deg)', ...props.style }}
    >
      <path
        id="Vector"
        fill={props.fill || "#FFF"}
        fillOpacity="1"
        fillRule="evenodd"
        d="M.51 12.22 10.5 22l2.5-2.45L4.26 11 13 2.44 10.5 0 .51 9.77a1.727 1.727 0 0 0 0 2.45"
      ></path>
    </svg>
    )
  }

// export function CloseSvg(props) {
//   return (
//       <svg
//           width={15}
//           height={16}
//           viewBox="0 0 15 16"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//           {...props}
//       >
//         <path
//             d="M14.72 14.158a.561.561 0 11-.795.795L7.572 8.602 1.22 14.953a.563.563 0 01-.795-.795l6.351-6.352L.425 1.453A.562.562 0 011.22.658L7.572 7.01 13.925.658a.563.563 0 01.795.795L8.368 7.806l6.352 6.352z"
//             fill="#000"
//         />
//       </svg>
//   )
// }