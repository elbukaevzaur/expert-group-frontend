export function LikeSvg(props) {
    return (
        <svg
            width={props.width || 30}
            height={props.height || 26}
            viewBox="0 0 30 26"
            fill={props.fill || "none"}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M13.818 4C15 5.5 15 6.25 15 6.25S15 5.5 16.182 4c1.37-1.74 3.391-3 5.818-3 3.873 0 7 3.015 7 6.75a6.503 6.503 0 01-1.182 3.75C26.558 13.315 15 25 15 25S3.442 13.315 2.182 11.5A6.502 6.502 0 011 7.75C1 4.015 4.127 1 8 1c2.427 0 4.449 1.26 5.818 3z"
                stroke={props.stroke || "#21A038"}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}