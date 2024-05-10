import { useState } from "react";
import { useNavigate } from "react-router";
import { Box, Button, Stack, Typography, TextField } from "@mui/material";
import { setIP } from "../../common/common";
import { useEffect } from "react";
import LockIcon from "@mui/icons-material/Lock";
import { LoginPage } from "../../page";

export default function Domain() {
  const [domain, setDomain] = useState();
  const [redirect, setRedirect] = useState(false);

  const navigate = useNavigate();

  const fetchDomain = async () => {
    try {
      const response = await fetch(`http://${domain}/`);
      if (response.status === 200) {
        return `http://${domain}/`;
      } else {
        throw new Error("Lỗi kết nối đến domain.");
      }
    } catch (error) {
      throw new Error("Lỗi kết nối đến domain.");
    }
  };

  const checkDomain = async () => {
    try {
      const ip = await fetchDomain();
      localStorage.setItem("domain", JSON.stringify(`http://${domain}/`));
      setIP(ip);
      setRedirect(true);
    } catch (error) {
      alert("Lỗi kết nối đến domain.");
    }
  };

  const checkLocalDomain = async () => {
    const d = JSON.parse(localStorage.getItem("domain"));
    console.log("domain d:" + d);
    setDomain(d);
    if (d != null) {
      try {
        const response = await fetch(`${d}`);
        console.log(d);
        if (response.status === 200) {
          setIP(`${d}`);
          setRedirect(true);
        } else {
          alert("Lỗi kết nối đến domain.");
        }
      } catch (error) {
        alert("Lỗi kết nối đến domain.");
      }
    }
  };
  useEffect(() => {
    checkLocalDomain();
  }, []);
  if (redirect) {
    return <LoginPage />;
  }
  return (
    <Stack
      sx={{
        position: "absolute",
        bottom: "50%",
        left: "50%",
        width: "20%",
        height: "20%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Stack
        sx={{
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
          padding: "6%",
        }}
      >
        <Box
          sx={{
            borderRadius: "50%",
            padding: "5%",
            margin: "0 0 15% 0",
            backgroundColor: "#10af7e",
          }}
        >
          <LockIcon sx={{ fontSize: "500%", color: "white" }} />
        </Box>
        <Box>
          <Typography sx={{ color: "#10af7e", fontSize: "2em" }}>
            Domain
          </Typography>
        </Box>
        <TextField
          id="outlined-basic"
          required="true"
          label="Domain's name"
          variant="outlined"
          placeholder="Enter your domain..."
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          sx={{
            margin: "5% 0 15% 0",
          }}
        />
        <Button
          title="Confirm"
          variant="contained"
          onClick={checkDomain}
          sx={{ backgroundColor: "#10af7e" }}
        >
          Confirm
        </Button>
      </Stack>
    </Stack>
  );
}
