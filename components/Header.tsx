import Logo from "../src/assets/Logo_IN.svg";

export default function Header() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '4rem',
            backgroundColor: '#0E0E1B',
            padding: '1rem .5rem',
            gap: '1rem'
        }}>
            <img src={Logo} style={{
                width: '6.5625rem',
                height: '3.75rem',
            }} alt="Logo IN" />
            <h1 style={{
                color: '#036FDB',
                fontFamily: 'Barlow',
                fontSize: '4rem'
            }}>Feed</h1>
        </div>
    );
}