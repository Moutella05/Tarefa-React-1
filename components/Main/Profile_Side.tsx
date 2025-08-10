import BackgroundImage from "../../src/assets/Bridge.jpg";
import ProfilePic from "../../src/assets/joaoImg.jpg";

export default function Profile() {
  return (
    <div
      style={{
        width: "23rem",
        height: "25rem",
        borderRadius: "1.5rem",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgb(227, 125, 25)"
      }}
    >
      <div>
        <img
          src={BackgroundImage}
          style={{
            borderTopRightRadius: "1.5rem",
            borderTopLeftRadius: "1.5rem",
            objectFit: "contain",
            width: "100%",
          }}
          alt="Background"
        />
      </div>
      <div
        style={{
          backgroundColor: "rgb(227, 125, 25)",
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        <img
          src={ProfilePic}
          style={{
            borderRadius: "100%",
            objectFit: "cover",
            objectPosition: 'center top',
            width: "115px",
            height: "115px",
            marginTop: '-3rem',
          }}
          alt="Profile"
        />
        <h2 style={{ fontSize: '2.25rem', color: 'black' }}>
          João Vitor Moutella
        </h2>
        <h3 style={{ fontSize: '1.5rem', color: '#5f5f5fff' }}>
          Dev Front-End
        </h3>
      </div>
    </div>
  );
}
