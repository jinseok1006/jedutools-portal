import Button from "@mui/material/Button";

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    github: true; // 'github' 라는 커스텀 색상 추가
  }
}
