interface Props{
    text: string
}

export default function ListNotContent(props: Props) {

    return <div style={{
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex'
    }}>
        <h3>{props.text}</h3>
    </div>
}