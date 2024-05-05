import Button from "./Button";

function BackButton() {
    return (
        <Button
        type="back"
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      >
        &larr; Back
      </Button>
    );
  }
  
  export default BackButton;