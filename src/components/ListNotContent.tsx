interface Props {
  text: string;
}

export default function ListNotContent(props: Props) {
  return (
    <div
      style={{
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <h3
        style={{
          fontSize: "20px",
          fontWeight: 600,
          lineHeight: "30px",
          fontFamily: "Roboto",
          color: "rgba(39, 35, 35, 1)",
        }}
      >
        {props.text}
      </h3>
    </div>
  );
}
