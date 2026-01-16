export function GreenPlus (){
    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width="19.166"
        height="19.166"
        fill="none"
        viewBox="0 0 19.166 19.166"
      >
        <circle
          id="Ellipse 2"
          cx="9.583"
          cy="9.583"
          r="9.583"
          fill="#21A038"
          fillOpacity="1"
        ></circle>
        <path
          id="Vector 8"
          stroke="#FFF"
          strokeOpacity="1"
          strokeWidth="2.178"
          d="M9.59 3.92v10.89"
        ></path>
        <path
          id="Vector 9"
          stroke="#FFF"
          strokeOpacity="1"
          strokeWidth="2.178"
          d="M3.95 9.56h11.69"
        ></path>
      </svg>
  );
  }

  export function GreenMinus (props){ 
    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width="19.166"
        height="19.166"
        fill="none"
        viewBox="0 0 19.166 19.166"
        {...props}
      >
        <circle
          id="Ellipse 1"
          cx="9.583"
          cy="9.583"
          r="9.583"
          fill="#21A038"
          fillOpacity="1"
        ></circle>
        <path
          id="Vector 9"
          stroke="#FFF"
          strokeOpacity="1"
          strokeWidth="2.178"
          d="M3.48 9.58h12.63"
        ></path>
      </svg>
  );
  }

  export function PlusSmall(props) {
    return (
      <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      fill="none"
      viewBox="0 0 10 10"
      {...props}
    >
      <path
        id="Vector 8"
        stroke={props.color ||"#21A038"}
        strokeOpacity="1"
        strokeWidth="1.3"
        d="M5 0v10"
      ></path>
      <path
        id="Vector 9"
        stroke={props.color ||"#21A038"}
        strokeOpacity="1"
        strokeWidth="1.3"
        d="M0 5h10"
      ></path>
    </svg>
    )
  }

  export function MinusSmall(props) {
    return (
      <svg
    xmlns="http://www.w3.org/2000/svg"
    width="10.131"
    height="1.746"
    fill="none"
    viewBox="0 0 10.131 1.746"
    {...props}
  >
    <path
      id="Vector 9"
      stroke={props.color ||"#21A038"}
      strokeOpacity="1"
      strokeWidth="1.3"
      d="M0 .87h10.13"
    ></path>
  </svg>
    )
  }

