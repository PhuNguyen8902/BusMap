import { useState } from "react";
import { useNavigate } from "react-router";
import { Box, Button, Stack, Typography, TextField } from "@mui/material";
import { setIP } from "../../common/common";
import { storeDomainName } from "../../store/features/storeRoute/storeIpSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";


export default function Domain() {
  const [domain, setDomain] = useState();

  // console.log(domain)

  const dispatch = useDispatch();

  const domainName = useSelector((state) => state.storeDomain.domainName);

  // console.log("domain: " + domainName)


  // console.log(domain)

  const navigate = useNavigate();
  
  const fetchDomain = async () => {
    try {
      const response = await fetch(`http://${domain}/`);
      if (response.status === 200) {
        // Handle successful response
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
        // console.log(ip)
        dispatch(storeDomainName(`http://${domain}/`));
        localStorage.setItem('domain', JSON.stringify(`http://${domain}/`));
        setIP(ip);
        // console.log(domain)
        navigate("/home");
    } catch (error) {
      alert("Lỗi kết nối đến domain.");
    }
  };

  const checkLocalDomain = async () => {
    const d = await domainName;
    console.log("domain d:" + d)
    setDomain(d);
    if (d != null) {
      try {
        const response = await fetch(`${d}`);
        console.log(d);
        if (response.status === 200) {
          setIP(`${d}`);
          navigate("/home");
        } else {
          dispatch(storeDomainName(""));
          alert("Lỗi kết nối đến domain.");
        }
      } catch (error) {
        dispatch(storeDomainName(""));
        alert("Lỗi kết nối đến domain.");
      }

      // setIP(`http://${domain}`);
      // navigation.navigate('Home');
    }
  };
  useEffect(() => {
    checkLocalDomain();
  }, []);

  return (
    <Stack
      sx={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        sx={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography>Domain</Typography>
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        />
        <Button title="Confirm" onClick={checkDomain}>
          Confirm
        </Button>
      </Stack>
    </Stack>
  );
}
